// app/workflow/editor/[workflowId]/page.tsx

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import Editor from '../../_components/Editor';
import React from 'react';

const Page = async (props: { params: { workflowId: string } }) => {
  const { params } = props; // <-- Don't destructure before
  const { workflowId } = params;
  const { userId } = await auth();

  if (!userId) return <div>unauthenticated</div>;

  const workflow = await prisma.workFlow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) return <div>Workflow not found</div>;

  return <Editor workflow={workflow} />;
};

export default Page;
