"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkFlowsForUser() {
  const { userId } = await auth();
  console.log("userId:", userId);

  if (!userId) {
    throw new Error("unauthorized");
  }

  return await prisma.workFlow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
