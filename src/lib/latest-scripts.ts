import type { ScriptIndexItem } from "./content-model";

export interface LatestScriptCard {
  id: string;
  name: string;
  summary: string;
  storeUrl: string;
  addedAt: string;
  docsUrl: string;
  imageUrl?: string;
}

export function toDocumentationLink(script: ScriptIndexItem): string {
  const readmePath = script.sections.readme.replace(/\.md$/, "");
  return `/${readmePath}`;
}

export function getLatestScripts(
  scripts: ScriptIndexItem[],
  limit = 16
): LatestScriptCard[] {
  return [...scripts]
    .sort((left, right) => {
      const dateDiff = Date.parse(right.addedAt) - Date.parse(left.addedAt);
      if (dateDiff !== 0) {
        return dateDiff;
      }

      return left.order - right.order;
    })
    .slice(0, limit)
    .map((script) => ({
      id: script.id,
      name: script.name,
      summary: script.summary,
      storeUrl: script.storeUrl,
      addedAt: script.addedAt,
      docsUrl: toDocumentationLink(script),
      imageUrl: script.imageUrl
    }));
}
