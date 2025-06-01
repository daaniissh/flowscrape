import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateFlowNode } from "@/lib/workflow/CreateNodeFlow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import React from "react";

const NodeHeader = ({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) => {
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={28} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
      </div>
      <div className="flex gap-1 items-center">
        {task.isEntryPoint && (
          <Badge className="flex items-center text-xs px-2 py-1 h-6">
            Entry point
          </Badge>
        )}

        <Badge className="flex items-center text-xs px-2 py-1 h-6">
          <CoinsIcon size={12} className="mr-1" />
          {task.credits}
        </Badge>
        {!task.isEntryPoint && (
          <>
            <Button
              onClick={() => {
                deleteElements({
                  nodes: [{ id: nodeId }],
                });
              }}
              variant={"ghost"}
              size={"icon"}
            >
              <TrashIcon size={12} />
            </Button>
            <Button
              onClick={() => {
                const node = getNode(nodeId) as AppNode;
                const newX = node.position.x;
                const newY =
                  node.position.y + (node.measured?.height ?? 0) + 20;

                const newNode = CreateFlowNode(node.data.type, {
                  x: newX,
                  y: newY,
                });
                addNodes([newNode]);
              }}
              variant={"ghost"}
              size={"icon"}
            >
              <CopyIcon size={12} />
            </Button>
          </>
        )}

        <Button variant={"ghost"} className="drag-handle cursor-grab">
          <GripVerticalIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

export default NodeHeader;
