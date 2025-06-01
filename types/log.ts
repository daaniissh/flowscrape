export const logLevels = ["info", "error"] as const;
export type logLevel = (typeof logLevels)[number];
export type Log = {
  message: string;
  level: logLevel;
  timestamp: Date;
};

export type LogFunction = (message: string) => void;
export type LogCollector = {
  getAll(): Log[];
} & {
  [K in logLevel]: LogFunction;
};
