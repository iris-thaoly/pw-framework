import { expect } from '@playwright/test';
import { getPage } from './pageUtils';

export async function tobeVisible(locator: string) {
    const page = getPage();
    const isVisible = await page.locator(locator).isVisible();
    await expect(isVisible).toBeTruthy();
}

export async function isContained(locator: string, text: string) {
    const page = getPage();
    const isTextVisible = await page.locator(locator);
    await expect(isTextVisible).toContainText(text);
}