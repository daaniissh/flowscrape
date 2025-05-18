import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position, useEdges } from '@xyflow/react'
import React, { ReactNode } from 'react'
import NodeParamsField from './NodeParamsField'
import { ColorForHandle } from '../common'
import useFlowValidation from '@/components/hooks/useFlowValidation'

const NodeInputs = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col divide-y gap-2' >{children}</div>
  )
}

export default NodeInputs

export function NodeInput({ input, nodeId }: { input: TaskParam, nodeId: string }) {
  const { invalidInputs } = useFlowValidation()
  const hasErrors = invalidInputs.find(node => node.nodeId === nodeId)?.inputs.find(invalidInput => invalidInput === input.name)


  const edges = useEdges()
  const isConnected = edges.some(edge => edge.target === nodeId && edge.targetHandle === input.name)
  return (
    <div className={cn('flex justify-start bg-secondary relative p-3  w-full',
      hasErrors && "bg-destructive/30",
    )} >
      {/* <input.icon size={16} /> */}
      <NodeParamsField nodeId={nodeId} param={input} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle id={input.name} isConnectable={!isConnected} type="target" position={Position.Left} className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4", ColorForHandle[input.type])} />
      )}


    </div>
  )

}