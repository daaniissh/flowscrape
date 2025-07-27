import prisma from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/ExecuteWorkflow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  WorkflowExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workFlow";
import { timingSafeEqual } from "crypto";
import parsers from "cron-parser";
function isValidSecret(secret: string): boolean {
  const API_SECRET = process.env.API_SECRET;
  if (!API_SECRET) {
    return false;
  }
  try {
    return timingSafeEqual(Buffer.from(secret), Buffer.from(API_SECRET));
  } catch (error) {
    return false;
  }
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  const secret = authHeader.split(" ")[1];
  if (!isValidSecret(secret)) {
    return new Response("Invalid secret", { status: 403 });
  }
  const { searchParams } = new URL(req.url);
  const workflowId = searchParams.get("workflowId") as string;

  if (!workflowId) {
    return new Response("bad req", { status: 400 });
  }

  const workflow = await prisma.workFlow.findUnique({
    where: { id: workflowId },
  });
  if (!workflow) {
    return new Response("Workflow not found", { status: 404 });
  }
  const executionPlan = JSON.parse(
    workflow.executionPlan!,
  ) as WorkflowExecutionPlan;
  if (!executionPlan) {
    return new Response("Execution plan not found", { status: 404 });
  }
  try {
    const cron = parsers.parse(workflow.cron!);
    const nextRun = cron.next().toDate();
    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId,
        userId: workflow.userId,
        definition: workflow.definition,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        trigger: WorkflowExecutionTrigger.CRON,
        phases: {
          create: executionPlan.flatMap((phase) => {
            return phase.nodes.flatMap((node) => {
              return {
                userId: workflow.userId,
                status: WorkflowExecutionPhaseStatus.COMPLETED,
                number: phase.phase,
                node: JSON.stringify(node),
                name: TaskRegistry[node.data.type].label,
              };
            });
          }),
        },
      },
    });
    await ExecuteWorkflow(execution.id, nextRun);
    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
