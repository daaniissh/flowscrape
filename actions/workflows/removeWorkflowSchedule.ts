"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function removeWorkflowSchedule(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.workFlow.update({
    where: { id, userId },
    data: { cron: null, nextRunAt: null },
  });
}
