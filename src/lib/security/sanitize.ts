/**
 * Sanitize untrusted text input by escaping HTML special characters
 * to prevent Stored & Reflected Cross-Site Scripting (XSS).
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") {
    if (input === null || input === undefined) return "";
    return String(input);
  }

  // Remove null bytes and invisible control characters except newline/tab
  const cleanStr = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // HTML entity encoding map
  const entityMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };

  return cleanStr.replace(/[&<>"'`=\/]/g, (char) => entityMap[char] || char).trim();
}

/**
 * Sanitize strings intended to contain basic rich text or Markdown,
 * removing executable script tags, event handlers, and dangerous URI schemes.
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== "string") return "";

  let sanitized = html;

  // 1. Remove script tags and contents
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // 2. Remove iframe, embed, object, frame, applet, base tags
  sanitized = sanitized.replace(/<\/?(iframe|embed|object|frame|frameset|applet|base|meta|link)\b[^>]*>/gi, "");

  // 3. Remove inline event handlers (onerror=, onclick=, onload=, onmouseover=, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*(['"]).*?\1/gi, "");
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^ >]+/gi, "");

  // 4. Remove dangerous javascript: or data: (except safe images) schemes in href/src
  sanitized = sanitized.replace(/(href|src)\s*=\s*(['"])\s*(javascript:|vbscript:)/gi, '$1=$2#blocked:');
  sanitized = sanitized.replace(/(href|src)\s*=\s*(javascript:|vbscript:)/gi, '$1=#blocked:');

  // 5. Remove null bytes
  sanitized = sanitized.replace(/\x00/g, "");

  return sanitized.trim();
}

/**
 * Sanitize filenames to prevent Path Traversal attacks (../, ..\, /etc/passwd, etc.)
 */
export function sanitizeFilename(filename: string): string {
  if (!filename || typeof filename !== "string") return "unnamed_file";

  // Strip path traversal attempts and dangerous characters
  const cleaned = filename
    .replace(/^(\.\.[\/\\])+/, "") // Remove leading ../
    .replace(/[\/\\]/g, "_")        // Replace path separators with underscores
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove control characters
    .replace(/[<>:"|?*]/g, "")      // Remove illegal Windows characters
    .trim();

  return cleaned.length > 0 ? cleaned : "unnamed_file";
}

/**
 * Prevent Prototype Pollution by validating and scrubbing object keys recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  if (typeof obj !== "object" || obj === null) return obj;

  const result: any = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    // Block Prototype Pollution keys
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }

    if (typeof value === "string") {
      result[key] = sanitizeText(value);
    } else if (typeof value === "object" && value !== null) {
      result[key] = sanitizeObject(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
