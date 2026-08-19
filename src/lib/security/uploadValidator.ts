import { sanitizeFilename } from "./sanitize";

export interface FileValidationOptions {
  maxSizeBytes?: number;
  allowedExtensions?: string[];
  allowedMimeTypes?: string[];
}

export const DEFAULT_IMAGE_UPLOAD_CONFIG: FileValidationOptions = {
  maxSizeBytes: 5 * 1024 * 1024, // 5MB
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
};

export const DEFAULT_DOCUMENT_UPLOAD_CONFIG: FileValidationOptions = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  allowedExtensions: [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".doc", ".docx"],
  allowedMimeTypes: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  sanitizedName: string;
}

/**
 * Validate file against size, extension, MIME type, and sanitize filename
 */
export function validateUploadedFile(
  file: File,
  options: FileValidationOptions = DEFAULT_DOCUMENT_UPLOAD_CONFIG
): FileValidationResult {
  const sanitizedName = sanitizeFilename(file.name);

  // 1. Check file size
  const maxBytes = options.maxSizeBytes || 10 * 1024 * 1024;
  if (file.size > maxBytes) {
    const maxMb = Math.round(maxBytes / (1024 * 1024));
    return {
      valid: false,
      error: `File size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds maximum permitted limit of ${maxMb}MB.`,
      sanitizedName,
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: "File is empty or corrupted.",
      sanitizedName,
    };
  }

  // 2. Check Extension
  const extensionMatch = sanitizedName.match(/\.[0-9a-z]+$/i);
  const extension = extensionMatch ? extensionMatch[0].toLowerCase() : "";

  if (options.allowedExtensions && options.allowedExtensions.length > 0) {
    const isAllowedExt = options.allowedExtensions.some((ext) => ext.toLowerCase() === extension);
    if (!isAllowedExt) {
      return {
        valid: false,
        error: `File type "${extension}" is not allowed. Permitted formats: ${options.allowedExtensions.join(", ")}`,
        sanitizedName,
      };
    }
  }

  // 3. Check MIME Type
  if (options.allowedMimeTypes && options.allowedMimeTypes.length > 0) {
    const isAllowedMime = options.allowedMimeTypes.includes(file.type);
    if (!isAllowedMime) {
      return {
        valid: false,
        error: `MIME type "${file.type}" is not accepted.`,
        sanitizedName,
      };
    }
  }

  return {
    valid: true,
    sanitizedName,
  };
}

/**
 * Validate Magic Bytes buffer of an uploaded file to guarantee genuine file contents
 */
export async function validateFileMagicBytes(file: File): Promise<boolean> {
  try {
    const buffer = await file.slice(0, 8).arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // JPEG: ffd8ff
    if (hex.startsWith("ffd8ff")) return true;

    // PNG: 89504e47
    if (hex.startsWith("89504e47")) return true;

    // PDF: 25504446 (%PDF)
    if (hex.startsWith("25504446")) return true;

    // WebP: RIFF....WEBP (52494646)
    if (hex.startsWith("52494646")) return true;

    // Allow general documents if matching valid extension
    return false;
  } catch {
    return false;
  }
}
