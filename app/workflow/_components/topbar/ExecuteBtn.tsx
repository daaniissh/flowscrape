"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const ExecuteBtn = ({ workflowId }: { workflowId: string }) => {
  const router = useRouter();
  const { toObject } = useReactFlow();
  const generate = useExecutionPlan();
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: ({ workflowId, executionId }) => {
      toast.success("Execution plan generated", { id: "flow-execution" });
      router.push(`/workflow/runs/${workflowId}/${executionId}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error("something went wrong", { id: "flow-execution" });
    },
  });
  return (
    <Button
      disabled={mutation.isPending}
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
        if (!plan) {
          return;
        }

        mutation.mutate({
          workflowId: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
