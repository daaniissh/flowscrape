"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/appNode";
import React, { useEffect, useId, useState } from "react";

const StringParam = ({
  param,
  updateNodeParamsValue,
  value,
  disabled,
}: ParamProps) => {
  const id = useId();

  const [internalValue, setInternalValue] = useState(value);
  useEffect(() => {
    setInternalValue(value);
  }, [value]);
  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex font-bold capitalize">
        {param.name}
        {param.required && <p className="text-red-400">*</p>}
      </Label>
      <Component
        id={id}
        disabled={disabled}
        value={internalValue}
        onBlur={(e: any) => updateNodeParamsValue(e.target.value)}
        placeholder="Enter value here"
        onChange={(e: any) => setInternalValue(e.target.value)}
        className="bg-white text-xs"
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
