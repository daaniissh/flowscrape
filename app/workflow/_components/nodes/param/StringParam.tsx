"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ParamProps } from '@/types/appNode'
import React, { useId, useState } from 'react'

const StringParam = ({ param, updateNodeParamsValue, value }: ParamProps) => {
  const id = useId()

  const [internalValue, setInternalValue] = useState(value)
  return (
    <div className='space-y-1 p-1 w-full' >
      <Label htmlFor={id} className='text-xs flex font-bold capitalize' >
        {param.name}
        {param.required && (
          <p className="text-red-400">*</p>
        )}
      </Label>
      <Input value={internalValue} onBlur={(e) => updateNodeParamsValue(e.target.value)} placeholder='Enter value here' onChange={(e) => setInternalValue(e.target.value)} id={id} className='bg-white text-xs' />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  )
}

export default StringParam