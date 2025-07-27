import { ExecutionEnvironment } from "@/types/executor";

import { WaitForElement } from "../task/WaitForElement";

export async function WaitForElementExecutor(
  environment: ExecutionEnvironment<typeof WaitForElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input->selector not defined");
    }
    const visibility = environment.getInput("Visibility");
    if (!visibility) {
      environment.log.error("input->visibility not defined");
    }

    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });

    environment.log.info(`Element with selector "${selector}" is now ${visibility}.`)

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
