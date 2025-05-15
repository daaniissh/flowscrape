"use client"
import { Button } from '@/components/ui/button'
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from '@xyflow/react'
import { X, XIcon } from 'lucide-react'
import React from 'react'


const DeletableEdge = (props: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props)
  const { setEdges } = useReactFlow()
  return (
    <>
      <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style} />
      <EdgeLabelRenderer>
        <div style={{
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          pointerEvents: "all"
        }}>
          <Button variant="outline" onClick={() => setEdges((edges) => edges.filter((edge) => edge.id !== props.id))} size={"icon"} className='w-5 h-5 border flex-center cursor-pointer rounded-full text-xs leading-none hover:shadow-lg' >
            <XIcon className="size-3" />

          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export default DeletableEdge