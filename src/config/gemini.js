import { GoogleGenAI } from "@google/genai";
import mime from "mime";
require('dotenv').config();

function saveBinaryFile(fileName, content) {
  const blob = new Blob([content], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const config = {
    responseModalities: ["IMAGE", "TEXT"],
  };
  const model = "gemini-2.5-flash-image-preview";
  const contents = [
    {
      role: "user",
      parts: [{ text: `${prompt}` }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fileIndex = 0;
  let collectedText = "";

  for await (const chunk of response) {
    if (
      !chunk.candidates ||
      !chunk.candidates[0].content ||
      !chunk.candidates[0].content.parts
    ) {
      continue;
    }

    const candidatePart = chunk.candidates[0].content.parts[0];

    if (candidatePart.inlineData) {
      const fileName = `generated_file_${fileIndex++}`;
      const inlineData = candidatePart.inlineData;
      const fileExtension =
        mime.getExtension(inlineData.mimeType || "") || "bin";
      const buffer = Uint8Array.from(atob(inlineData.data || ""), (c) =>
        c.charCodeAt(0)
      );
      saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
    }

    // Check for text in candidatePart.text (more reliable)
    if (candidatePart.text) {
      collectedText += candidatePart.text + " ";
    } else if (chunk.text) {
      collectedText += chunk.text + " ";
    }
  }

  console.log(collectedText.trim());
  return collectedText.trim();

  // console.log(response);
  // console.log(response.text);
  // return response.text;
}

export default main;
