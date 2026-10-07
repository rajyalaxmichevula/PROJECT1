lowForge

Multi-Tenant Distributed Workflow & Saga Orchestration Engine

FlowForge is an enterprise-oriented web application for building, managing, and monitoring distributed workflow pipelines. The project is being developed as a team-based MERN application with a React frontend and a Node/Express backend.

At the current stage, the frontend foundation and Dashboard UI have been completed with mock data. Backend APIs are being prepared separately and will be integrated once the API contract is finalized.

Current Project Progress

Frontend Completed So Far

Vite + React project setup

Tailwind CSS integration

Lucide React icons

React Router setup

Redux Toolkit store setup

Application layout shell

Sidebar navigation

Header/navigation controls

Dashboard page and Dashboard widgets

Responsive Dashboard grid structure

Mock data for Dashboard UI

Frontend Git branch and first feature commit

Currently In Progress

Backend/API development by M2

Templates page by Ayush

Executions page by Ayush

Future Workflow Builder implementation by M1

Tech Stack

Frontend

React

Vite

Tailwind CSS

React Router DOM

Redux Toolkit

React Redux

Recharts

Lucide React

React Flow (@xyflow/react) for the planned workflow builder

Backend / Infrastructure

Planned project technologies include:

Node.js

Express

MongoDB / Mongoose

Redis

WebSockets

Workflow execution/state-machine services

Saga compensation and retry mechanisms

Docker and deployment tooling

Backend implementation is currently being handled separately by the backend team members.

Frontend Structure

src/
├── assets/
├── components/
│ ├── dashboard/
│ │ ├── ActiveTenants.jsx
│ │ ├── DashboardPageHeader.jsx
│ │ ├── DashboardStats.jsx
│ │ ├── ExecutionChart.jsx
│ │ ├── RecentExecutions.jsx
│ │ ├── StatCard.jsx
│ │ ├── SystemHealth.jsx
│ │ └── WorkflowStatus.jsx
│ │
│ └── layout/
│ ├── Header.jsx
│ ├── Sidebar.jsx
│ └── appRouter.jsx
│
├── pages/
│ ├── Alerts.jsx
│ ├── Dashboard.jsx
│ ├── Executions.jsx
│ ├── Monitoring.jsx
│ ├── Settings.jsx
│ ├── Templates.jsx
│ ├── Tenants.jsx
│ ├── Workers.jsx
│ └── Workflows.jsx
│
├── store/
│ └── store.js
│
├── App.jsx
├── index.css
└── main.jsx

Application Shell

The main application shell is implemented in App.jsx.

The current layout is:

App
├── Sidebar
├── Header
└── Outlet
└── Current Route Page

Outlet is used by React Router so the Sidebar and Header remain part of the common application shell while the active page changes.

Routing

Routing is handled with createBrowserRouter and RouterProvider.

Current routes:

Route

Page

Status

/dashboard

Dashboard

✅ Completed

/workflows

Workflows

🟡 Placeholder

/executions

Executions

🟡 In Progress

/templates

Templates

🟡 In Progress

/tenants

Tenants

🟡 Placeholder

/workers

Workers

🟡 Placeholder

/monitoring

Monitoring

🟡 Placeholder

/alerts

Alerts

🟡 Placeholder

/settings

Settings

🟡 Placeholder

Visiting / redirects to /dashboard.

Sidebar

The Sidebar provides route-aware navigation using React Router's NavLink.

Current navigation items:

Dashboard

Workflows

Executions

Templates

Tenants

Workers

Monitoring

Alerts

Settings

The active route receives the highlighted navigation state.

Header

The Header currently contains the main navigation controls required by the application design:

Current Tenant selector

Workflow/execution search field

Notifications button with unread count UI

Profile menu

Profile / Settings / Logout menu items

At this stage these values are frontend/mock state. Backend authentication, tenant context, and notifications will be integrated later.

Dashboard

The Dashboard is currently the most complete frontend page.

Current layout:

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

Dashboard Components

DashboardPageHeader.jsx

Contains:

Dashboard title

Dashboard description

Create Workflow button UI

The button is currently visual and will be connected to the Workflow Builder later.

DashboardStats.jsx

Displays four summary cards:

Total Workflows

Running

Completed

Failed

The component uses a data array and the reusable StatCard component.

StatCard.jsx

Reusable statistic card supporting:

Title

Main value

Percentage change

Description

Dynamic Lucide icon

Icon background/color

Positive/negative trend indicator

ExecutionChart.jsx

Uses Recharts to display workflow executions over time.

Current chart series:

Successful

Running

Failed

The UI includes a range selector for:

Last 7 Days

Last 30 Days

Last 90 Days

The data is currently mock data.

RecentExecutions.jsx

Displays the latest execution records with:

Execution ID

Workflow name

Status

Duration

Relative time

Current statuses:

Completed

Running

Failed

The data is currently mock data.

WorkflowStatus.jsx

Displays workflow distribution using a Recharts donut chart.

Current statuses:

Running

Completed

Failed

Pending

The total and percentages are calculated on the frontend from the status values.

SystemHealth.jsx

Displays the health of major platform services.

Current mock services:

API Server

Database

Message Queue

Workers

The widget shows service status and response/latency information.

ActiveTenants.jsx

Displays active tenant information in a table.

Current fields:

Name

Domain

Workflow count

Status

The current UI uses mock tenant data.

State Management

Redux Toolkit and React Redux have been installed and connected.

The current store is located at:

src/store/store.js

At this stage the store has been initialized with an empty reducer object because real application state will be added as backend-connected features are implemented.

Styling

Tailwind CSS is integrated through the Vite plugin.

The current UI follows a consistent dashboard design system using:

Slate-based backgrounds and borders

Blue primary actions

Green success states

Red failure states

Card-based layout

Rounded corners

Light shadows

Responsive grid layouts

Running the Frontend Locally

Install dependencies:

npm install

Start the development server:

npm start

The Vite development server runs at:

http://localhost:5173/

GitHub Workflow

The frontend work is being developed on the dedicated member branch:

feature/member1-yogesh

Current completed frontend commit:

feat: complete dashboard frontend

Team members are expected to work on their own branches and commit their actual work to those branches before the team lead merges approved work.

Current Team Responsibilities

M1 — Yogesh

Frontend development and UI integration.

Current work:

Dashboard

App shell

Header

Sidebar

Frontend routing

Redux setup

Planned Workflow Builder

Future API integration

M2 — Backend/API

Responsible for backend services and Dashboard/API integration contracts.

Current work:

Dashboard APIs

Authentication/user data APIs

Tenant APIs

Notification API

Backend integration support

Ayush

Frontend page development alongside M1.

Current work:

Templates page

Executions page

Backend Integration Plan

The current Dashboard uses mock data so the UI can be completed independently of the backend.

The frontend will later consume APIs for:

Dashboard statistics

Execution analytics

Recent executions

Workflow status distribution

System health

Active tenants

Current user/profile information

Available tenants and tenant switching

Notifications

API response contracts will be finalized with the backend team before frontend integration.

The backend must enforce authentication, authorization, and tenant isolation. The frontend should not be treated as the authority for tenant access.

Next Frontend Steps

Finish Templates page.

Finish Executions page.

Build the Workflow Builder using React Flow.

Review the pages together for consistent UI/UX.

Integrate the finalized backend APIs.

Add loading, error, empty, and real-data states.

Continue with the remaining platform pages.

Development Principle

The frontend is being built incrementally with readable React code, simple component responsibilities, reusable patterns where they provide real value, and backend integration added after the API contracts are finalized.
