// Lark MCP Catalog — 1,450 tools across 61 categories
// Architecture: lark_list_categories → lark_get_category → lark_get_tool

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ── Import all tool definitions ──────────────────────────────────────
import * as acs_v1 from "./tools/acs_v1.js";
import * as admin_v1 from "./tools/admin_v1.js";
import * as aily_v1 from "./tools/aily_v1.js";
import * as apaas_v1 from "./tools/apaas_v1.js";
import * as application_v5 from "./tools/application_v5.js";
import * as application_v6 from "./tools/application_v6.js";
import * as approval_v4 from "./tools/approval_v4.js";
import * as attendance_v1 from "./tools/attendance_v1.js";
import * as auth_v3 from "./tools/auth_v3.js";
import * as authen_v1 from "./tools/authen_v1.js";
import * as baike_v1 from "./tools/baike_v1.js";
import * as base_v2 from "./tools/base_v2.js";
import * as bitable_v1 from "./tools/bitable_v1.js";
import * as board_v1 from "./tools/board_v1.js";
import * as calendar_v4 from "./tools/calendar_v4.js";
import * as cardkit_v1 from "./tools/cardkit_v1.js";
import * as compensation_v1 from "./tools/compensation_v1.js";
import * as contact_v3 from "./tools/contact_v3.js";
import * as corehr_v1 from "./tools/corehr_v1.js";
import * as corehr_v2 from "./tools/corehr_v2.js";
import * as directory_v1 from "./tools/directory_v1.js";
import * as docs_v1 from "./tools/docs_v1.js";
import * as docx_v1 from "./tools/docx_v1.js";
import * as drive_v1 from "./tools/drive_v1.js";
import * as drive_v2 from "./tools/drive_v2.js";
import * as ehr_v1 from "./tools/ehr_v1.js";
import * as event_v1 from "./tools/event_v1.js";
import * as helpdesk_v1 from "./tools/helpdesk_v1.js";
import * as hire_v1 from "./tools/hire_v1.js";
import * as hire_v2 from "./tools/hire_v2.js";
import * as human_authentication_v1 from "./tools/human_authentication_v1.js";
import * as im_v1 from "./tools/im_v1.js";
import * as im_v2 from "./tools/im_v2.js";
import * as lingo_v1 from "./tools/lingo_v1.js";
import * as mail_v1 from "./tools/mail_v1.js";
import * as mdm_v1 from "./tools/mdm_v1.js";
import * as mdm_v3 from "./tools/mdm_v3.js";
import * as minutes_v1 from "./tools/minutes_v1.js";
import * as moments_v1 from "./tools/moments_v1.js";
import * as okr_v1 from "./tools/okr_v1.js";
import * as optical_char_recognition_v1 from "./tools/optical_char_recognition_v1.js";
import * as passport_v1 from "./tools/passport_v1.js";
import * as payroll_v1 from "./tools/payroll_v1.js";
import * as performance_v1 from "./tools/performance_v1.js";
import * as performance_v2 from "./tools/performance_v2.js";
import * as personal_settings_v1 from "./tools/personal_settings_v1.js";
import * as report_v1 from "./tools/report_v1.js";
import * as search_v2 from "./tools/search_v2.js";
import * as security_and_compliance_v1 from "./tools/security_and_compliance_v1.js";
import * as sheets_v3 from "./tools/sheets_v3.js";
import * as speech_to_text_v1 from "./tools/speech_to_text_v1.js";
import * as task_v1 from "./tools/task_v1.js";
import * as task_v2 from "./tools/task_v2.js";
import * as tenant_v2 from "./tools/tenant_v2.js";
import * as translation_v1 from "./tools/translation_v1.js";
import * as trust_party_v1 from "./tools/trust_party_v1.js";
import * as vc_v1 from "./tools/vc_v1.js";
import * as verification_v1 from "./tools/verification_v1.js";
import * as wiki_v1 from "./tools/wiki_v1.js";
import * as wiki_v2 from "./tools/wiki_v2.js";
import * as workplace_v1 from "./tools/workplace_v1.js";

// ── Category Registry ────────────────────────────────────────────────

interface ToolDefinition {
  project: string;
  name: string;
  sdkName: string;
  path: string;
  httpMethod: string;
  description: string;
  accessTokens: string[];
  schema: Record<string, unknown>;
}

interface CategoryInfo {
  key: string;
  label: string;
  toolCount: number;
  description: string;
}

const CATEGORIES: { key: string; label: string; module: Record<string, unknown> }[] = [
  { key: "acs_v1", label: "Access Control", module: acs_v1 },
  { key: "admin_v1", label: "Admin", module: admin_v1 },
  { key: "aily_v1", label: "Aily (AI)", module: aily_v1 },
  { key: "apaas_v1", label: "aPaaS", module: apaas_v1 },
  { key: "application_v5", label: "Application v5", module: application_v5 },
  { key: "application_v6", label: "Application v6", module: application_v6 },
  { key: "approval_v4", label: "Approval", module: approval_v4 },
  { key: "attendance_v1", label: "Attendance", module: attendance_v1 },
  { key: "auth_v3", label: "Auth", module: auth_v3 },
  { key: "authen_v1", label: "Authentication", module: authen_v1 },
  { key: "baike_v1", label: "Baike (Wiki)", module: baike_v1 },
  { key: "base_v2", label: "Base v2", module: base_v2 },
  { key: "bitable_v1", label: "Bitable", module: bitable_v1 },
  { key: "board_v1", label: "Board", module: board_v1 },
  { key: "calendar_v4", label: "Calendar", module: calendar_v4 },
  { key: "cardkit_v1", label: "Card Kit", module: cardkit_v1 },
  { key: "compensation_v1", label: "Compensation", module: compensation_v1 },
  { key: "contact_v3", label: "Contact", module: contact_v3 },
  { key: "corehr_v1", label: "Core HR v1", module: corehr_v1 },
  { key: "corehr_v2", label: "Core HR v2", module: corehr_v2 },
  { key: "directory_v1", label: "Directory", module: directory_v1 },
  { key: "docs_v1", label: "Docs", module: docs_v1 },
  { key: "docx_v1", label: "Docx", module: docx_v1 },
  { key: "drive_v1", label: "Drive v1", module: drive_v1 },
  { key: "drive_v2", label: "Drive v2", module: drive_v2 },
  { key: "ehr_v1", label: "EHR", module: ehr_v1 },
  { key: "event_v1", label: "Event", module: event_v1 },
  { key: "helpdesk_v1", label: "Helpdesk", module: helpdesk_v1 },
  { key: "hire_v1", label: "Hire v1", module: hire_v1 },
  { key: "hire_v2", label: "Hire v2", module: hire_v2 },
  { key: "human_authentication_v1", label: "Human Authentication", module: human_authentication_v1 },
  { key: "im_v1", label: "Messaging (IM) v1", module: im_v1 },
  { key: "im_v2", label: "Messaging (IM) v2", module: im_v2 },
  { key: "lingo_v1", label: "Lingo", module: lingo_v1 },
  { key: "mail_v1", label: "Mail", module: mail_v1 },
  { key: "mdm_v1", label: "MDM v1", module: mdm_v1 },
  { key: "mdm_v3", label: "MDM v3", module: mdm_v3 },
  { key: "minutes_v1", label: "Minutes", module: minutes_v1 },
  { key: "moments_v1", label: "Moments", module: moments_v1 },
  { key: "okr_v1", label: "OKR", module: okr_v1 },
  { key: "optical_char_recognition_v1", label: "OCR", module: optical_char_recognition_v1 },
  { key: "passport_v1", label: "Passport", module: passport_v1 },
  { key: "payroll_v1", label: "Payroll", module: payroll_v1 },
  { key: "performance_v1", label: "Performance v1", module: performance_v1 },
  { key: "performance_v2", label: "Performance v2", module: performance_v2 },
  { key: "personal_settings_v1", label: "Personal Settings", module: personal_settings_v1 },
  { key: "report_v1", label: "Report", module: report_v1 },
  { key: "search_v2", label: "Search", module: search_v2 },
  { key: "security_and_compliance_v1", label: "Security & Compliance", module: security_and_compliance_v1 },
  { key: "sheets_v3", label: "Sheets", module: sheets_v3 },
  { key: "speech_to_text_v1", label: "Speech to Text", module: speech_to_text_v1 },
  { key: "task_v1", label: "Task v1", module: task_v1 },
  { key: "task_v2", label: "Task v2", module: task_v2 },
  { key: "tenant_v2", label: "Tenant", module: tenant_v2 },
  { key: "translation_v1", label: "Translation", module: translation_v1 },
  { key: "trust_party_v1", label: "Trust Party", module: trust_party_v1 },
  { key: "vc_v1", label: "Video Conferencing", module: vc_v1 },
  { key: "verification_v1", label: "Verification", module: verification_v1 },
  { key: "wiki_v1", label: "Wiki v1", module: wiki_v1 },
  { key: "wiki_v2", label: "Wiki v2", module: wiki_v2 },
  { key: "workplace_v1", label: "Workplace", module: workplace_v1 },
];

// ── Extract tool definitions from module exports ─────────────────────

function extractTools(module: Record<string, unknown>): ToolDefinition[] {
  const tools: ToolDefinition[] = [];
  for (const [key, value] of Object.entries(module)) {
    // Skip type exports and the tools array itself
    if (key.endsWith("ToolName") || key === "default") continue;
    if (typeof value === "object" && value !== null && "name" in value && "path" in value) {
      const t = value as Record<string, unknown>;
      // Convert Zod schemas to plain JSON-safe descriptions
      const schema = serializeSchema(t.schema as Record<string, unknown> | undefined);
      tools.push({
        project: (t.project as string) || "",
        name: (t.name as string) || "",
        sdkName: (t.sdkName as string) || "",
        path: (t.path as string) || "",
        httpMethod: (t.httpMethod as string) || "",
        description: (t.description as string) || "",
        accessTokens: (t.accessTokens as string[]) || [],
        schema,
      });
    }
  }
  return tools;
}

function serializeSchema(
  schema: Record<string, unknown> | undefined
): Record<string, unknown> {
  if (!schema) return {};
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(schema)) {
    if (value && typeof value === "object" && "_def" in value) {
      // It's a Zod object — extract shape descriptions
      result[key] = extractZodShape(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function extractZodShape(zodObj: Record<string, unknown>): Record<string, unknown> {
  const shape: Record<string, unknown> = {};
  try {
    const def = zodObj._def as Record<string, unknown>;
    const shapeDef = def?.shape as
      | (() => Record<string, unknown>)
      | Record<string, unknown>
      | undefined;
    if (!shapeDef) return {};
    const entries = typeof shapeDef === "function" ? shapeDef() : shapeDef;
    for (const [key, field] of Object.entries(entries)) {
      const fieldDef = (field as Record<string, unknown>)?._def as
        | Record<string, unknown>
        | undefined;
      shape[key] = {
        type: fieldDef?.typeName || "unknown",
        description: (fieldDef?.description as string) || "",
        required: !(fieldDef as Record<string, unknown>)?.isOptional,
      };
    }
  } catch {
    // Best-effort schema extraction
  }
  return shape;
}

// ── Build the category + tool index ──────────────────────────────────

const categoryIndex = new Map<string, CategoryInfo>();
const toolIndex = new Map<string, ToolDefinition>();
const categoryTools = new Map<string, ToolDefinition[]>();

let totalTools = 0;

for (const cat of CATEGORIES) {
  const tools = extractTools(cat.module);
  totalTools += tools.length;

  categoryTools.set(cat.key, tools);
  categoryIndex.set(cat.key, {
    key: cat.key,
    label: cat.label,
    toolCount: tools.length,
    description: `${cat.label} API — ${tools.length} tools available`,
  });

  for (const tool of tools) {
    toolIndex.set(tool.name, tool);
  }
}

console.error(`[lark-mcp] Loaded ${totalTools} tools across ${CATEGORIES.length} categories`);

// ── MCP Server ───────────────────────────────────────────────────────

const server = new McpServer({
  name: "lark-mcp-catalog",
  version: "1.0.0",
});

// ── Tool 1: lark_list_categories ─────────────────────────────────────

server.tool(
  "lark_list_categories",
  "List all 61 major Lark API categories with their tool counts. Use this to discover which Lark API domains are available before drilling into a specific category. Categories include Messaging (IM), Calendar, Contact, Drive, Docs, Sheets, Bitable, Mail, Approval, Attendance, Hire, OKR, Video Conferencing, and many more.",
  {},
  async () => {
    const categories = Array.from(categoryIndex.values()).map((c) => ({
      key: c.key,
      label: c.label,
      toolCount: c.toolCount,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              totalCategories: categories.length,
              totalTools,
              categories,
              nextStep:
                "Use lark_get_category with one of the category keys above to see all tools in that category.",
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ── Tool 2: lark_get_category ────────────────────────────────────────

server.tool(
  "lark_get_category",
  "Get all official Lark API tools for a given category. Returns every tool's name, description, HTTP method, API path, parameter schemas, and access tokens. Use this after lark_list_categories to drill into a specific domain like im_v1 (Messaging), contact_v3 (Contacts), calendar_v4 (Calendar), drive_v1 (Drive), bitable_v1 (Bitable), sheets_v3 (Sheets), etc.",
  {
    category: z
      .string()
      .describe(
        "The category key from lark_list_categories (e.g., 'im_v1', 'contact_v3', 'calendar_v4', 'drive_v1', 'bitable_v1', 'sheets_v3', 'approval_v4', 'mail_v1', 'vc_v1', 'hire_v1')"
      ),
  },
  async ({ category }) => {
    const tools = categoryTools.get(category);
    const info = categoryIndex.get(category);

    if (!tools) {
      const available = Array.from(categoryIndex.keys()).join(", ");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: `Unknown category: "${category}"`,
                availableCategories: available,
                hint: "Use lark_list_categories to see all available categories.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              category: info,
              toolCount: tools.length,
              tools: tools.map((t) => ({
                name: t.name,
                description: t.description,
                httpMethod: t.httpMethod,
                path: t.path,
                accessTokens: t.accessTokens,
                parameters: t.schema,
              })),
              nextStep:
                "Use lark_get_tool with a specific tool name (e.g., 'im.v1.message.create') to get its complete schema.",
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ── Tool 3: lark_get_tool ────────────────────────────────────────────

server.tool(
  "lark_get_tool",
  "Get the complete schema for a single Lark API tool. Returns the tool's name, full description, HTTP method, endpoint path, all parameter schemas with types and descriptions, and required access tokens. Use this when you need the exact parameter details for a specific API call.",
  {
    toolName: z
      .string()
      .describe(
        "The fully qualified tool name (e.g., 'im.v1.message.create', 'contact.v3.department.list', 'calendar.v4.calendarEvent.create', 'drive.v1.file.upload', 'bitable.v1.appTableRecord.create')"
      ),
  },
  async ({ toolName }) => {
    const tool = toolIndex.get(toolName);

    if (!tool) {
      // Find similar tools
      const similar = Array.from(toolIndex.keys())
        .filter((n) => n.includes(toolName.split(".").slice(0, 2).join(".")))
        .slice(0, 10);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: `Tool not found: "${toolName}"`,
                similarTools: similar,
                hint: "Use lark_get_category to browse all tools in a category, or lark_list_categories to see all categories.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              tool: {
                name: tool.name,
                description: tool.description,
                httpMethod: tool.httpMethod,
                path: tool.path,
                accessTokens: tool.accessTokens,
                parameters: tool.schema,
              },
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ── Start ────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[lark-mcp] Server started on stdio");
}

main().catch((err) => {
  console.error("[lark-mcp] Fatal error:", err);
  process.exit(1);
});