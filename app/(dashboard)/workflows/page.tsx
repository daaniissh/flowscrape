import { GetWorkFlowsForUser } from '@/actions/workflows/getWorkFlowsUser'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import React, { Suspense } from 'react'
import { AlertCircle, InboxIcon } from 'lucide-react'
import CreateWorkFlowDialog from './_components/CreateWorkFlowDialog'
import WorkflowCard from './_components/WorkflowCard'

const page = () => {
  return (
    <div className='flex-1 flex flex-col h-full' >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className='text-3xl font-bold ' >WorkFlows</h1>
          <p className="text-muted-foreground">Manage Workflows</p>
        </div>
        <CreateWorkFlowDialog />
      </div>
      <div className="h-full py-6 ">
        <Suspense fallback={<UserWorkFlowsSkelton />} >
          <UserWorkFlows />
        </Suspense>
      </div>
    </div>
  )
}

function UserWorkFlowsSkelton() {
  return <div className="space-y-2">
    {
      Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="border  items-center w-full border-muted rounded-lg overflow-hidden h-[72px] bg-muted/20">
          <div className="flex items-center justify-between py-4 px-3">
            <div className="flex justify-center items-center space-x-3">
              {/* Status circle skeleton - different color */}
              <Skeleton className="w-10 h-10 rounded-full bg-primary/10" />

              {/* Text content skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-[160px] bg-muted-foreground/10" />
                {/* Draft badge skeleton - accent color */}
                <Skeleton className="h-3 w-[40px] rounded-full bg-yellow-500/10" />
              </div>
            </div>

            {/* Action buttons skeleton - different intensities */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-[80px] rounded-md bg-muted-foreground/5" />
              <Skeleton className="h-8 w-8 rounded-md bg-muted-foreground/10" />
            </div>
          </div>
        </Skeleton>
      ))

    }
  </div>
}

async function UserWorkFlows() {
  const workFlows = await GetWorkFlowsForUser()
  if (!workFlows) {
    return (
      <Alert variant={"destructive"} >
        <AlertCircle className='w-4 h-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong,Please try again later</AlertDescription>
      </Alert>)
  }
  if (workFlows.length === 0) {
    return (<div className='flex-center flex-col gap-4 h-full ' >
      <div className="rounded-full bg-accent w-20 h-20 flex-center">
        <InboxIcon className="stroke-primary" size={40} />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <p className="font-bold">No work flow created yet</p>
        <p className="text-sm text-muted-foreground">
          Click the button  below to create your first workflow
        </p>
      </div>
      <CreateWorkFlowDialog triggerText='Create your first Workflow' />

    </div>)
  }
  return <div className='grid grid-cols-1 gap-4'>
    {workFlows.map((workflow, index) => (
      <WorkflowCard key={index} workflow={workflow} />
    ))}
  </div>
}
export default page