"use server";

import prisma from "@/lib/prisma";
import {
  duplicateWorkflowSchema,
  duplicateWorkflowSchemaType,
} from "@/schema/workflows";
import { WorkFlowStatus } from "@/types/workFlow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DuplicateWorkflow(form: duplicateWorkflowSchemaType) {
  const { success, data } = duplicateWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid data");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("un authorized");
  }
  const sourceWorkflowId = await prisma.workFlow.findUnique({
    where: { id: data.workflowId, userId },
  });

  if (!sourceWorkflowId) {
    throw new Error(
      "Workflow not found or you do not have permission to access it"
    );
  }
  const result = await prisma.workFlow.create({
    data: {
      name: data.name,
      description: data.description,
      userId,
      status: WorkFlowStatus.DRAFT,
      definition: sourceWorkflowId.definition,

    },
  });

  if(!result) throw new Error("Failed to duplicate workflow");
  revalidatePath("/workflows");
}
