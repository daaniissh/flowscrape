-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkflowExecution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workflowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "creditsCost" INTEGER DEFAULT 0,
    "definition" TEXT NOT NULL DEFAULT '{}',
    CONSTRAINT "WorkflowExecution_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "WorkFlow" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WorkflowExecution" ("completedAt", "createdAt", "creditsCost", "id", "startedAt", "status", "trigger", "userId", "workflowId") SELECT "completedAt", "createdAt", "creditsCost", "id", "startedAt", "status", "trigger", "userId", "workflowId" FROM "WorkflowExecution";
DROP TABLE "WorkflowExecution";
ALTER TABLE "new_WorkflowExecution" RENAME TO "WorkflowExecution";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
