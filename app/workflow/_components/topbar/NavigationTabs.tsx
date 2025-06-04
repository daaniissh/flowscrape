"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { FileTextIcon, ListOrderedIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavigationTabs({ workflowId }: { workflowId: string }) {
  const pathname = usePathname();
  const activeValue = pathname?.split("/")[2]; // assumes `/workflow/{tab}/${workflowId}`

  return (
    <Tabs value={activeValue} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <Link href={`/workflow/editor/${workflowId}`}>
          <TabsTrigger
            value="editor"
            className="w-full flex gap-2 items-center justify-center"
          >
            <FileTextIcon className="w-4 h-4" />
            Editor
          </TabsTrigger>
        </Link>

        <Link href={`/workflow/runs/${workflowId}`}>
          <TabsTrigger
            value="runs"
            className="w-full flex gap-2 items-center justify-center"
          >
            <ListOrderedIcon className="w-4 h-4 text-primary" />
            Runs
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
