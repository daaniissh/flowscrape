"use server";

import prisma from "@/lib/prisma";
import { WorkFlowStatus } from "@/types/workFlow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
  const workflow = await prisma.workFlow.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!workflow) {
    throw new Error("workflow not found");
  }
  if (workflow.status !== WorkFlowStatus.DRAFT)
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
  revalidatePath("/workflows");
}
