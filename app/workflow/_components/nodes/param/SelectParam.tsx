"use client"; // only if you're in Next.js

import { useId } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/appNode";


type OptionType = {
  label: string; value: string
}
export default function SelectParam({ param, updateNodeParamsValue,value }: ParamProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-400 px-1">*</span>}
      </Label>

      <Select onValueChange={(value) => updateNodeParamsValue?.(value)} defaultValue={value} >
        <SelectTrigger id={id} className="w-full bg-white">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            {(param.options ?? []).map((opt: OptionType) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>

  );
}