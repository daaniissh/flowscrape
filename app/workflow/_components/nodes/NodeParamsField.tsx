"use client"
import { Input } from '@/components/ui/input'
import { TaskParam, TaskParamType } from '@/types/task'
import React, { useCallback } from 'react'
import StringParam from './param/StringParam'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/appNode'
import BrowserInstanceParams from './param/BrowserInstanceParams'

const NodeParamsField = ({ param, nodeId,disabled }: { param: TaskParam, nodeId: string ,disabled:boolean}) => {
  const { updateNodeData, getNode } = useReactFlow()
  const node = getNode(nodeId) as AppNode
  const value = node?.data.inputs?.[param.name]
  const updateNodeParamsValue = useCallback((newValue: string) => {
    updateNodeData(nodeId, {
      inputs: {
        ...node?.data.inputs,
        [param.name]: newValue
      }
    })
  }, [updateNodeData, nodeId, param.name, node?.data.inputs])
  switch (param.type) {
    case TaskParamType.STRING:
      return (<StringParam disabled={disabled} param={param} value={value} updateNodeParamsValue={updateNodeParamsValue} />);

    case TaskParamType.BROWSER_INSTANCE:
      return <BrowserInstanceParams param={param} value={""} updateNodeParamsValue={updateNodeParamsValue} />;
    default:
      return <div className="w-full">
        <p className="text-sx text-muted-foreground">Not implemented</p>
      </div>
  }
}

export default NodeParamsField