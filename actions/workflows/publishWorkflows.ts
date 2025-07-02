"use server";

import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/ExecutionPlan";
import { CalculateWorkflowCost } from "@/lib/workflow/helper";
import { WorkFlowStatus } from "@/types/workFlow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function PublishWorkflow({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition: string;
}) {
  const { userId } = await auth();
  console.log("userId:", userId);

  if (!userId) {
    throw new Error("unauthorized");
  }
  const workflow = await prisma.workFlow.findUnique({
    where: { id, userId },
  });
  if (!workflow) {
    throw new Error("workflow not found");
  }
  if (workflow.status !== WorkFlowStatus.DRAFT) {
    throw new Error("workflow not draft");
  }
  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("flowDefinition is invalid: ");
  }
  if (result.error) {
    throw new Error("flow definition not valid");
  }
  if (!result.executionPlan) {
    throw new Error("no execution plan");
  }
  const creditsCost = CalculateWorkflowCost(flow.nodes);
  await prisma.workFlow.update({
    where: {
      id,
      userId,
    },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkFlowStatus.PUBLISHED,
    },
  });
  return id;
}
