import { ExecutionEnvironment } from "@/types/executor";

import { DeleteViaWebHook } from "../task/DeleteViaWebhook";

export async function DeleteViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeleteViaWebHook>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target URL");
    if (!targetUrl) {
      environment.log.error("input->target not defined");
    }
    const body = environment.getInput("Body");
    console.log("body", body)
    if (!body) {
      environment.log.error("input->body not defined");
    }

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const statusCode = res.status;
    if (statusCode !== 200) {
      environment.log.error(`status code: ${statusCode}`);
      return false;
    }
    const resBody = await res.json();
    environment.log.info(JSON.stringify(resBody, null, 4));
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
