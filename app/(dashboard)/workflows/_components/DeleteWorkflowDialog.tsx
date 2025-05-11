import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'sonner';
interface Props {
  open: boolean,
  setOpen: (open: boolean) => void
  workflowName: string;
  workflowId: string
}
const DeleteWorkflowDialog = ({ open, setOpen, workflowName, workflowId }: Props) => {
  const [confirmText, setConfirmText] = useState("");
  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", { id: workflowId })
      setConfirmText("")
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId })
    }

  })
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, you will not be able to recover it.
            <Separator className='mt-5' />
            <div className="flex flex-col py-4 gap-2">
              <p>
                If you are sure, enter <b>{workflowName}</b> to confirm:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>  setConfirmText("")} >Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={confirmText !== workflowName || deleteMutation.isPending} onClick={() => {
            toast.loading("Deleting workflow...", { id: workflowId })
            deleteMutation.mutate(workflowId)
          }} className='bg-destructive text-white hover:bg-destructive/90' >Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteWorkflowDialog