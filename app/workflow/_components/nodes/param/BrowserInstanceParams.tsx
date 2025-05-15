"use client"
import { ParamProps } from '@/types/appNode'
import React from 'react'

const BrowserInstanceParams = ({ param, updateNodeParamsValue,value }: ParamProps) => {
  return (
    <p className='text-xs'>{param.name}</p>
  )
}

export default BrowserInstanceParams