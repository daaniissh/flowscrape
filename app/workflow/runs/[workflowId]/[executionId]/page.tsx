import { GetWorkflowExecutionPhases } from "@/actions/workflows/getWorkflowExecutionPhases";
import Topbar from "@/app/workflow/_components/topbar/TopBar";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

type ExecutionPageProps = {
  params: { executionId: string; workflowId: string };
};

const ExecutionPageViewer = async ({ params }: ExecutionPageProps) => {
  const { executionId, workflowId } = await params;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        hideButton
        workflowId={workflowId}
        title="Workflow Run Details"
        subtitle={`Run ID: ${executionId}`}
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex-center w-full">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
};

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const workflowExecution = await GetWorkflowExecutionPhases(executionId);
  if (!workflowExecution) {
    return <div>Not Found</div>;
  }
  return <ExecutionViewer initialData={workflowExecution} />;
}

export default ExecutionPageViewer;
