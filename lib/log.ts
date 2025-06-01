import {
  Log,
  LogCollector,
  LogFunction,
  logLevel,
  logLevels,
} from "@/types/log";

export function createLogCollector(): LogCollector {
  const logs: Log[] = [];
  const getAll = () => logs;
  const LogFunctions = {} as Record<logLevel, LogFunction>;
  logLevels.forEach((level) => {
    LogFunctions[level] = (message: string) => {
      logs.push({ message, level, timestamp: new Date() });
    };
  });
  return {
    getAll,
    ...LogFunctions,
  };
}
