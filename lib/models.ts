import { anthropic } from "@ai-sdk/anthropic"
import { fireworks } from "@ai-sdk/fireworks"
import { groq } from "@ai-sdk/groq"
import { google } from "@ai-sdk/google"
import { customProvider, extractReasoningMiddleware, wrapLanguageModel, defaultSettingsMiddleware } from "ai"

// custom provider with different model settings:
export const myProvider = customProvider({
  languageModels: {
    // "sonnet-3.7": wrapLanguageModel({
    //   middleware: defaultSettingsMiddleware({
    //     settings: {
    //       providerMetadata: {
    //         anthropic: {
    //           thinking: { type: "enabled", budgetTokens: 5000 },
    //         },
    //       },
    //     },
    //   }),
    //   model: anthropic("claude-3-7-sonnet-20250219"),
    // }),
    // "deepseek-r1": wrapLanguageModel({
    //   middleware: extractReasoningMiddleware({
    //     tagName: "think",
    //   }),
    //   model: fireworks("accounts/fireworks/models/deepseek-r1"),
    // }),
    "deepseek-r1-distill-llama-70b": wrapLanguageModel({
      middleware: extractReasoningMiddleware({
        tagName: "think",
      }),
      model: groq("deepseek-r1-distill-llama-70b"),
    }),
    "gemini-1.5-pro": wrapLanguageModel({
      middleware: defaultSettingsMiddleware({
        settings: {
        },
      }),
      model: google("gemini-1.5-pro"),
    }),
  },
});

export type modelID = Parameters<(typeof myProvider)["languageModel"]>["0"];

export const models: Record<modelID, string> = {
  // "sonnet-3.7": "Claude Sonnet 3.7",
  // "deepseek-r1": "DeepSeek-R1",
  "deepseek-r1-distill-llama-70b": "DeepSeek-R1 Llama 70B",
  "gemini-1.5-pro": "Google Gemini 1.5 Pro",
}
