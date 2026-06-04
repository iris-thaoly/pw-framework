import * as fs from "fs";
import * as path from "path";
export class env {
  public static URL = process.env.url || "";
  public static USERNAME = process.env.email || "";
  public static PASSWORD = process.env.password || "";
}

