import { Browser, Page } from "puppeteer";
import { WorkflowTask } from "./workFlow";
import { LogCollector } from "./log";

export type Environment = {
  browser?: Browser;
  page?: Page;
  // Phases with phaseId as key
  phases: Record<
    string, // key: phaseId
    {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    }
  >;
};

export type ExecutionEnvironment<T extends WorkflowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;
  setOutput(name: T["outputs"][number]["name"], value: string): void;
  getBrowser(): Browser | undefined;
  setBrowser(browser: Browser): void;
  getPage(): Page | undefined;
  setPage(page: Page): void;
  log: LogCollector;
};
