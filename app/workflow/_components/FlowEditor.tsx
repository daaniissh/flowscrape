"use client"
import { WorkFlow } from '@/lib/generated/prisma'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import React from 'react'
import '@xyflow/react/dist/style.css';
import { CreateFlowNode } from '@/lib/workflow/CreateNodeFlow';
import { TaskType } from '@/types/task';
import NodeComponent from './nodes/NodesComp';

const nodeType = {
  FlowScrapeNode:NodeComponent,

}
const snapGrid:[number, number] = [100, 100];
const fitViewOptions = {padding:2}

const FlowEditor = ({ workflow }: { workflow: WorkFlow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER)
  ])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  return (
    <main className='h-full w-full' >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeType}
        // snapToGrid={true}  snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
      
        fitView
      >
        <Controls position='top-left' fitViewOptions={fitViewOptions} className=' dark:!text-black ' />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}

export default FlowEditor