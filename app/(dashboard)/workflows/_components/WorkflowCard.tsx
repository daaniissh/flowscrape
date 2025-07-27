"use client";
import { TooltipWrapper } from "@/components/TooltipWrapper";
// import  from '@/components/TooltipWrapper'
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { WorkFlow } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import {
  WorkflowExecutionStatus,
  WorkFlowStatus,
  WorkflowTask,
} from "@/types/workFlow";

import {
  ChevronRightIcon,
  ClockIcon,
  CoinsIcon,
  CornerDownRightIcon,
  FileTextIcon,
  MoreVerticalIcon,
  MoveRightIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";
import RunBtn from "./RunBtn";
import { formatInTimeZone } from "date-fns-tz"
import SchedularDialog from "./SchedularDialog";
import { Badge } from "@/components/ui/badge";
import ExecutionStatusIndicator, { ExecutionStatusLabel } from "@/app/workflow/runs/[workflowId]/_components/ExecutionStatusIndicator";
import DuplicateWorkFlowDialog from "./DuplicateWorkflowDialog";
const statusColors = {
  [WorkFlowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkFlowStatus.PUBLISHED]: "bg-primary",
};

const WorkflowCard = ({ workflow }: { workflow: WorkFlow }) => {
  const isDraft = workflow.status === WorkFlowStatus.DRAFT;
  return (
    <Card className="border group/card border-separate  py-0  shadow-sm rounded-lg overflow-hidden hover:shadow-xs dark:shadow-primary/20">
      <CardContent className=" flex items-center justify-between p-4 ">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center  justify-center",
              statusColors[workflow.status as WorkFlowStatus],
            )}
          >
            {isDraft ? (
              <FileTextIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5 text-white" />
            )}
          </div>
          <div className="">
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <TooltipWrapper content={workflow.description}>
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className="flex items-center hover:underline"
              >
                {workflow.name}
              </Link></TooltipWrapper>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
               <DuplicateWorkFlowDialog workflowId={workflow.id} />
            </h3>
            <ScheduleSection
              cron={workflow.cron}
              isDraft={isDraft}
              workflowId={workflow.id}
              creditCost={workflow.creditsCost}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isDraft && <RunBtn workflowId={workflow.id} />}
         
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2",
            )}
          >
            <ShuffleIcon size={16} /> Edit
          </Link>

          <WorkflowActions
            workflowName={workflow.name}
            workflowId={workflow.id}
          />
        </div>
      </CardContent>

      {/* Other content here (top content) */}


      <LastRunDetails workflow={workflow} />
    </Card>
  );
};

function WorkflowActions({
  workflowName,
  workflowId,
}: {
  workflowName: string;
  workflowId: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DeleteWorkflowDialog
        workflowId={workflowId}
        workflowName={workflowName}
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <TooltipWrapper content={"More actions"}>
              <div className="flex-center w-full h-full ">
                {" "}
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive  flex items-center gap-2"
            onSelect={() => setShowDeleteDialog((prev) => !prev)}
          >
            <TrashIcon size={16} className="text-destructive" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function ScheduleSection({
  isDraft,
  creditCost,
  workflowId,
  cron,
}: {
  workflowId: string;
  isDraft: boolean;
  creditCost: number;
  cron: string | null;
}) {
  if (isDraft) return null;
  return (
    <div className="flex items-center gap-2">
      <CornerDownRightIcon className="h-4 w-4 text-muted-foreground" />
      <SchedularDialog
        workflowId={workflowId}
        cron={cron}
        key={`${cron}-${workflowId}`}
      />
      <MoveRightIcon className="h-4 w-4 text-muted-foreground" />
      <TooltipWrapper content="Credits consumption for full run">
        <div className="flex items-center gap-3">
          <Badge
            variant={"outline"}
            className="space-x-1 text-muted-foreground rounded-sm"
          >
            <CoinsIcon className="h-4 w-4" />
            <span className="text-sm">{creditCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
}
function LastRunDetails({ workflow }: { workflow: WorkFlow }) {
  const isDraft = workflow.status === WorkFlowStatus.DRAFT;
  if (isDraft) return null;
  const { lastRunAt, lastRunStatus, lastRunId, nextRunAt } = workflow;
  const formattedStartedAt =
    lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });
  const nextSchedule = nextRunAt && format(nextRunAt, "yyyy-MM-dd HH:mm")
  const nextScheduleUTC = nextRunAt && formatInTimeZone(nextRunAt, 'UTC', "HH:mm")
  return (
    <div className="bg-primary/5 px-4 py-1 flex  text-muted-foreground">
      <div className="flex items-center text-sm gap-2 ">
        {lastRunAt && (
          <Link
            href={`/workflow/runs/${workflow.id}/${lastRunId}`}
            className="flex items-center justify-center h-full  text-sm gap-2 group"
          >
            <span>Last run: </span>
            <ExecutionStatusIndicator

              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <ExecutionStatusLabel

              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <span>{formattedStartedAt}</span>
            <ChevronRightIcon
              size={14}
              className="-translate-x-[2px] mt-1 group-hover:text-foreground group-hover:translate-x-0 transition"
            />
          </Link>
        )}
        {!lastRunAt && (
          <span className="text-muted-foreground">No runs yet</span>
        )}
      </div>
      {nextRunAt && (
        <div className="flex   items-center text-sm gap-2 ml-auto">
          <ClockIcon size={12} />
          <span>Next run at:</span>
          <span>{nextSchedule}</span>
          <span className="text-xs">({nextScheduleUTC} UTC)</span>
        </div>
      )}
    </div>
  );
}
export default WorkflowCard;

