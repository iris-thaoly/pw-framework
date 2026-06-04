/**
 * pageUtils.ts: This module manages Page instances for Playwright tests.
 * It provides centralized page management, ensuring each test has a clean, isolated page instance.
 * This helps maintain independent test state and context, improving reliability and debugging.
 */

import { Page } from "@playwright/test";

let currentPage: Page;
const SMALL_TIMEOUT = 5000;

/**
 * Returns the current Page instance.
 * @returns {Page} The current Page.
 */
export function getPage(): Page {
  return currentPage;
}

/**
 * Sets the current Page instance.
 * @param {Page} pageInstance - The Page instance to set as current.
 */
export function setPage(pageInstance: Page): void {
  currentPage = pageInstance;
}

/**
 * Switches to a different page by its index (1-based).
 * Waits for the page to be available if not immediately present.
 * @param {number} pageIndex - The index of the page to switch to (1-based).
 * @throws {Error} If the desired page isn't found within the timeout period.
 */
export async function switchPage(pageIndex: number): Promise<void> {
  await waitForPageToExist(pageIndex);
  
  const targetPage = getPageByIndex(pageIndex);
  await targetPage.waitForLoadState();
  setPage(targetPage);
}

/**
 * Switches back to the first page (default page).
 * @throws {Error} If no default page exists.
 */
export async function switchToDefaultPage(): Promise<void> {
  const defaultPage = getPageByIndex(1);
  if (!defaultPage) {
    throw new Error("No default page available");
  }
  
  await defaultPage.bringToFront();
  setPage(defaultPage);
}

/**
 * Closes a page by its index (1-based).
 * If no index is provided, closes the current page.
 * Automatically switches to the default page if other pages remain open.
 * @param {number} [pageIndex] - The index of the page to close (1-based). If omitted, closes current page.
 */
export async function closePage(pageIndex?: number): Promise<void> {
  const pages = getAllPages();
  const pageToClose = pageIndex ? getPageByIndex(pageIndex) : currentPage;
  
  await pageToClose.close();
  
  if (pages.length > 1) {
    await switchToDefaultPage();
  }
}

/**
 * Helper: Gets a page by its index (1-based).
 * @param {number} index - The page index (1-based).
 * @returns {Page} The page at the specified index.
 * @throws {Error} If the index is out of bounds.
 */
function getPageByIndex(index: number): Page {
  const pages = getAllPages();
  const page = pages[index - 1];
  
  if (!page) {
    throw new Error(`Page at index ${index} not found. Available pages: ${pages.length}`);
  }
  
  return page;
}

/**
 * Helper: Gets all pages in the current context.
 * @returns {Page[]} Array of all pages.
 */
function getAllPages(): Page[] {
  return currentPage.context().pages();
}

/**
 * Helper: Waits for a page at the specified index to exist.
 * @param {number} pageIndex - The page index to wait for (1-based).
 * @throws {Error} If the page doesn't exist within the timeout period.
 */
async function waitForPageToExist(pageIndex: number): Promise<void> {
  const startTime = Date.now();
  const pollInterval = 100;
  
  while (getAllPages().length < pageIndex) {
    if (Date.now() - startTime >= SMALL_TIMEOUT) {
      throw new Error(
        `Page at index ${pageIndex} not found after ${SMALL_TIMEOUT}ms. ` +
        `Available pages: ${getAllPages().length}`
      );
    }
    await sleep(pollInterval);
  }
}

/**
 * Helper: Sleep utility for waiting.
 * @param {number} ms - Milliseconds to sleep.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}