"use server";

import prisma from "@/lib/prisma";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflows";
import { WorkFlowStatus } from "@/types/workFlow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("invalid form data");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthorized");
  }
  const result = await prisma.workFlow.create({
    data: {
      userId,
      status: WorkFlowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });
  if(!result){
    throw new Error("failed to create new workflow")
  }

  redirect(`/workflow/editor/${result.id}`)
}
