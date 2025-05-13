import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { TaskType } from '@/types/task'
import { CoinsIcon, GripVerticalIcon } from 'lucide-react'
import React from 'react'

const NodeHeader = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType]
  return (
    <div className='flex items-center gap-2 p-2' >
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">{task.label}</p>
      </div>
      <div className="flex gap-1 items-center">
        {task.isEntryPoint && (
          <Badge className="flex items-center text-xs px-2 py-1 h-6">Entry point</Badge>
        )}

        <Badge className="flex items-center text-xs px-2 py-1 h-6">
          <CoinsIcon size={12} className="mr-1" />
          23
        </Badge>

        <Button variant={"ghost"} className='drag-handle cursor-grab' ><GripVerticalIcon size={20} /></Button>
      </div>
    </div>
  )
}

export default NodeHeader