import { NodeProps } from "@xyflow/react";
import { memo } from "react";

// Assuming NodeCard is missing import; add this:
import NodeCard from "./NodeCard"; // adjust path as needed
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs, { NodeInput } from "./NodeInputs";


const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type]
  return <NodeCard nodeId={props.id} isSelected={!!props.selected} >
    <NodeHeader taskType={nodeData.type} />
    <NodeInputs>
      {task.inputs.map(input=>(

      <NodeInput key={input.name} input={input}  />
      ))}
    </NodeInputs>
  </NodeCard>;
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
