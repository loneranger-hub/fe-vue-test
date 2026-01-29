# AI Analysis Dashboard

An intelligent analysis platform built with Nuxt 3, Vue 3, TypeScript, and Pinia. This application provides a conversational interface for data visualization and analysis.

## Features

- 💬 **Chat Interface**: Interactive chat system with typewriter effects
- 📊 **Dynamic Widgets**: Support for charts, tables, and extensible widget system
- 🎯 **Type-Safe**: Full TypeScript support with strict type checking
- 🏗️ **Scalable Architecture**: Clean separation of concerns with services, composables, and stores
- 🔧 **Extensible**: Easy to add new action types and widget components

## Tech Stack

- **Framework**: Nuxt 3
- **UI**: Vue 3 (Composition API)
- **Language**: TypeScript
- **State Management**: Pinia
- **Charts**: Chart.js with vue-chartjs

## Project Structure

```
├── assets/          # Static assets (CSS, images)
├── components/      # Vue components
├── composables/     # Vue composables (UI logic)
├── constants/       # Application constants
├── layouts/         # Nuxt layouts
├── pages/           # Nuxt pages (routes)
├── services/        # Business logic services
├── stores/          # Pinia stores (state management)
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Setup

Make sure to install dependencies:

```bash
# npm
npm install --legacy-peer-deps

# pnpm
pnpm install --legacy-peer-deps

# yarn
yarn install --legacy-peer-deps

# bun
bun install --legacy-peer-deps
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Usage

1. Navigate to `http://localhost:3000`
2. Click "Go to chat section" to open the chat interface
3. Try these commands:
   - **View Sales Chart**: "Show me sales report" or "sales"
   - **Switch Views**: "Change to table view instead" or "Show chart instead"
   - **Greeting**: "Hello" or "Hi"

## Architecture Highlights

### Separation of Concerns

- **Services**: Business logic (agent interactions, widget generation)
- **Composables**: UI logic (scrolling, formatting, effects)
- **Stores**: State management (chat messages, widget state)
- **Components**: Presentation layer

### Type Safety

- Strong TypeScript typing throughout
- Type guards for runtime type checking
- No `any` types in core logic

### Extensibility

- Widget registry system for dynamic component loading
- Easy to add new action types
- Service-based architecture allows easy API integration

## Testing

The project includes comprehensive unit tests with >90% code coverage.

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Coverage

Tests cover:

- ✅ Services (agentService, widgetService)
- ✅ Stores (chatStore, chartStore)
- ✅ Composables (useChat, useAgent, useWidget)
- ✅ Utils (widgetRegistry, errorHandler)
- ✅ Type guards

See [tests/README.md](./tests/README.md) for more details.

## Building for Production

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

# Architecture Documentation

## Directory Structure

```
ai-analysis-dashboard/
├── assets/              # Static assets (CSS, images)
├── components/          # Vue components
├── composables/         # Vue composables (UI logic)
├── constants/           # Application constants
├── docs/                # Documentation
├── layouts/             # Nuxt layouts
├── pages/               # Nuxt pages (routes)
├── services/            # Business logic services
├── stores/              # Pinia stores (state management)
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Architecture Layers

### 1. **Types Layer** (`types/`)

- **Purpose**: Centralized type definitions
- **Files**:
  - `models.ts`: Core data models (Message, WidgetComponent, etc.)
  - `actions.ts`: Action type definitions with type guards

**Key Types**:

- `Message`: Chat message structure
- `Action`: Union type for all action types (ChartAction, TableAction)
- `WidgetComponent`: Widget component structure

### 2. **Constants Layer** (`constants/`)

- **Purpose**: Application-wide constants and configuration
- **Files**:
  - `actionTypes.ts`: Action type enums and configuration constants

**Benefits**:

- Single source of truth for action types
- Easy to extend with new action types
- Configuration values in one place

### 3. **Services Layer** (`services/`)

- **Purpose**: Business logic separated from UI concerns
- **Files**:
  - `agentService.ts`: AI agent interaction logic
  - `widgetService.ts`: Widget generation and processing logic

**Key Services**:

- `AgentService`: Handles user input processing, action generation
- `WidgetService`: Converts actions to widget components, validates actions

**Benefits**:

- Testable business logic
- Reusable across different UI implementations
- Easy to swap implementations (e.g., real API vs mock)

### 4. **Utils Layer** (`utils/`)

- **Purpose**: Reusable utilities and registries
- **Files**:
  - `widgetRegistry.ts`: Component registry for dynamic widget loading
  - `errorHandler.ts`: Centralized error handling

**Key Utilities**:

- `WidgetRegistry`: Maps widget names to Vue components
- `ErrorHandler`: Standardized error handling and logging

**Benefits**:

- Extensible widget system
- Consistent error handling
- Easy to add new widget types

### 5. **Stores Layer** (`stores/`)

- **Purpose**: State management using Pinia
- **Files**:
  - `chatStore.ts`: Chat-related state (messages, loading states)
  - `chartStore.ts`: Widget/chart state (current component, previous action)

**Benefits**:

- Centralized state management
- Type-safe state
- Reactive updates across components

### 6. **Composables Layer** (`composables/`)

- **Purpose**: Vue composition functions for UI logic
- **Files**:
  - `useChat.ts`: Chat UI utilities (scrolling, formatting, typewriter effect)
  - `useAgent.ts`: Message processing orchestration
  - `useWidget.ts`: Widget handling logic

**Separation**:

- `useChat`: Pure UI concerns (scrolling, formatting)
- `useAgent`: Orchestrates message processing flow
- `useWidget`: Handles widget generation and display

**Benefits**:

- Clear separation of UI vs business logic
- Reusable across components
- Easy to test

### 7. **Components Layer** (`components/`)

- **Purpose**: Vue components for UI rendering
- **Files**:
  - `ChatBox.vue`: Chat interface component
  - `WidgetChart.vue`: Chart widget component
  - `WidgetTable.vue`: Table widget component

**Benefits**:

- Focused, single-responsibility components
- Type-safe props
- Reusable widgets

## Data Flow

```
User Input
    ↓
ChatBox Component
    ↓
useAgent Composable
    ↓
AgentService (processUserInput)
    ↓
AssistantResponse (with Action)
    ↓
useWidget Composable
    ↓
WidgetService (processAction)
    ↓
WidgetRegistry (get component)
    ↓
ChartStore (set component)
    ↓
Page Component (render widget)
```

## Key Design Patterns

### 1. **Service Pattern**

Business logic is encapsulated in service classes that can be easily tested and swapped.

### 2. **Registry Pattern**

Widget components are registered in a central registry, allowing dynamic loading and easy extension.

### 3. **Type Guards**

Type-safe action handling using TypeScript type guards (`isChartAction`, `isTableAction`).

### 4. **Composition Pattern**

UI logic is composed using Vue composables, keeping components clean and focused.

## Extensibility

### Adding a New Action Type

1. Add action type to `constants/actionTypes.ts`:

```typescript
export enum ActionType {
  // ... existing types
  SHOW_METRIC = "show_metric",
}
```

2. Create action interface in `types/actions.ts`:

```typescript
export interface MetricAction extends BaseAction {
  type: ActionType.SHOW_METRIC;
  value: number;
  label: string;
}
```

3. Add type guard:

```typescript
export function isMetricAction(action: Action): action is MetricAction {
  return action.type === ActionType.SHOW_METRIC;
}
```

4. Update `WidgetService` to handle new action type
5. Create widget component
6. Register component in `widgetRegistry`

### Adding a New Widget Component

1. Create component in `components/`
2. Register in `utils/widgetRegistry.ts`:

```typescript
import WidgetMetric from "~/components/WidgetMetric.vue";
widgetRegistry.register(WidgetComponent.METRIC, WidgetMetric);
```
