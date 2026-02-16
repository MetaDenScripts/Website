import { describe, expect, it } from "vitest";
import { REQUIRED_SECTIONS, validateScript } from "../../src/lib/content-model";
import { getLatestScripts } from "../../src/lib/latest-scripts";

describe("content model validation", () => {
  it("marks scripts with all required sections as complete", () => {
    const result = validateScript({
      id: "vehicle-keys",
      name: "Vehicle Keys",
      summary: "Vehicle docs",
      storeUrl: "https://store.example.com/vehicle-keys",
      addedAt: "2026-02-10",
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
      storeUrl: "https://store.example.com/partial-script",
      addedAt: "2026-01-10",
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

  it("returns latest scripts sorted by addedAt with docs links", () => {
    const cards = getLatestScripts(
      [
        {
          id: "older-script",
          name: "Older Script",
          summary: "Older",
          storeUrl: "https://store.example.com/older",
          addedAt: "2026-01-05",
          order: 2,
          status: "active",
          sections: {
            api: "scripts/older-script/api.md",
            readme: "scripts/older-script/readme.md",
            "config-examples": "scripts/older-script/config-examples.md",
            changelog: "scripts/older-script/changelog.md"
          }
        },
        {
          id: "newer-script",
          name: "Newer Script",
          summary: "Newer",
          storeUrl: "https://store.example.com/newer",
          addedAt: "2026-02-05",
          order: 1,
          status: "active",
          sections: {
            api: "scripts/newer-script/api.md",
            readme: "scripts/newer-script/readme.md",
            "config-examples": "scripts/newer-script/config-examples.md",
            changelog: "scripts/newer-script/changelog.md"
          }
        }
      ],
      16
    );

    expect(cards).toHaveLength(2);
    expect(cards[0].id).toBe("newer-script");
    expect(cards[0].docsUrl).toBe("/scripts/newer-script/readme");
  });

  it("limits latest scripts results", () => {
    const cards = getLatestScripts(
      [
        {
          id: "script-1",
          name: "Script 1",
          summary: "S1",
          storeUrl: "https://store.example.com/script-1",
          addedAt: "2026-02-01",
          order: 1,
          status: "active",
          sections: {
            api: "scripts/script-1/api.md",
            readme: "scripts/script-1/readme.md",
            "config-examples": "scripts/script-1/config-examples.md",
            changelog: "scripts/script-1/changelog.md"
          }
        },
        {
          id: "script-2",
          name: "Script 2",
          summary: "S2",
          storeUrl: "https://store.example.com/script-2",
          addedAt: "2026-02-02",
          order: 2,
          status: "active",
          sections: {
            api: "scripts/script-2/api.md",
            readme: "scripts/script-2/readme.md",
            "config-examples": "scripts/script-2/config-examples.md",
            changelog: "scripts/script-2/changelog.md"
          }
        }
      ],
      1
    );

    expect(cards).toHaveLength(1);
    expect(cards[0].id).toBe("script-2");
  });
});
