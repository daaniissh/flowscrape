"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ParamProps } from '@/types/appNode'
import React, { useId } from 'react'

const StringParam = ({ param }: ParamProps) => {
  const id = useId()
  return (
    <div className='space-y-1 p-1 w-full' >
      <Label htmlFor={id} className='text-xs flex font-bold capitalize' >
        {param.name}
        {param.required && (
          <p className="text-red-400">*</p>
        )}
      </Label>
      <Input id={id} className='bg-white' />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  )
}

export default StringParam