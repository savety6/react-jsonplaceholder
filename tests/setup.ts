import '@testing-library/jest-dom/vitest'

import { setupServer } from 'msw/node';
import { handlers } from './mocksHandlers';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

// Mock matchMedia for testing Ant Design components
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    })
})

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());