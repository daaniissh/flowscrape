"use client";

import { UnPublishWorkflow } from "@/actions/workflows/unpublish";


import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const UnpublishBtn = ({ workflowId }: { workflowId: string }) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: UnPublishWorkflow,
    onSuccess: (workflowId) => {
      toast.success("Workflow unpublished", { id: workflowId });
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

        toast.loading("UnPublishing workflow...", { id: workflowId });

        mutation.mutate(workflowId);
      }}
    >
      <DownloadIcon size={16} className="stroke-orange-400" />
      Un Publish
    </Button>
  );
};

export default UnpublishBtn;
