"use client"
import { GetWorkflowExecutionPhases } from '@/actions/workflows/GetWorkflowExecutionPhases'
import { WorkflowExecutionStatus } from '@/types/workFlow'
import { useQuery } from '@tanstack/react-query'
import { Calendar1Icon, CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Loader2Icon, LucideIcon, WorkflowIcon } from 'lucide-react'
import { formatDistanceToNow } from "date-fns"
import React, { ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DatesToDurationString } from '@/lib/helper/dates'
type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionPhases>>
const ExecutionViewer = ({ initialData }: { initialData: ExecutionData }) => {
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionPhases(initialData!.id),
    refetchInterval: (q) => q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  })
  const duration = DatesToDurationString(query.data?.completedAt, query.data?.startedAt)
  
  return (
    <div className='flex w-full h-full' >
      <aside className='w-[400px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden' >

        <div className="py-4 px-2">
          <ExecutionLabel icon={CircleDashedIcon} label="Status" value={query.data?.status} />
          <ExecutionLabel icon={CalendarIcon} label="Started At" value={
            <span className='!lowercase' >{query?.data?.startedAt ? formatDistanceToNow(new Date(query.data?.startedAt), {
              addSuffix: true
            })

              : "-"}</span>
          } />
          <ExecutionLabel icon={ClockIcon} label="Duration" value={duration ? duration : <Loader2Icon size={20} className='animate-spin' />} />
          <ExecutionLabel icon={CoinsIcon} label="Credit consumed" value={"todo"} />
          <Separator />
          <div className="flex-center py-2 px-4">
            <div className="text-muted-foreground flex items-center gap-2">

              <WorkflowIcon size={20} className='stroke-muted-foreground/80' />
              <span className="font-semibold">Phases</span>
            </div>
          </div>

        </div>
        <Separator />
        <div className="overflow-auto h-full px-2 py-4">
          {query.data?.phases.map((phase, index) => (
            <Button key={phase.id} className='w-full justify-between' variant={"ghost"}>
              <Badge variant={"outline"}>{index + 1}</Badge>
              <div className='flex items-center gap-2' >
                <p className='font-semibold' >{phase.name}</p>
              </div>
            </Button>
          ))}
        </div>
      </aside>
    </div>
  )
}
function ExecutionLabel({ icon, label, value }: { icon: LucideIcon, label: ReactNode, value: ReactNode }) {
  const Icon = icon
  return <div className="flex justify-between items-center py-2 px-4 text-sm">
    <div className="text-muted-foreground flex items-center gap-2">
      <Icon size={20} className='stroke-muted-foreground/80' />
      <span>{label}</span>
    </div>
    <div className="font-semibold capitalize flex gap-2 items-center">
      {value}
    </div>
  </div>
}

export default ExecutionViewer