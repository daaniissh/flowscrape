import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position, useEdges } from '@xyflow/react'
import React, { ReactNode } from 'react'
import NodeParamsField from './NodeParamsField'
import { ColorForHandle } from '../common'

const NodeInputs = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col divide-y gap-2' >{children}</div>
  )
}

export default NodeInputs

export function NodeInput({ input ,nodeId}: { input: TaskParam,nodeId:string }) {
  const edges = useEdges()
  const isConnected = edges.some(edge=>edge.target === nodeId && edge.targetHandle === input.name)
  return (
    <div className='flex justify-start bg-secondary relative p-3  w-full' >
      {/* <input.icon size={16} /> */}
      <NodeParamsField nodeId={nodeId} param={input} disabled={isConnected}/>
      {!input.hideHandle && (
        <Handle id={input.name} isConnectable={!isConnected} type="target" position={Position.Left} className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",ColorForHandle[input.type])} />
      )}


    </div>
  )

}