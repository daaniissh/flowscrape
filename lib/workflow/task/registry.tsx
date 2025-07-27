import { TaskType } from "@/types/task";
import { ExtractTextFromElement } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtml } from "./PageToHtml";
import { WorkflowTask } from "@/types/workFlow";
import { FillInputTask } from "./FillInput";
import {  ClickElementTask } from "./ClickElement";
import { WaitForElement } from "./WaitForElement";
import { DeleteViaWebHook } from "./DeleteViaWebhook";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtml,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT:ClickElementTask,
  WAIT_FOR_ELEMENT:WaitForElement,
  DELETE_VIA_WEBHOOK:DeleteViaWebHook
};
