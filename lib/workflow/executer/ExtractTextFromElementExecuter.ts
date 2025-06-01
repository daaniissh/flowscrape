import { ExecutionEnvironment } from "@/types/executor";

import { ExtractTextFromElement } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";
export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElement>,
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("selector not defined");

      return false;
    }
    const html = environment.getInput("Html");
    if (!html) {
      environment.log.error("html not defined");
      return false;
    }
    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      environment.log.error("element nor found");

      return false;
    }
    const extractedText = $.text(element);
    if (!extractedText) {
      console.error("extracted text is empty for selector:");
      environment.log.error("extracted text is empty for selector");
      return false;
    }
    environment.setOutput("Extracted text", extractedText);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);

    return false;
  }
}
