import { Locator } from '@playwright/test';
import { getPage } from './pageUtils';

export async function click(locator: string | Locator) {
    const page = getPage();
    if (typeof locator === 'string') {
        await page.locator(locator).click();
    } else {
        await locator.click();
    }
}

export async function fill(locator: string | Locator, text: string) {
    const page = getPage();
    if (typeof locator === 'string') {
        await page.locator(locator).fill(text);
    } else {
        await locator.fill(text);
    }
}

export async function check(locator: string | Locator) {
    const page = getPage();
    if (typeof locator === 'string') {
        await page.locator(locator).check();
    } else {
        await locator.check();
    }
}