"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DeleteWorkflow(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("unauthorized");
  await prisma.workFlow.delete({
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/workflows");
}
