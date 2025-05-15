import { LucideProps } from "lucide-react";
import { TaskType } from "./task";

export enum WorkFlowStatus{
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED"
}
export type WorkflowTask = {
  label: string;
  icon:React.FC<LucideProps>
  type:TaskType
}