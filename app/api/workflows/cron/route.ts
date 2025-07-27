import { GetAppUrl } from "@/lib/helper/appUrl";
import prisma from "@/lib/prisma";
import { WorkFlowStatus } from "@/types/workFlow";

export async function GET(req: Request) {
  const now = new Date();
  const workflows = await prisma.workFlow.findMany({
    select: { id: true },
    where: {
      status: WorkFlowStatus.PUBLISHED,
      cron: { not: null },
      nextRunAt: { lte: now },
    },
  });
  console.log(workflows.length, "workflows to run");
  for (const workflow of workflows) {
    triggerWorkflow(workflow.id);
  }
  return Response.json({ workflowsToRun: workflows.length }, { status: 200 });
}

function triggerWorkflow(workflowId: string) {
  const triggerAPIUrl = GetAppUrl(
    `api/workflows/execute?workflowId=${workflowId}`,
  );
  console.log("triggering workflow:", triggerAPIUrl);

  fetch(triggerAPIUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET}`,
    },
    cache: "no-store",
  }).catch((error) => {
    console.error("Error triggering workflow:", error);
  });
}
