import { ExecutionPhase } from "../generated/prisma";

type Phase = Pick<ExecutionPhase, "creditsCost">;
export function GetPhasesTotalCoast(phases: Phase[]) {
  return phases.reduce((acc, phase) => acc + (phase.creditsCost || 0), 0);
}
