import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workFlow";
import {  SendIcon } from "lucide-react";

export const DeleteViaWebHook = {
  type: TaskType.DELETE_VIA_WEBHOOK,
  label: "Delete Via Webhook",
  icon: (props) => (
    <SendIcon className="stroke-blue-400 " {...props} />
  ),
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Target URL",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Body",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [

  ] as const,
} satisfies WorkflowTask;
