import fs from 'fs/promises';
import path from 'path';
// @ts-ignore
import fm from 'front-matter';
import { ContentItem } from '@shared/schema';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function getContentList(lang: string, type: string): Promise<ContentItem[]> {
  const dirPath = path.join(CONTENT_DIR, lang, type);
  
  try {
    // Check if dir exists
    await fs.access(dirPath);
    
    const files = await fs.readdir(dirPath);
    const items: ContentItem[] = [];

    for (const file of files) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      
      const filePath = path.join(dirPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { attributes, body } = fm<any>(fileContent);
      
      items.push({
        slug: file.replace(/\.mdx?$/, ''),
        lang: lang as any,
        type: type as any,
        frontmatter: attributes,
        content: body
      });
    }
    
    // Sort by date if present
    return items.sort((a, b) => {
      const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
      const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
      return dateB - dateA;
    });

  } catch (error) {
    console.warn(`Content directory not found or empty: ${dirPath}`);
    return [];
  }
}

export async function getContentItem(lang: string, type: string, slug: string): Promise<ContentItem | null> {
  const exts = ['.md', '.mdx'];
  
  for (const ext of exts) {
    const filePath = path.join(CONTENT_DIR, lang, type, `${slug}${ext}`);
    try {
      await fs.access(filePath);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { attributes, body } = fm<any>(fileContent);
      
      return {
        slug,
        lang: lang as any,
        type: type as any,
        frontmatter: attributes,
        content: body
      };
    } catch (e) {
      continue;
    }
  }
  
  return null;
}
