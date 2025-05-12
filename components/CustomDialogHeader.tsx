"use client"
import React from 'react'
import { DialogHeader, DialogTitle } from './ui/dialog'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'

interface Props {
  title?: string,
  subTitle?: string,
  icon?: LucideIcon

  iconClassname?: string,
  titleClassname?: string,
  subTitleClassname?: string
}
const CustomDialogHeader = (props: Props) => {
  const { icon: Icon, title, iconClassname, subTitle, subTitleClassname, titleClassname } = props
  return (
    <DialogHeader className='py-6' >
      <DialogTitle asChild >
        <div className='flex flex-col gap-2 items-center mb-2'>
          {Icon && <Icon size={30} className={cn("stroke-primary", iconClassname)} />}
          {title && (
            <p className={cn("text-xl text-primary font-bold", titleClassname)}>{title}</p>
          )}
          {subTitle && (
            <p className={cn("text-sm text-muted-foreground", subTitleClassname)}>{subTitle}</p>
          )}
        </div>

      </DialogTitle>
      <Separator/>
    </DialogHeader>
  )
}

export default CustomDialogHeader