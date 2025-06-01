import { ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("website url");

    const browser = await puppeteer.launch({
      headless: false,
    });
    environment.setBrowser(browser);
    environment.log.info("Browser started successfully");

    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Operated page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);

    return false;
  }
}
