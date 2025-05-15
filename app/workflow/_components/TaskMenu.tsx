"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { TaskType } from '@/types/task'
import React from 'react'

const TaskMenu = () => {
  return (
    <aside className='w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto' >
      <Accordion type='multiple' className='w-full' defaultValue={['extraction']}>
        <AccordionItem value='extraction'>
          <AccordionTrigger className='font-bold'>
            Data extraction
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-1 '>
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const onDragStart = (e: React.DragEvent<HTMLButtonElement>, taskType: TaskType) => {
    e.dataTransfer.setData('application/reactflow', taskType)
    e.dataTransfer.effectAllowed = 'move'
  }
  const task = TaskRegistry[taskType]
  return (
    <Button draggable onDragStart={(e) => onDragStart(e, taskType)} variant={"secondary"} className='flex justify-between items-center gap-2 border w-full'>
      <div className="flex items-center gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  )

}

export default TaskMenu