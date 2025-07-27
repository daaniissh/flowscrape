import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecuter";
import { PageToHtmlExecutor } from "./pageToHtmlExecutor";
import { ExecutionEnvironment } from "@/types/executor";
import { WorkflowTask } from "@/types/workFlow";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecuter";
import { FillInputExecutor } from "./FillInputexecutor";
import { ClickElementExecutor } from "./ClickElementExecutor";
import { WaitForElementExecutor } from "./WaitForElementExecutor";
import { DeleteViaWebhookExecutor } from "./DeleteViaWebhookExecutor";
type ExecutorFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;
type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};
export const ExecuteRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
  WAIT_FOR_ELEMENT: WaitForElementExecutor,
  DELETE_VIA_WEBHOOK: DeleteViaWebhookExecutor,
};
