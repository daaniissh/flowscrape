"use client"
import { useReactFlow } from '@xyflow/react';
import { ZoomIn, ZoomOut, Home } from 'lucide-react';

export const CustomControls = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute top-4 left-4 space-y-2 p-2 bg-zinc-900 text-white rounded-md shadow">
      <button onClick={()=>zoomIn}><ZoomIn size={16} /></button>
      <button onClick={()=>zoomOut}><ZoomOut size={16} /></button>
      <button onClick={()=>fitView}><Home size={16} /></button>
    </div>
  );
};
