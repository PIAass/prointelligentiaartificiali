import { Client } from '@notionhq/client';

let connectionSettings: any;
let cachedClient: Client | null = null;

async function getAccessTokenFromReplit(): Promise<string | null> {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    if (!hostname) return null;

    const xReplitToken = process.env.REPL_IDENTITY 
      ? 'repl ' + process.env.REPL_IDENTITY 
      : process.env.WEB_REPL_RENEWAL 
      ? 'depl ' + process.env.WEB_REPL_RENEWAL 
      : null;

    if (!xReplitToken) return null;

    connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=notion',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;
    return accessToken || null;
  } catch {
    return null;
  }
}

export async function getNotionClient(): Promise<Client> {
  if (cachedClient) return cachedClient;

  // Priority 1: Use NOTION_TOKEN env var (portable)
  const envToken = process.env.NOTION_TOKEN;
  if (envToken) {
    cachedClient = new Client({ auth: envToken });
    return cachedClient;
  }

  // Priority 2: Fallback to Replit Connectors
  const replitToken = await getAccessTokenFromReplit();
  if (replitToken) {
    cachedClient = new Client({ auth: replitToken });
    return cachedClient;
  }

  // No configuration available
  throw new Error('Notion not configured');
}

export function isNotionConfigured(): boolean {
  return !!(process.env.NOTION_TOKEN || process.env.REPLIT_CONNECTORS_HOSTNAME);
}

export async function saveContactToNotion(data: {
  name: string;
  email: string;
  message: string;
  databaseId: string;
}) {
  const notion = await getNotionClient();
  
  await notion.pages.create({
    parent: { database_id: data.databaseId },
    properties: {
      'Nome': {
        title: [{ text: { content: data.name } }]
      },
      'Email': {
        email: data.email
      },
      'Messaggio': {
        rich_text: [{ text: { content: data.message } }]
      },
      'Data': {
        date: { start: new Date().toISOString() }
      }
    }
  });
}

export async function saveNewsletterToNotion(data: {
  name: string;
  email: string;
  consent: boolean;
  source: string;
  databaseId: string;
}) {
  const notion = await getNotionClient();
  
  await notion.pages.create({
    parent: { database_id: data.databaseId },
    properties: {
      'Nome': {
        title: [{ text: { content: data.name } }]
      },
      'Email': {
        email: data.email
      },
      'Data iscrizione': {
        date: { start: new Date().toISOString() }
      },
      'Consenso privacy': {
        checkbox: data.consent
      },
      'Fonte': {
        select: { name: data.source }
      }
    }
  });
}
