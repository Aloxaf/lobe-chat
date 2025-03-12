import { browserless } from './browserless';
import { firecrawl } from './firecrawl';
import { jina } from './jina';
import { naive } from './naive';

export const crawlImpls = {
  browserless,
  firecrawl,
  jina,
  naive,
};

export type CrawlImplType = keyof typeof crawlImpls;
