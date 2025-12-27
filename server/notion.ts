import { Client } from '@notionhq/client';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=notion',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Notion not connected');
  }
  return accessToken;
}

export async function getNotionClient() {
  const accessToken = await getAccessToken();
  return new Client({ auth: accessToken });
}

export async function saveContactToNotion(data: {
  name: string;
  email: string;
  message: string;
  databaseId: string;
}) {
  const notion = await getNotionClient();
  
  const response = await notion.pages.create({
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
  
  return response;
}

export async function saveNewsletterToNotion(data: {
  name: string;
  email: string;
  consent: boolean;
  source: string;
  databaseId: string;
}) {
  const notion = await getNotionClient();
  
  const response = await notion.pages.create({
    parent: { database_id: data.databaseId },
    properties: {
      'nome': {
        title: [{ text: { content: data.name } }]
      },
      'mail': {
        email: data.email
      },
      'data iscrizione': {
        date: { start: new Date().toISOString() }
      },
      'consenso': {
        checkbox: data.consent
      },
      'fonte': {
        rich_text: [{ text: { content: data.source } }]
      }
    }
  });
  
  return response;
}
