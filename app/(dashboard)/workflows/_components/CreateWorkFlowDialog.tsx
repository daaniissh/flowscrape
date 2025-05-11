"use client"
import CustomDialogHeader from '@/components/CustomDialogHeader'
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Layers2, Loader2 } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { z } from "zod"

import { createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflows'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { CreateWorkflow } from '@/actions/workflows/createWorkflow'
import { toast } from 'sonner'
const CreateWorkFlowDialog = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState<boolean>()
  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {}
  })
  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success("Workflow created", { id: "create-workflow" })
    },
    onError: () => {
      toast.error("Failed to create workflow", { id: "create-workflow" })
    }
  })
  const onSubmit = useCallback((values: createWorkflowSchemaType) => {
    toast.loading("Create workFlow...", { id: "create-workflow" });
    mutate(values)
  }, [mutate])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <Button>{triggerText ?? "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <CustomDialogHeader icon={Layers2} title="Create Workflow" subTitle="Start building your workflow" />
        <div className="px-6 ">
          <Form {...form}>
            <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className='resize-none' {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does.
                      <br />
                      This is optional but can help you remember the workflow&apos;s purpose.
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type='submit' className='w-full' >{!isPending ? "Proceed" : <Loader2 className='animate-spin'/>}</Button>
            </form>

          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkFlowDialog