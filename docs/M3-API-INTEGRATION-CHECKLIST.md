# FlowForge – M3 API Integration Test Checklist

## 1. Purpose

Verify that the API correctly interacts with the M3 MongoDB database and follows the existing Mongoose schemas.

## 2. User and Authentication

- [ ] User registration saves a valid User document.
- [ ] Duplicate email registration is rejected.
- [ ] Login retrieves the correct user.
- [ ] Password hashes are not exposed in ordinary queries or API responses.

## 3. Tenant Management

- [ ] Tenant creation saves a Tenant document.
- [ ] Tenant owner is correctly referenced.
- [ ] Tenant membership saves the correct tenantId and userId.
- [ ] Duplicate tenant membership is rejected.

## 4. Workflow Management

- [ ] Workflow creation saves the correct tenantId.
- [ ] Workflow retrieval returns only the authenticated tenant's workflows.
- [ ] Workflow updates do not modify another tenant's workflow.
- [ ] Workflow deletion affects only the authorized tenant's workflow.

## 5. Execution Management

- [ ] Execution references the correct tenant and workflow.
- [ ] Node executions reference the correct execution.
- [ ] Execution logs are associated with the correct tenant.
- [ ] Execution metrics are saved correctly.

## 6. Tenant Isolation

- [ ] Tenant A can access its own workflows.
- [ ] Tenant B can access its own workflows.
- [ ] Tenant A cannot access Tenant B's workflows.
- [ ] Tenant A cannot update or delete Tenant B's resources.
- [ ] Tenant membership is verified on the server.
- [ ] Client-supplied tenantId is not trusted without verification.

## 7. Database Integrity

- [ ] Required fields are validated.
- [ ] Invalid enum values are rejected.
- [ ] References point to valid records.
- [ ] Referenced tenant-owned records belong to the same tenant.
- [ ] Unique indexes prevent duplicate records.

## 8. Test Summary

Total tests: To be determined after API integration.

Passed: Pending

Failed: Pending

Status: Waiting for API implementation.

## 9. Responsibility

M3 verifies database persistence, schema compatibility, indexes, references and tenant data integrity.

API authentication, authorization and endpoint behavior must be implemented by the API/backend team.
