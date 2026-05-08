import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type ContentKey = "projects" | "locations" | "segments" | "homepage";

function contentDir(): string {
  return path.join(process.cwd(), "content");
}

function contentPath(key: ContentKey): string {
  return path.join(contentDir(), `${key}.json`);
}

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function writeJsonFile<T>(filePath: string, value: T): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

export async function readContent<T>(key: ContentKey): Promise<T | null> {
  return await readJsonFile<T>(contentPath(key));
}

export async function writeContent<T>(key: ContentKey, value: T): Promise<void> {
  await writeJsonFile(contentPath(key), value);
}

