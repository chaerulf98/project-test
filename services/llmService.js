import axios from "axios";

export const extractLocationFromPrompt = async (prompt) => {
  try {
    const llmPrompt = `
Return ONLY JSON.
No explanation.

{
  "keyword": "",
  "location": ""
}

User:
"${prompt}"
`;

    const response = await axios.post(
      `${process.env.OLLAMA_URL}/api/generate`,
      {
        model: "llama3",
        prompt: llmPrompt,
        stream: false
      }
    );

    const raw = response.data.response;
    console.log("RAW LLM RESPONSE:", raw);

    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return fallback(prompt);

    const parsed = JSON.parse(match[0]);

    return {
      keyword: parsed.keyword?.trim() || prompt,
      location: parsed.location?.trim() || null // 🔥 GLOBAL READY
    };

  } catch {
    return fallback(prompt);
  }
};

const fallback = (prompt) => ({
  keyword: prompt,
  location: null // 🔥 JANGAN PAKSA JAKARTA
});
