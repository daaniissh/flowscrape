"use server";

import prisma from "@/lib/prisma";
import { WorkFlowStatus } from "@/types/workFlow";
import { auth } from "@clerk/nextjs/server";

export async function UnPublishWorkflow(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const workflow = await prisma.workFlow.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!workflow) {
    throw new Error("Workflow not found");
  }
  if (workflow.status !== WorkFlowStatus.PUBLISHED) {
    throw new Error("not published");
  }
  await prisma.workFlow.update({
    where: {
      id,
      userId,
    },
    data: {
      status: WorkFlowStatus.DRAFT,
      executionPlan: null,
      creditsCost: 0,
    },
  });
  return id as string;
}
