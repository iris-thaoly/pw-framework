import { test } from "@playwright/test";

/**
 * Polymorphic step decorator for Playwright test steps.
 * Usage:
 *   @step("message")
 *   @step("message", false)
 */
export function step(message: string, includeArgs: boolean = true) {
  return function actualDecorator<T extends (...args: any[]) => any>(originalMethod: T, context: ClassMethodDecoratorContext) {
    async function replacementMethod(this: any, ...args: Parameters<T>): Promise<ReturnType<T>> {
      let stepMessage = message;
      if (includeArgs && args.length > 0) {
        stepMessage += ` with values ${JSON.stringify(args)}`;
      }
      return await test.step(stepMessage, async () => {
        return await originalMethod.call(this, ...args);
      });
    }
    return replacementMethod as T;
  };
}
