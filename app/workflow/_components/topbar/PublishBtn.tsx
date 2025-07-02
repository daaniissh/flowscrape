"use client";

import { PublishWorkflow } from "@/actions/workflows/publishWorkflows";

import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PublishBtn = ({ workflowId }: { workflowId: string }) => {
  const router = useRouter();
  const { toObject } = useReactFlow();
  const generate = useExecutionPlan();
  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: (workflowId) => {
      toast.success("Workflow Published", { id: workflowId });
      router.push(`/workflow/editor/${workflowId}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error("something went wrong", { id: workflowId });
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
        toast.loading("Publishing workflow...", { id: workflowId });

        mutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  );
};

export default PublishBtn;
