export type WebGLSupportResult =
  | { ok: true; renderer?: string; vendor?: string }
  | { ok: false; reason: "NO_WEBGL" | "CONTEXT_LOST" | "DISABLED_OR_BLOCKED" };

export function checkWebGLSupport(): WebGLSupportResult {
  const canvas = document.createElement("canvas");

  // try webgl
  const gl =
    (canvas.getContext("webgl2", { antialias: false }) as WebGL2RenderingContext | null) ??
    (canvas.getContext("webgl", { antialias: false }) as WebGLRenderingContext | null) ??
    (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

  if (!gl) {
    return { ok: false, reason: "NO_WEBGL" };
  }

  const ext = gl.getExtension("WEBGL_debug_renderer_info");
  const vendor = ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : undefined;
  const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : undefined;

  // If debug info exists and says disabled, treat as blocked.
  if (
    typeof vendor === "string" &&
    typeof renderer === "string" &&
    (vendor.toLowerCase().includes("disabled") || renderer.toLowerCase().includes("disabled"))
  ) {
    return { ok: false, reason: "DISABLED_OR_BLOCKED" };
  }

  return { ok: true, vendor, renderer };
}
