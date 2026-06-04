import dotenv from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

export function loadEnv() {
  try {
    /*change this parameter to 'test' or 'preac' to run the test script*/
    const defaultEnv = "dev";
    const env = process.env.test_env || defaultEnv;
    const envFilePath = resolve(process.cwd(), `.env.${env}`);
    if (existsSync(envFilePath)) {
      dotenv.config({ path: envFilePath, override: true });
    } else {
      dotenv.config();
    }
  } catch (error) {
    throw new Error(`Error in loadEnv: ${error}`);
  }
}
