"use server";

import prisma from "@/lib/prisma";
import { WorkFlowStatus } from "@/types/workFlow";
import { auth } from "@clerk/nextjs/server";

export async function UpdateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthorized");
  }
  const workFlow = await prisma.workFlow.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!workFlow) {
    throw new Error("workflow not found");
  }
  if (workFlow.status !== WorkFlowStatus.DRAFT)
    throw new Error("workflow is not in draft status, cannot update");

  await prisma.workFlow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  });
}
