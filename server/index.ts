import { Hono } from "hono";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z, ZodError } from "zod";

const app = new Hono();
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.get("/", (ctx) => {
  return ctx.text("Hello World");
});

app.post("/api/translate", async (ctx) => {
  try {
    const data = await ctx.req.json();

    const validator = z.object({
      text: z
        .string({ required_error: "Text is required" })
        .trim()
        .min(1, { message: "Text is required" }),
      fromLanguage: z
        .string({ required_error: "Language is required" })
        .trim()
        .min(1, { message: "Language is required" }),
      toLanguage: z
        .string({ required_error: "Language is required" })
        .trim()
        .min(1, { message: "Language is required" }),
    });

    const { text, fromLanguage, toLanguage } = await validator.parseAsync(data);

    const res = await model.generateContent(
      `You are a language translation model. You have to translate the following text from ${fromLanguage} to ${toLanguage}. Only give the translated text as response and nothing else. The text is : ${text}`
    );

    const translatedText = res.response.text();

    return ctx.json({ translatedText });
  } catch (error) {
    if (error instanceof ZodError) {
      return ctx.json({ error: error.errors[0].message });
    }
    return ctx.json({ error: "Some error occured. Please try again later!" });
  }
});

export default app;
