# FlowForge

## Multi-Tenant Distributed Workflow & Saga Orchestration Engine

FlowForge is an enterprise-oriented web application for building, managing, and monitoring distributed workflow pipelines. The project is being developed as a team-based MERN application with a React frontend and a Node/Express backend.

At the current stage, the frontend foundation, Dashboard UI, and Workflow Builder frontend have been completed with mock/local frontend state. Backend APIs are being prepared separately and will be integrated once the API contracts are finalized.

---

# Current Project Progress

## Frontend Completed So Far

- Vite + React project setup
- Tailwind CSS integration
- Lucide React icons
- React Router setup
- Redux Toolkit store setup
- Application layout shell
- Sidebar navigation
- Header/navigation controls
- Dashboard page and Dashboard widgets
- Responsive Dashboard grid structure
- Mock data for Dashboard UI
- Workflow Builder frontend
- React Flow workflow canvas
- Draggable workflow node library
- Custom workflow nodes
- Node configuration panel
- Conditional branching with TRUE/FALSE paths
- Parallel and Merge flow control
- Workflow validation
- Disconnected node detection
- Workflow loop detection
- Retry policy configuration
- Frontend Git branch and feature commits

## Currently In Progress

- Backend/API development by M2
- Templates page by Ayush
- Executions page by Ayush
- Backend API integration

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Redux Toolkit
- React Redux
- Recharts
- Lucide React
- React Flow (`@xyflow/react`) for the Workflow Builder

## Backend / Infrastructure

Planned project technologies include:

- Node.js
- Express
- MongoDB / Mongoose
- Redis
- WebSockets
- Workflow execution/state-machine services
- Saga compensation and retry mechanisms
- Docker and deployment tooling

Backend implementation is currently being handled separately by the backend team members.

---

# Frontend Structure

```text
src/
├── assets/
│
├── components/
│   ├── dashboard/
│   │   ├── ActiveTenants.jsx
│   │   ├── DashboardPageHeader.jsx
│   │   ├── DashboardStats.jsx
│   │   ├── ExecutionChart.jsx
│   │   ├── RecentExecutions.jsx
│   │   ├── StatCard.jsx
│   │   ├── SystemHealth.jsx
│   │   └── WorkflowStatus.jsx
│   │
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── appRouter.jsx
│   │
│   └── workflow/
│       ├── NodeConfigPanel.jsx
│       ├── NodeLibrary.jsx
│       ├── WorkflowCanvas.jsx
│       ├── WorkflowNode.jsx
│       ├── WorkflowPageHeader.jsx
│       └── workflowValidation.js
│
├── pages/
│   ├── Alerts.jsx
│   ├── Dashboard.jsx
│   ├── Executions.jsx
│   ├── Monitoring.jsx
│   ├── Settings.jsx
│   ├── Templates.jsx
│   ├── Tenants.jsx
│   ├── Workers.jsx
│   └── Workflows.jsx
│
├── store/
│   └── store.js
│
├── App.jsx
├── index.css
└── main.jsx
```

---

# Application Shell

The main application shell is implemented in `App.jsx`.

The current layout is:

```text
App
├── Sidebar
├── Header
└── Outlet
    └── Current Route Page
```

`Outlet` is used by React Router so the Sidebar and Header remain part of the common application shell while the active page changes.

---

# Routing

Routing is handled with `createBrowserRouter` and `RouterProvider`.

## Current Routes

| Route         | Page       | Status                |
| ------------- | ---------- | --------------------- |
| `/dashboard`  | Dashboard  | ✅ Completed          |
| `/workflows`  | Workflows  | ✅ Frontend Completed |
| `/executions` | Executions | 🟡 In Progress        |
| `/templates`  | Templates  | 🟡 In Progress        |
| `/tenants`    | Tenants    | 🟡 Placeholder        |
| `/workers`    | Workers    | 🟡 Placeholder        |
| `/monitoring` | Monitoring | 🟡 Placeholder        |
| `/alerts`     | Alerts     | 🟡 Placeholder        |
| `/settings`   | Settings   | 🟡 Placeholder        |

Visiting `/` redirects to `/dashboard`.

---

# Sidebar

The Sidebar provides route-aware navigation using React Router's `NavLink`.

Current navigation items:

- Dashboard
- Workflows
- Executions
- Templates
- Tenants
- Workers
- Monitoring
- Alerts
- Settings

The active route receives the highlighted navigation state.

---

# Header

The Header currently contains the main navigation controls required by the application design:

- Current Tenant selector
- Workflow/execution search field
- Notifications button with unread count UI
- Profile menu
- Profile / Settings / Logout menu items

At this stage these values are frontend/mock state. Backend authentication, tenant context, and notifications will be integrated later.

---

# Dashboard

The Dashboard is currently one of the most complete frontend pages.

## Current Layout

```text
Dashboard Header

Dashboard Stats
├── Total Workflows
├── Running
├── Completed
└── Failed

Main Dashboard Row
├── Workflow Executions Chart
└── Recent Executions

Bottom Dashboard Row
├── Workflows by Status
├── System Health
└── Active Tenants
```

## Dashboard Components

### DashboardPageHeader.jsx

Contains:

- Dashboard title
- Dashboard description
- Create Workflow button UI

The button is currently visual and will be connected to workflow creation/navigation as backend integration is completed.

### DashboardStats.jsx

Displays four summary cards:

- Total Workflows
- Running
- Completed
- Failed

The component uses a data array and the reusable `StatCard` component.

### StatCard.jsx

Reusable statistic card supporting:

- Title
- Main value
- Percentage change
- Description
- Dynamic Lucide icon
- Icon background/color
- Positive/negative trend indicator

### ExecutionChart.jsx

Uses Recharts to display workflow executions over time.

Current chart series:

- Successful
- Running
- Failed

The UI includes a range selector for:

- Last 7 Days
- Last 30 Days
- Last 90 Days

The data is currently mock data.

### RecentExecutions.jsx

Displays the latest execution records with:

- Execution ID
- Workflow name
- Status
- Duration
- Relative time

Current statuses:

- Completed
- Running
- Failed

The data is currently mock data.

### WorkflowStatus.jsx

Displays workflow distribution using a Recharts donut chart.

Current statuses:

- Running
- Completed
- Failed
- Pending

The total and percentages are calculated on the frontend from the status values.

### SystemHealth.jsx

Displays the health of major platform services.

Current mock services:

- API Server
- Database
- Message Queue
- Workers

The widget shows service status and response/latency information.

### ActiveTenants.jsx

Displays active tenant information in a table.

Current fields:

- Name
- Domain
- Workflow count
- Status

The current UI uses mock tenant data.

---

# Workflow Builder

The Workflow Builder is the main frontend surface for visually creating workflow pipelines using React Flow.

## Current Workflow Builder Features

- Drag and drop nodes from the Node Library
- Connect workflow nodes using React Flow
- Select and configure individual nodes
- Delete nodes and connections
- Conditional branching with TRUE and FALSE paths
- Parallel execution paths
- Merge multiple workflow paths
- Workflow validation
- Disconnected node detection
- Loop/cycle detection
- Retry policy configuration
- Save action with frontend validation
- Test Run action with frontend validation
- Deploy action with frontend validation

## Workflow Nodes

### Actions

- Trigger
- HTTP Request
- Database
- Condition
- Transform
- Delay
- Custom Script
- Send Notification

### Flow Control

- Parallel
- Merge

## Workflow Builder Structure

```text
Workflows
├── WorkflowPageHeader
├── NodeLibrary
├── WorkflowCanvas
│   └── WorkflowNode
├── NodeConfigPanel
└── workflowValidation
```

## Current Status

The Workflow Builder frontend is implemented with local frontend state.

The Save, Test Run, and Deploy actions currently perform frontend validation and UI behavior. Workflow data is not yet persisted across browser refreshes.

Persistent workflow storage, versioning, testing, deployment, and execution will be connected to the backend APIs provided by the backend team.

---

# State Management

Redux Toolkit and React Redux have been installed and connected.

The current store is located at:

```text
src/store/store.js
```

At this stage the store has been initialized with an empty reducer object because real application state will be added as backend-connected features are implemented.

---

# Styling

Tailwind CSS is integrated through the Vite plugin.

The current UI follows a consistent dashboard and application design system using:

- Slate-based backgrounds and borders
- Blue primary actions
- Green success states
- Red failure states
- Card-based layout
- Rounded corners
- Light shadows
- Responsive grid layouts

---

# Running the Frontend Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The Vite development server runs at:

```text
http://localhost:5173/
```

---

# GitHub Workflow

The frontend work is being developed on the dedicated member branch:

```text
feature/member1-yogesh
```

Current completed frontend commits include:

```text
feat: complete dashboard frontend
feat: build workflow builder frontend
```

Team members are expected to work on their own branches and commit their actual work to those branches before the team lead merges approved work.

---

# Current Team Responsibilities

## M1 — Yogesh

Frontend development and UI integration.

Current work:

- Dashboard
- App shell
- Header
- Sidebar
- Frontend routing
- Redux setup
- Workflow Builder
- Workflow validation and node configuration
- Future API integration

## M2 — Backend/API

Responsible for backend services and Dashboard/API integration contracts.

Current work:

- Dashboard APIs
- Authentication/user data APIs
- Tenant APIs
- Notification API
- Workflow APIs
- Backend integration support

## Ayush

Frontend page development alongside M1.

Current work:

- Templates page
- Executions page

---

# Backend Integration Plan

The current frontend uses mock data and local frontend state so UI development can continue independently of the backend.

The frontend will later consume APIs for:

- Dashboard statistics
- Execution analytics
- Recent executions
- Workflow status distribution
- System health
- Active tenants
- Current user/profile information
- Available tenants and tenant switching
- Notifications
- Workflow CRUD
- Workflow persistence
- Workflow versions
- Workflow test runs
- Workflow deployment
- Workflow execution

API response contracts will be finalized with the backend team before frontend integration.

The backend must enforce authentication, authorization, and tenant isolation. The frontend should not be treated as the authority for tenant access.

---

# Next Frontend Steps

- Finish Templates page
- Finish Executions page
- Review the pages together for consistent UI/UX
- Integrate the finalized backend APIs
- Add loading, error, empty, and real-data states
- Add backend-connected workflow save/load
- Connect workflow Test Run and Deploy actions to backend services
- Continue with the remaining platform pages

---

# Development Principle

The frontend is being built incrementally with readable React code, simple component responsibilities, reusable patterns where they provide real value, and backend integration added after the API contracts are finalized.
