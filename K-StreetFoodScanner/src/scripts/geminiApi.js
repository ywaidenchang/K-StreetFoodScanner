import { GoogleGenerativeAI } from "@google/generative-ai";

async function gemini(prompt) {
  const genAI = new GoogleGenerativeAI("AIzaSyCh_rsJNWhFdPeK7ef7nNEBEVHxfSqwOdM");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const res = await model.generateContent(prompt);
  console.log(res.response.text());
  return String(res.response.text());
};

export default gemini;