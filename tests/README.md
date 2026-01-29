# Testing Guide

This directory contains unit tests for the AI Analysis Dashboard project.

## Test Structure

```
tests/
├── composables/     # Tests for Vue composables
├── services/        # Tests for business logic services
├── stores/          # Tests for Pinia stores
├── types/           # Tests for type guards
├── utils/           # Tests for utility functions
└── setup.ts         # Test setup and configuration
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run tests with UI
```bash
npm run test:ui
```

## Coverage Goals

The project aims for **>90% code coverage** across:
- Lines: 90%
- Functions: 90%
- Branches: 90%
- Statements: 90%

## Test Files

### Services
- `services/agentService.test.ts` - Tests for AI agent service
- `services/widgetService.test.ts` - Tests for widget generation service

### Stores
- `stores/chatStore.test.ts` - Tests for chat state management
- `stores/chartStore.test.ts` - Tests for chart/widget state management

### Composables
- `composables/useChat.test.ts` - Tests for chat UI composable
- `composables/useAgent.test.ts` - Tests for agent message processing
- `composables/useWidget.test.ts` - Tests for widget handling

### Utils
- `utils/widgetRegistry.test.ts` - Tests for widget registry
- `utils/errorHandler.test.ts` - Tests for error handling utilities

### Types
- `types/actions.test.ts` - Tests for type guards

## Writing New Tests

When adding new functionality:

1. **Services**: Test all public methods, edge cases, and error handling
2. **Stores**: Test state mutations, getters, and actions
3. **Composables**: Test return values and side effects
4. **Utils**: Test all utility functions with various inputs

## Best Practices

1. **Isolation**: Each test should be independent
2. **Naming**: Use descriptive test names that explain what is being tested
3. **Arrange-Act-Assert**: Structure tests clearly
4. **Coverage**: Aim for comprehensive coverage including edge cases
5. **Mocking**: Mock external dependencies appropriately

## Example Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest'

describe('FeatureName', () => {
  beforeEach(() => {
    // Setup
  })

  describe('methodName', () => {
    it('should do something', () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
```
