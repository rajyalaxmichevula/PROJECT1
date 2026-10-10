
const mongoose = require("mongoose");

const User = require("./src/models/User");
const Tenant = require("./src/models/Tenant");
const TenantMember = require("./src/models/TenantMember");
const Workflow = require("./src/models/Workflow");
const WorkflowVersion = require("./src/models/WorkflowVersion");
const Execution = require("./src/models/Execution");
const NodeExecution = require("./src/models/NodeExecution");
const ExecutionLog = require("./src/models/ExecutionLog");
const ExecutionMetrics = require("./src/models/ExecutionMetrics");
const Worker = require("./src/models/Worker");
const WorkerMetrics = require("./src/models/WorkerMetrics");
const Alert = require("./src/models/Alert");
const AlertHistory = require("./src/models/AlertHistory");
const Notification = require("./src/models/Notification");
const OrganizationSettings = require("./src/models/OrganizationSettings");
const UserSettings = require("./src/models/UserSettings");
const Integration = require("./src/models/Integration");
const ApiKey = require("./src/models/ApiKey");
const Session = require("./src/models/Session");
const AuditLog = require("./src/models/AuditLog");
const WorkflowTemplate = require("./src/models/WorkflowTemplate");
const Quota = require("./src/models/Quota");

let passed = 0;
let failed = 0;

function check(description, condition) {
    if (condition) {
        console.log(`PASS: ${description}`);
        passed++;
    } else {
        console.error(`FAIL: ${description}`);
        failed++;
    }
}

async function expectValidationError(model, fields) {
    const error = await model.validate().then(
        () => null,
        validationError => validationError
    );

    return fields.every(field => Boolean(error?.errors[field]));
}

async function testModels() {
    console.log("\n===== FLOWFORGE MODEL TESTS =====\n");

    // 1. All model files load successfully.
    const models = [
        User,
        Tenant,
        TenantMember,
        Workflow,
        WorkflowVersion,
        Execution,
        NodeExecution,
        ExecutionLog,
        ExecutionMetrics,
        Worker,
        WorkerMetrics,
        Alert,
        AlertHistory,
        Notification,
        OrganizationSettings,
        UserSettings,
        Integration,
        ApiKey,
        Session,
        AuditLog,
        WorkflowTemplate,
        Quota
    ];

    check("All 22 models load", models.length === 22);

    for (const model of models) {
        check(`${model.modelName} model loads`, Boolean(model.modelName));
    }

    // 2. Required-field validation.
    check(
        "User requires name, email and passwordHash",
        await expectValidationError(new User(), [
            "name",
            "email",
            "passwordHash"
        ])
    );

    check(
        "Tenant requires name and ownerId",
        await expectValidationError(new Tenant(), ["name", "ownerId"])
    );

    check(
        "TenantMember requires tenantId and userId",
        await expectValidationError(new TenantMember(), [
            "tenantId",
            "userId"
        ])
    );

    check(
        "Workflow requires tenantId and name",
        await expectValidationError(new Workflow(), ["tenantId", "name"])
    );

    check(
        "WorkflowVersion requires tenantId, workflowId, version and createdBy",
        await expectValidationError(new WorkflowVersion(), [
            "tenantId",
            "workflowId",
            "version",
            "createdBy"
        ])
    );

    check(
        "Execution requires tenantId, workflowId and workflowVersionId",
        await expectValidationError(new Execution(), [
            "tenantId",
            "workflowId",
            "workflowVersionId"
        ])
    );

    check(
        "NodeExecution requires tenantId, executionId, workflowId, nodeId and nodeType",
        await expectValidationError(new NodeExecution(), [
            "tenantId",
            "executionId",
            "workflowId",
            "nodeId",
            "nodeType"
        ])
    );

    check(
        "ExecutionLog requires tenantId, executionId, workflowId and message",
        await expectValidationError(new ExecutionLog(), [
            "tenantId",
            "executionId",
            "workflowId",
            "message"
        ])
    );

    check(
        "ExecutionMetrics requires tenantId, executionId, workflowId and durationMs",
        await expectValidationError(new ExecutionMetrics(), [
            "tenantId",
            "executionId",
            "workflowId",
            "durationMs"
        ])
    );

    check(
        "Worker requires tenantId and name",
        await expectValidationError(new Worker(), ["tenantId", "name"])
    );

    check(
        "WorkerMetrics requires tenantId and workerId",
        await expectValidationError(new WorkerMetrics(), [
            "tenantId",
            "workerId"
        ])
    );

    check(
        "Alert requires tenantId, type, title and message",
        await expectValidationError(new Alert(), [
            "tenantId",
            "type",
            "title",
            "message"
        ])
    );

    check(
        "AlertHistory requires tenantId, alertId and action",
        await expectValidationError(new AlertHistory(), [
            "tenantId",
            "alertId",
            "action"
        ])
    );

    check(
        "Notification requires tenantId, userId, type, title and message",
        await expectValidationError(new Notification(), [
            "tenantId",
            "userId",
            "type",
            "title",
            "message"
        ])
    );

    check(
        "OrganizationSettings requires tenantId",
        await expectValidationError(new OrganizationSettings(), ["tenantId"])
    );

    check(
        "UserSettings requires userId",
        await expectValidationError(new UserSettings(), ["userId"])
    );

    check(
        "Integration requires tenantId, name, provider and createdBy",
        await expectValidationError(new Integration(), [
            "tenantId",
            "name",
            "provider",
            "createdBy"
        ])
    );

    check(
        "ApiKey requires tenantId, name, keyHash, keyPrefix and createdBy",
        await expectValidationError(new ApiKey(), [
            "tenantId",
            "name",
            "keyHash",
            "keyPrefix",
            "createdBy"
        ])
    );

    check(
        "Session requires userId, tokenHash and expiresAt",
        await expectValidationError(new Session(), [
            "userId",
            "tokenHash",
            "expiresAt"
        ])
    );

    check(
        "AuditLog requires action and resourceType",
        await expectValidationError(new AuditLog(), [
            "action",
            "resourceType"
        ])
    );

    check(
        "WorkflowTemplate requires name and createdBy",
        await expectValidationError(new WorkflowTemplate(), [
            "name",
            "createdBy"
        ])
    );

    check(
        "Quota requires tenantId",
        await expectValidationError(new Quota(), ["tenantId"])
    );

    // 3. User validation.
    const validUser = new User({
        name: "Test User",
        email: "GANESH@EXAMPLE.COM",
        passwordHash: "test-hash",
        status: "ACTIVE"
    });

    const validUserError = await validUser.validate().then(
        () => null,
        error => error
    );

    check("Valid user passes validation", !validUserError);

    check(
        "Email is converted to lowercase",
        validUser.email === "ganesh@example.com"
    );

    check(
        "User does not define a tenant-specific role",
        User.schema.path("role") === undefined
    );

    const invalidEmailUser = new User({
        name: "Test User",
        email: "not-an-email",
        passwordHash: "test-hash"
    });

    check(
        "Invalid email format is rejected",
        await expectValidationError(invalidEmailUser, ["email"])
    );

    const invalidUserStatus = new User({
        name: "Test User",
        email: "status-test@example.com",
        passwordHash: "test-hash",
        status: "UNKNOWN"
    });

    check(
        "Invalid user status is rejected",
        await expectValidationError(invalidUserStatus, ["status"])
    );

    // 4. Enum and numeric validation.
    const id = () => new mongoose.Types.ObjectId();

    check(
        "Invalid tenant plan is rejected",
        await expectValidationError(
            new Tenant({
                name: "Test Organization",
                ownerId: id(),
                plan: "GOLD"
            }),
            ["plan"]
        )
    );

    check(
        "Invalid membership role is rejected",
        await expectValidationError(
            new TenantMember({
                tenantId: id(),
                userId: id(),
                role: "SUPERADMIN"
            }),
            ["role"]
        )
    );

    check(
        "Invalid execution status is rejected",
        await expectValidationError(
            new Execution({
                tenantId: id(),
                workflowId: id(),
                workflowVersionId: id(),
                status: "UNKNOWN"
            }),
            ["status"]
        )
    );

    check(
        "Invalid node execution status is rejected",
        await expectValidationError(
            new NodeExecution({
                tenantId: id(),
                executionId: id(),
                workflowId: id(),
                nodeId: "node-001",
                nodeType: "HTTP_REQUEST",
                status: "UNKNOWN"
            }),
            ["status"]
        )
    );

    check(
        "Invalid execution log level is rejected",
        await expectValidationError(
            new ExecutionLog({
                tenantId: id(),
                executionId: id(),
                workflowId: id(),
                message: "Test log",
                level: "INVALID"
            }),
            ["level"]
        )
    );

    check(
        "ExecutionMetrics rejects CPU usage above 100",
        await expectValidationError(
            new ExecutionMetrics({
                tenantId: id(),
                executionId: id(),
                workflowId: id(),
                durationMs: 100,
                cpuUsage: 150
            }),
            ["cpuUsage"]
        )
    );

    check(
        "WorkerMetrics rejects CPU usage above 100",
        await expectValidationError(
            new WorkerMetrics({
                tenantId: id(),
                workerId: id(),
                cpuUsage: 150
            }),
            ["cpuUsage"]
        )
    );

    check(
        "Invalid alert severity is rejected",
        await expectValidationError(
            new Alert({
                tenantId: id(),
                type: "WORKER_FAILURE",
                title: "Worker failure",
                message: "Test",
                severity: "EXTREME"
            }),
            ["severity"]
        )
    );

    check(
        "Invalid notification type is rejected",
        await expectValidationError(
            new Notification({
                tenantId: id(),
                userId: id(),
                type: "INVALID",
                title: "Test",
                message: "Test"
            }),
            ["type"]
        )
    );

    check(
        "Invalid user settings theme is rejected",
        await expectValidationError(
            new UserSettings({
                userId: id(),
                theme: "NEON"
            }),
            ["theme"]
        )
    );

    check(
        "Invalid integration status is rejected",
        await expectValidationError(
            new Integration({
                tenantId: id(),
                name: "Test",
                provider: "Test Provider",
                createdBy: id(),
                status: "UNKNOWN"
            }),
            ["status"]
        )
    );

    check(
        "Invalid API key status is rejected",
        await expectValidationError(
            new ApiKey({
                tenantId: id(),
                name: "Test Key",
                keyHash: "test-hash",
                keyPrefix: "ff_test",
                createdBy: id(),
                status: "UNKNOWN"
            }),
            ["status"]
        )
    );

    check(
        "Invalid quota plan is rejected",
        await expectValidationError(
            new Quota({
                tenantId: id(),
                plan: "GOLD"
            }),
            ["plan"]
        )
    );

    // 5. Important schema index definitions.
    function hasIndex(model, expectedFields, requireUnique = false) {
        return model.schema.indexes().some(([fields, options]) => {
            const matches = Object.entries(expectedFields).every(
                ([key, value]) => fields[key] === value
            );

            return matches && (!requireUnique || options.unique === true);
        });
    }

    check(
        "User has a unique email index",
        hasIndex(User, { email: 1 }, true)
    );

    check(
        "TenantMember has a unique tenantId/userId index",
        hasIndex(TenantMember, { tenantId: 1, userId: 1 }, true)
    );

    check(
        "TenantMember has a userId/tenantId lookup index",
        hasIndex(TenantMember, { userId: 1, tenantId: 1 })
    );

    check(
        "WorkflowVersion has a unique tenantId/workflowId/version index",
        hasIndex(
            WorkflowVersion,
            { tenantId: 1, workflowId: 1, version: 1 },
            true
        )
    );

    check(
        "ApiKey has a unique keyHash index",
        hasIndex(ApiKey, { keyHash: 1 }, true)
    );

    check(
        "Session has a unique tokenHash index",
        hasIndex(Session, { tokenHash: 1 }, true)
    );

    check(
        "OrganizationSettings has a unique tenantId index",
        hasIndex(OrganizationSettings, { tenantId: 1 }, true)
    );

    check(
        "UserSettings has a unique userId index",
        hasIndex(UserSettings, { userId: 1 }, true)
    );

    check(
        "Quota has a unique tenantId index",
        hasIndex(Quota, { tenantId: 1 }, true)
    );

    check(
        "Workflow has a tenantId/status/createdAt index",
        hasIndex(Workflow, {
            tenantId: 1,
            status: 1,
            createdAt: -1
        })
    );

    check(
        "Execution has a tenantId/workflowId/status/createdAt index",
        hasIndex(Execution, {
            tenantId: 1,
            workflowId: 1,
            status: 1,
            createdAt: -1
        })
    );

    check(
        "NodeExecution has a tenantId/executionId/nodeId index",
        hasIndex(NodeExecution, {
            tenantId: 1,
            executionId: 1,
            nodeId: 1
        })
    );

    check(
        "ExecutionLog has a tenantId/executionId/timestamp index",
        hasIndex(ExecutionLog, {
            tenantId: 1,
            executionId: 1,
            timestamp: -1
        })
    );

    check(
        "Worker has a tenantId/status/lastHeartbeatAt index",
        hasIndex(Worker, {
            tenantId: 1,
            status: 1,
            lastHeartbeatAt: -1
        })
    );

    check(
        "Alert has a tenantId/status/severity/createdAt index",
        hasIndex(Alert, {
            tenantId: 1,
            status: 1,
            severity: 1,
            createdAt: -1
        })
    );

    check(
        "Notification has a tenantId/userId/read/createdAt index",
        hasIndex(Notification, {
            tenantId: 1,
            userId: 1,
            read: 1,
            createdAt: -1
        })
    );

    // 6. Final summary.
    console.log("\n===== TEST SUMMARY =====");
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total:  ${passed + failed}`);

    if (failed > 0) {
        console.error("\nSome tests failed. Review the messages above.");
        process.exitCode = 1;
    } else {
        console.log("\nAll model tests passed!");
    }
}

testModels().catch(error => {
    console.error("Test execution error:", error);
    process.exitCode = 1;
});