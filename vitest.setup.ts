import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(window.URL, "createObjectURL", {
  writable: true,
  value: vi.fn(),
});
