import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position } from '@xyflow/react'
import React, { ReactNode } from 'react'
import NodeParamsField from './NodeParamsField'

const NodeInputs = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col divide-y gap-2' >{children}</div>
  )
}

export default NodeInputs

export function NodeInput({ input ,nodeId}: { input: TaskParam,nodeId:string }) {
  return (
    <div className='flex justify-start bg-secondary relative p-3  w-full' >
      {/* <input.icon size={16} /> */}
      <NodeParamsField nodeId={nodeId} param={input}/>
      {!input.hideHandle && (
        <Handle id={input.name} type="target" position={Position.Left} className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4")} />
      )}


    </div>
  )

}