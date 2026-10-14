# FlowForge

### Multi-Tenant Distributed Workflow & Saga Orchestration Engine

FlowForge is a workflow automation platform designed to help users visually build, manage, and monitor workflow pipelines through a centralized web application.

The project combines a React-based frontend with a Node.js and Express backend. It includes a visual Workflow Builder, dashboard, authentication interface, application settings, and backend API integration.

The application is being developed incrementally, with a focus on reusable components, readable code, modular architecture, and preserving a consistent user interface.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Current Features](#current-features)
- [Technology Stack](#technology-stack)
- [Application Routes](#application-routes)
- [Workflow Builder](#workflow-builder)
- [Settings](#settings)
- [Backend Overview](#backend-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Current Development Status](#current-development-status)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

---

## Project Overview

FlowForge aims to provide a centralized interface for designing and managing automated workflows.

The application includes:

- A public landing page.
- Login and signup interfaces.
- A dashboard for workflow-related information.
- A visual workflow editor.
- Application navigation and protected routes.
- Dedicated settings sections.
- A Node.js and Express backend with API routes.

The project is currently under active development. Some interfaces use local state or sample data, while backend integration is being implemented incrementally.

---

## Current Features

### Landing Page

- Public landing page.
- Product introduction and feature sections.
- Workflow automation overview.
- Navigation to authentication.
- Calls to action for getting started.

### Authentication

- Login and signup interfaces.
- Form input handling.
- Password visibility toggle.
- Form validation and error display.
- API request integration.
- Token storage in browser local storage.
- Protected application routes.

**Note:** The current authentication implementation is not yet a complete persistent authentication system. User persistence and full credential verification need to be implemented and verified before production use.

### Dashboard

- Dashboard layout and summary cards.
- Workflow execution charts.
- Recent execution information.
- Workflow status visualization.
- System health interface.
- Tenant information interface.

The Dashboard frontend has been connected to a backend API. The completeness of individual data sources depends on the corresponding backend endpoints.

### Application Layout

- Reusable Header component.
- Sidebar navigation.
- Shared application layout.
- Nested page routing.
- Protected application pages.
- Separate layouts for public and authenticated pages.

### Workflow Builder

- Visual workflow canvas using React Flow.
- Drag-and-drop workflow nodes.
- Node selection and configuration.
- Node and edge management.
- Conditional branching.
- Parallel workflow paths.
- Merge nodes.
- Workflow validation.
- Disconnected node detection.
- Workflow loop detection.
- Retry policy configuration.

Backend integration for workflow persistence and execution is under development.

### Settings

The Settings page contains seven sections:

1. General
2. Organization
3. Security
4. Integrations
5. Notifications
6. Billing
7. Advanced

The sections use reusable components and consistent styling.

Current frontend interactions include profile and organization forms, security preferences, integration toggles, notification preferences, billing plan displays, and advanced application preferences.

**Note:** These interfaces should not be interpreted as fully backend-persisted settings. Features such as real API key management, external service connections, billing operations, and workspace deletion require appropriate backend implementation.

---

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Redux Toolkit
- React Redux
- React Flow (`@xyflow/react`)
- Recharts
- Lucide React

### Backend

- Node.js
- Express.js
- JSON Web Tokens
- bcryptjs
- Joi
- CORS
- dotenv
- express-rate-limit

### Development Tools

- Git
- GitHub
- npm
- Visual Studio Code

### Planned Infrastructure

The broader project architecture may include persistent database storage, distributed workers, workflow execution services, Saga compensation, retry handling, real-time execution updates, and deployment infrastructure.

These capabilities should be considered planned or in development unless their implementation has been completed and tested.

---

## Application Routes

The application uses React Router with `createBrowserRouter`.

| Route         | Page             | Access    |
| ------------- | ---------------- | --------- |
| `/`           | Landing Page     | Public    |
| `/auth`       | Login / Signup   | Public    |
| `/dashboard`  | Dashboard        | Protected |
| `/workflows`  | Workflow Builder | Protected |
| `/executions` | Executions       | Protected |
| `/templates`  | Templates        | Protected |
| `/tenants`    | Tenants          | Protected |
| `/workers`    | Workers          | Protected |
| `/monitoring` | Monitoring       | Protected |
| `/alerts`     | Alerts           | Protected |
| `/settings`   | Settings         | Protected |

Protected routes check for the `flowforge_token` value in browser local storage.

This is a frontend navigation check, not a replacement for server-side authentication and authorization.

---

## Workflow Builder

The Workflow Builder is one of the main components of FlowForge.

It provides a visual canvas for creating workflow pipelines by connecting individual nodes.

### Supported Node Types

- Trigger
- HTTP Request
- Database
- Condition
- Transform
- Delay
- Custom Script
- Send Notification
- Parallel
- Merge

### Workflow Editing

Users can interact with the workflow canvas to:

- Add nodes from the node library.
- Connect nodes.
- Select nodes for configuration.
- Delete nodes and connections.
- Create conditional branches.
- Configure retry policies.
- Validate workflow structure.

### Backend Integration

Workflow API routes and handlers are being developed for workflow operations.

The intended functionality includes creating, retrieving, updating, deleting, validating, versioning, deploying, and testing workflows.

The availability of each operation depends on its current backend implementation. Full workflow execution and persistent storage should not be assumed complete.

---

## Backend Overview

The Express backend exposes API routes under the `/api` prefix.

### Current API Route Groups

| Route                | Purpose                           |
| -------------------- | --------------------------------- |
| `/api/health`        | Backend health check              |
| `/api/auth`          | Authentication-related operations |
| `/api/dashboard`     | Dashboard data                    |
| `/api/workflows`     | Workflow operations               |
| `/api/tenants`       | Tenant-related operations         |
| `/api/notifications` | Notification-related operations   |

Individual endpoints and their implementation status may change as backend development progresses.

### API Client

The frontend uses a shared API request helper located at:

`src/api/client.js`

The helper centralizes HTTP requests, JSON response handling, and basic error handling.

The API base URL can be configured using the `VITE_API_URL` environment variable. If it is not provided, the client uses `/api`.

### Backend Status

Backend development and frontend integration are ongoing.

The presence of a route does not necessarily mean its complete business logic, persistent storage, authorization rules, or error handling has been implemented.

---

## Project Structure

The following is the main application structure. Additional backend routes, services, middleware, validators, and frontend components are organized into their respective directories.

```text
PROJECT-1-Of-Zaalima/
│
├── src/
│   ├── api/
│   │   └── client.js
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── dashboard/
│   │   │
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── appRouter.jsx
│   │   │
│   │   ├── settings/
│   │   │   ├── AdvancedSettings.jsx
│   │   │   ├── BillingSettings.jsx
│   │   │   ├── GeneralSettings.jsx
│   │   │   ├── IntegrationsSettings.jsx
│   │   │   ├── NotificationsSettings.jsx
│   │   │   ├── OrganizationSettings.jsx
│   │   │   └── SecuritySettings.jsx
│   │   │
│   │   └── workflow/
│   │
│   ├── middleware/
│   │
│   ├── pages/
│   │   ├── Alerts.jsx
│   │   ├── AuthPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Executions.jsx
│   │   ├── LandingPage.jsx
│   │   ├── Monitoring.jsx
│   │   ├── Settings.jsx
│   │   ├── Templates.jsx
│   │   ├── Tenants.jsx
│   │   ├── Workers.jsx
│   │   └── Workflows.jsx
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── validators/
│   │
│   ├── store/
│   │
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── server.js
│
├── package.json
├── package-lock.json
└── README.md
```

Some directories may contain additional files as development continues.

---

## Getting Started

### Prerequisites

Install the following:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/rajyalaxmichevula/PROJECT1.git
```

### 2. Navigate to the Project

```bash
cd PROJECT1
```

### 3. Select the Development Branch

To work with the current frontend changes:

```bash
git checkout feature/member1-yogesh
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Frontend

```bash
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

### 6. Start the Backend

Open a second terminal in the project root and run:

```bash
npm run backend
```

The backend normally runs on port `5000`, unless configured otherwise.

The health endpoint is available at:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "OK",
  "message": "FlowForge backend is running"
}
```

The frontend and backend should be started separately during local development.

---

## Environment Configuration

The backend uses `dotenv` to load environment variables.

Create a `.env` file in the project root for the variables required by the current backend implementation.

For example:

```env
PORT=5000
```

Add other variables only when they are required by the implemented services, such as authentication secrets or database configuration.

Do not commit `.env` files containing secrets, passwords, tokens, or private credentials.

### Frontend API URL

The frontend API client supports:

```env
VITE_API_URL=/api
```

For local development with a separately running backend, use the API URL configuration and Vite proxy settings appropriate to the project's current setup.

Do not assume that a proxy is configured unless it is present in `vite.config.js`.

---

## Available Scripts

The current `package.json` defines these scripts:

| Command            | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Start the Vite development server               |
| `npm start`        | Start Vite                                      |
| `npm run frontend` | Start Vite                                      |
| `npm run backend`  | Start the Express backend using `src/server.js` |
| `npm run build`    | Build the frontend for production               |
| `npm run preview`  | Preview the production frontend build           |

The current test script is a placeholder and does not run an automated test suite.

---

## Current Development Status

### Completed Frontend Work

- Landing Page UI.
- Authentication page UI.
- Public and protected route configuration.
- Shared application layout.
- Sidebar and Header integration.
- Dashboard frontend.
- Workflow Builder frontend.
- Settings page structure.
- General Settings.
- Organization Settings.
- Security Settings.
- Integrations Settings.
- Notifications Settings.
- Billing Settings.
- Advanced Settings.
- Reusable components for repeated UI elements.
- Local interactions for settings toggles and preference reset.
- Frontend refactoring for readability and maintainability.

### In Progress

- Workflow frontend/backend integration.
- Workflow API behavior and persistence.
- Backend authentication improvements.
- Backend integration for Settings.
- Persistent user and organization preferences.
- Integration with real external services.
- Further validation and testing of API operations.

### Not Yet Assumed Complete

- Production-ready authentication and authorization.
- Persistent storage for all application settings.
- Real billing and subscription management.
- Real Slack, Discord, email, and webhook connection flows.
- Full distributed workflow execution.
- Production-grade Saga orchestration and compensation.
- Complete monitoring and deployment infrastructure.

---

## Future Improvements

- Complete Workflow Builder API integration.
- Persist workflows and workflow versions.
- Implement reliable workflow execution.
- Add execution history and detailed execution status.
- Complete backend authentication and authorization.
- Persist user and organization preferences.
- Add backend-connected notification settings.
- Implement integration credentials and connection management.
- Add comprehensive API and frontend tests.
- Improve loading, error, and empty states.
- Strengthen tenant isolation and backend validation.
- Prepare deployment and operational monitoring.

---

## Contributing

The project is developed collaboratively using Git and GitHub.

### Branch Workflow

Create or switch to the appropriate feature branch before making changes.

Current frontend development branch:

```text
feature/member1-yogesh
```

### Commit Changes

```bash
git add <files>
git commit -m "Describe your changes"
git push origin feature/member1-yogesh
```

Use meaningful commit messages and verify the staged files before committing.

Do not commit generated build artifacts, local environment files, credentials, or unrelated changes.

---

## Development Principles

FlowForge is being developed with the following principles:

- Preserve the existing UI and intended functionality.
- Keep React components readable and maintainable.
- Extract reusable components where they reduce duplication.
- Separate frontend responsibilities from backend business logic.
- Validate requests on the backend.
- Enforce authentication and authorization on protected API operations.
- Avoid exposing credentials or sensitive information.
- Integrate features incrementally and test them locally.

---

## License

No project-specific open-source license has been confirmed in this README. Refer to the repository's license file or project owner for usage and distribution terms.
