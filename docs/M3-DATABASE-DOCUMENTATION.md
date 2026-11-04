# FlowForge – M3 Database Documentation

## 1. Overview

M3 is responsible for the MongoDB database architecture and multi-tenancy data layer of FlowForge.

Technology:
- MongoDB Atlas
- Mongoose ODM
- Node.js
- JavaScript

Database name: flowforge
Atlas cluster: FlowForgeCluster

## 2. Database Configuration

Database configuration is maintained in:
- src/config/db.js

The application connects using the MONGODB_URI environment variable.
The database name is explicitly configured as flowforge.

The server connects to MongoDB before starting the application listener.

Important:
- Database credentials must remain in the .env file.
- Never commit database credentials or connection strings.

## 3. Mongoose Models and Collections

FlowForge contains 22 Mongoose models:

| No. | Model | Collection |
|---|---|---|
| 1 | User | users |
| 2 | Tenant | tenants |
| 3 | TenantMember | tenantmembers |
| 4 | Workflow | workflows |
| 5 | WorkflowVersion | workflowversions |
| 6 | Execution | executions |
| 7 | NodeExecution | nodeexecutions |
| 8 | ExecutionLog | executionlogs |
| 9 | ExecutionMetrics | executionmetrics |
| 10 | Worker | workers |
| 11 | WorkerMetrics | workermetrics |
| 12 | Alert | alerts |
| 13 | AlertHistory | alerthistories |
| 14 | Notification | notifications |
| 15 | OrganizationSettings | organizationsettings |
| 16 | UserSettings | usersettings |
| 17 | Integration | integrations |
| 18 | ApiKey | apikeys |
| 19 | Session | sessions |
| 20 | AuditLog | auditlogs |
| 21 | WorkflowTemplate | workflowtemplates |
| 22 | Quota | quotas |

All 22 collections were verified in MongoDB Atlas.

## 4. Multi-Tenancy Architecture

FlowForge supports multiple tenants using tenant-specific data ownership.

Most tenant-owned models contain a tenantId field referencing the Tenant model.

Tenant isolation principles:
- Tenant-owned records are associated with a tenantId.
- Database queries for tenant-owned resources should include the authenticated tenantId.
- Tenant identity must be verified through authenticated membership.
- The server must not trust a tenantId supplied directly by the frontend.
- Cross-tenant resource access must be prevented.

Tenant-scoped query example:

    Workflow.find({
        tenantId: authenticatedTenantId
    });

The authenticatedTenantId must come from verified server-side authentication and membership context.

## 5. Database Indexing

Indexes are configured to improve query performance and enforce uniqueness.

Important indexes include:
- User email: unique
- Tenant membership: unique tenantId and userId combination
- Workflow versions: unique tenantId, workflowId and version combination
- API key hash: unique
- Session token hash: unique
- Organization settings: unique tenantId
- Quota: unique tenantId

Tenant-first compound indexes support tenant-scoped queries.

Schema index comparison with MongoDB Atlas:
- 38 index definitions matched.
- 0 missing indexes.

Index optimization should be reviewed again using real application query workloads.

## 6. Schema Validation

Mongoose schemas define:
- Required fields
- Data types
- Enum restrictions
- Minimum and maximum values
- String length restrictions
- Default values
- References between models

Sensitive fields protected using select: false:
- User.passwordHash
- Session.tokenHash
- ApiKey.keyHash

## 7. Model Relationships

Important relationships include:

- TenantMember references Tenant and User.
- Workflow references Tenant and User.
- WorkflowVersion references Tenant and Workflow.
- Execution references Tenant, Workflow and WorkflowVersion.
- NodeExecution references Tenant, Execution, Workflow and Worker.
- ExecutionLog references Tenant, Execution, NodeExecution and Workflow.
- ExecutionMetrics references Tenant, Execution, NodeExecution and Workflow.
- AlertHistory references Tenant, Alert and User.
- WorkerMetrics references Tenant and Worker.

All 48 registered Mongoose references passed the model registration check.

Reference registration does not by itself guarantee that referenced records belong to the same tenant. That must also be enforced by application-level validation.

## 8. Change Streams

MongoDB Change Streams were tested successfully.

Operations verified:
- INSERT
- UPDATE
- DELETE

The tests confirmed that MongoDB Change Streams can detect these database changes.

## 9. Testing and Verification Results

Model tests:
- Total: 79
- Passed: 79
- Failed: 0

Additional verification:
- All 22 models loaded successfully.
- All 22 Atlas collections were found.
- 38 schema indexes matched Atlas indexes.
- 48 model references passed registration checks.
- 24 enum validation checks passed.
- Tenant-scoped query isolation: 3/3 passed.
- Change Streams: INSERT, UPDATE and DELETE passed.
- Sensitive field selection settings verified.
- Database configuration and server startup previously verified.

## 10. Current Database Status

At the time of the database audit:
- 22 collections existed in Atlas.
- Total application documents: 0.
- Temporary tenant-isolation test records were cleaned up.

The database structure is initialized and verified. Real application data integrity will need verification after API integration.

## 11. Pending Integration Work

The API implementation is being handled by another team member.

After API development is completed, the following checks are required:
- User registration and login database operations.
- Tenant creation and membership operations.
- Workflow creation and retrieval.
- Execution and node execution persistence.
- Tenant authorization and cross-tenant API access tests.
- Verification of referenced records and tenant consistency.

These are integration checks and are not claimed as completed M3 database tests.

## 12. M3 Responsibility Summary

M3 Database and Multi-Tenancy responsibilities:
- MongoDB database configuration.
- Mongoose schema and model development.
- Database collection architecture.
- Schema validation.
- Index creation and verification.
- Model reference configuration.
- Multi-tenant data ownership design.
- Tenant-scoped query verification.
- Change Streams verification.
- Database testing and documentation.

## 13. Conclusion

The FlowForge M3 database implementation contains 22 Mongoose models and 22 verified MongoDB Atlas collections.

All 79 model tests passed. Index definitions, model references, tenant-scoped query behavior and Change Streams were also verified.

The database implementation is ready for API integration and subsequent end-to-end verification.
