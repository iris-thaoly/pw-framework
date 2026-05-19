import { Page } from '@playwright/test';

let page: Page;

export function setPage(p: Page) {
  page = p;
}

export function getPage(): Page {
  if (!page) {
    throw new Error('Page has not been initialized. Call setPage(page) before using page utilities.');
  }
  return page;
}
