"use client";
import { UpdateWorkflowCron } from "@/actions/workflows/updateWorkflowCron";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  CalendarIcon,
  ClockIcon,
  Delete,
  TriangleAlertIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import { useRouter } from "next/navigation";
import parser from "cron-parser";
import { removeWorkflowSchedule } from "@/actions/workflows/removeWorkflowSchedule";
import TooltipWrapper from "@/components/TooltipWrapper";

const SchedularDialog = (props: {
  workflowId: string;
  cron: string | null;
}) => {
  const [cron, setCron] = useState(props.cron || "");
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");
  const route = useRouter();
  const mutation = useMutation({
    mutationFn: UpdateWorkflowCron,
    onSuccess: () => {
      toast.success("Schedule updated successfully", { id: "cron" });
      route.push("/workflows");
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cron" });
    },
  });
  const removeSchedularMutation = useMutation({
    mutationFn: removeWorkflowSchedule,
    onSuccess: () => {
      toast.success("Schedule removed successfully", { id: "cron" });
      route.push("/workflows");
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cron" });
    },
  });
  useEffect(() => {
    try {
      parser.parse(cron);
      const humanCronString = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanCronString);
    } catch (error) {
      setValidCron(false);
      console.log(error);
    }
  }, [cron]);
  const workflowHasValidCron = props.cron && props.cron.length > 0;
  const readableSavedCron = workflowHasValidCron
    ? cronstrue.toString(props.cron!)
    : "";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "text-sm p-0 h-auto text-orange-500",
            workflowHasValidCron && "text-primary",
          )}
          variant={"link"}
          size={"sm"}
        >
          {validCron && (
            <div className="flex items-center gap-2 ">
              <ClockIcon />
              {readableSavedCron}
            </div>
          )}
          {!workflowHasValidCron && (
            <div className="flex items-center  cursor-pointer">
              <TriangleAlertIcon className="h-3 w-3 mr-1" />
              Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
        />
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm">
            Specify a cron expression to schedule periodic workflow execution.
            All time are in UTC
          </p>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="E.g. * * * * *"
              className="w-full"
              value={cron}
              onChange={(e) => setCron(e.target.value)}
            />
            {workflowHasValidCron && (
              <DialogClose asChild>
                <TooltipWrapper content={"Remove current schedule"}>
                  <Button
                    disabled={
                      mutation.isPending || removeSchedularMutation.isPending
                    }
                    onClick={() => {
                      toast.loading("Removing schedule...", { id: "cron" });
                      removeSchedularMutation.mutate(props.workflowId);
                    }}
                    variant={"outline"}
                    size={"icon"}
                    className="text-destructive font-bold hover:text-destructive/80"
                  >
                    <Delete strokeWidth={2} size={20} />
                  </Button>
                </TooltipWrapper>
              </DialogClose>
            )}
          </div>
          <div
            className={cn(
              "bg-accent rounded-md p-4 border text-sm",
              validCron
                ? "border-primary text-primary"
                : "border-destructive text-destructive",
            )}
          >
            {validCron ? readableCron : "Not valid cron expression"}
          </div>
        </div>
        <DialogFooter className="px-6 flex gap-2">
          <DialogClose asChild className="flex-1">
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild className="flex-1">
            <Button
              disabled={mutation.isPending || !validCron}
              onClick={() => {
                toast.loading("Saving schedule...", { id: "cron" });
                mutation.mutate({
                  id: props.workflowId,
                  cron,
                });
              }}
              className="w-full"
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchedularDialog;
