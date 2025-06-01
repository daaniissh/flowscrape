import React from "react";
import {
  CircleDashedIcon,
  Loader2Icon,
  CircleXIcon,
  CircleCheckIcon,
} from "lucide-react";
import { WorkflowExecutionPhaseStatus } from "@/types/workFlow";
// import { WorkflowExecutionPhaseStatus } from "@/types/workflow";

type Props = {
  status: WorkflowExecutionPhaseStatus;
};

export default function PhaseStatusBadge({ status }: Props) {
  let icon;

  switch (status) {
    case WorkflowExecutionPhaseStatus.PENDING:
      icon = <CircleDashedIcon size={20} className="stroke-muted-foreground" />;
      break;
    case WorkflowExecutionPhaseStatus.RUNNING:
      icon = (
        <Loader2Icon size={20} className="animate-spin stroke-yellow-500" />
      );
      break;
    case WorkflowExecutionPhaseStatus.FAILED:
      icon = <CircleXIcon size={20} className="stroke-destructive" />;
      break;
    case WorkflowExecutionPhaseStatus.COMPLETED:
      icon = <CircleCheckIcon size={20} className="stroke-green-500" />;
      break;
    default:
      icon = <div className="rounded-full">{status}</div>;
  }

  return <div>{icon}</div>;
}
