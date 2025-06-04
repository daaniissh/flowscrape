import React, { Suspense } from "react";
import Topbar from "../../_components/topbar/TopBar";
import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecution";
import { InboxIcon, Loader2Icon } from "lucide-react";
import { waitFor } from "@/lib/helper/waitFor";
import ExecutionsTable from "./_components/ExecutionTable";
export default function ExecutionsPage({
  params,
}: {
  params: { workflowId: string };
}) {
  return (
    <div className="h-full w-full overflow-auto">
      <Topbar
        workflowId={params.workflowId}
        hideButton
        title="All runs"
        subtitle="List of all your workflow runs"
      />
      <Suspense
        fallback={
          <div className="flex-center h-full">
            <Loader2Icon size={20} className="animate-spin stroke-primary" />
          </div>
        }
      >
        <ExecutionTableWrapper workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
}

async function ExecutionTableWrapper({ workflowId }: { workflowId: string }) {
  const executions = await GetWorkflowExecutions(workflowId);
  if (!executions) {
    return <div>no data</div>;
  }
  if (executions.length === 0) {
    return (
      <div className="container w-full py-6 flex-center">
        <div className="flex-center flex-col gap-2">
          <div className="">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex-center flex-col">
            <p className="font-bold">
              No runs have triggered yet this workflow
            </p>
            <p className="text-sm text-muted-foreground">
              You can trigger new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container py-6 px-8 w-full">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  );
}
