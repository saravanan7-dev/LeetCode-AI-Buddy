import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const genAI = new GoogleGenerativeAI(apiKey);
  console.log(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 400,
    responseMimeType: "text/plain",
  };

  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: "Leetcode question: \"powx n\"\nCode:\nclass Solution {\npublic:\n    double myPow(double x, int n) {\n        \n    }\n};\nGive a hint or tip to optimize.Give snippets instead of complete code. Max of 100 words." },
        ],
      },
      {
        role: "model",
        parts: [
          { text: "Consider using recursion or iterative methods to calculate `x^n`.  Think about how to efficiently handle negative exponents and large values of `n`. Also, consider potential issues with integer overflow/underflow when dealing with very large or very small values of `n`" },
        ],
      },
    ],
  });