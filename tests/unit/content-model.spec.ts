import { describe, expect, it } from "vitest";
import { REQUIRED_SECTIONS, validateScript } from "../../src/lib/content-model";

describe("content model validation", () => {
  it("marks scripts with all required sections as complete", () => {
    const result = validateScript({
      id: "vehicle-keys",
      name: "Vehicle Keys",
      summary: "Vehicle docs",
      order: 1,
      status: "active",
      sections: {
        api: "scripts/vehicle-keys/api.md",
        readme: "scripts/vehicle-keys/readme.md",
        "config-examples": "scripts/vehicle-keys/config-examples.md",
        changelog: "scripts/vehicle-keys/changelog.md"
      }
    });

    expect(result.isComplete).toBe(true);
    expect(result.missingSections).toEqual([]);
  });

  it("detects missing sections", () => {
    const result = validateScript({
      id: "partial-script",
      name: "Partial",
      summary: "Partial docs",
      order: 2,
      status: "active",
      sections: {
        api: "scripts/partial/api.md",
        readme: "",
        "config-examples": "",
        changelog: "scripts/partial/changelog.md"
      }
    });

    expect(result.isComplete).toBe(false);
    expect(result.missingSections).toEqual(["readme", "config-examples"]);
  });

  it("keeps required sections list stable", () => {
    expect(REQUIRED_SECTIONS).toEqual(["api", "readme", "config-examples", "changelog"]);
  });
});
