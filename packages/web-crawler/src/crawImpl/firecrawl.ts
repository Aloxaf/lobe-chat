import { CrawlImpl } from '../type';

const FIRECRAWL_API_URL = process.env.FIRECRAWL_API_URL ?? 'https://api.firecrawl.dev';
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

export const firecrawl: CrawlImpl<{ apiKey?: string }> = async (url, params) => {
  const apiKey = params.apiKey ?? FIRECRAWL_API_KEY;

  if (!apiKey) {
    console.error('Firecrawl API key is required');
    return;
  }

  try {
    const body = {
      formats: ['markdown'],
      removeBase64Images: true,
      url,
    };

    const res = await fetch(`${FIRECRAWL_API_URL}/v1/scrape`, {
      body: JSON.stringify(body),
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        const result = json.data;
        return {
          content: result.markdown,
          contentType: 'text',
          description: result.metadata.description,
          length: result.markdown.length,
          title: result.metadata.title,
          url,
        };
      }

      throw json;
    }
  } catch (error) {
    console.error('Firecrawl error:', error);
  }

  return;
};
