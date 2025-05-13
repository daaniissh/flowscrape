import { WorkFlow } from '@/lib/generated/prisma'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from './FlowEditor';
import TopBar from './topbar/TopBar';
const Editor = ({workflow}:{workflow:WorkFlow}) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <TopBar workflowId={workflow.id} title="Workflow editor" subtitle={workflow.name} />
        <section className='flex h-full overflow-auto' >
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  )
}

export default Editor