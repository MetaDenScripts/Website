export const REQUIRED_SECTIONS = [
  "api",
  "readme",
  "config-examples",
  "changelog"
] as const;

export type SectionType = (typeof REQUIRED_SECTIONS)[number];

export interface ScriptIndexItem {
  id: string;
  name: string;
  summary: string;
  storeUrl: string;
  addedAt: string;
  status: "active" | "deprecated";
  imageUrl?: string;
  sections: Record<SectionType, string>;
}

export interface ScriptValidationResult {
  scriptId: string;
  missingSections: SectionType[];
  isComplete: boolean;
}

export function getMissingSections(script: ScriptIndexItem): SectionType[] {
  return REQUIRED_SECTIONS.filter((section) => !script.sections[section]);
}

export function validateScript(script: ScriptIndexItem): ScriptValidationResult {
  const missingSections = getMissingSections(script);

  return {
    scriptId: script.id,
    missingSections,
    isComplete: missingSections.length === 0
  };
}

export function validateAllScripts(scripts: ScriptIndexItem[]): ScriptValidationResult[] {
  return scripts.map(validateScript);
}
