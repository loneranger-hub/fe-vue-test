import { vi } from 'vitest'

// Mock Nuxt auto-imports
global.defineNuxtConfig = vi.fn()
global.useHead = vi.fn()
global.useSeoMeta = vi.fn()

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
  log: vi.fn(),
}
