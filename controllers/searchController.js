import { extractLocationFromPrompt } from "../services/llmService.js";
import { searchPlaces } from "../services/mapsService.js";

export const renderHome = (req, res) => {
  res.render("dashboardApp", {
    places: []
  });
};

export const searchPlace = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("USER PROMPT:", prompt);
    if (!prompt) {
      return res.status(400).send("Prompt is required");
    }

    // 1. Extract location intent via LLM
    const locationData = await extractLocationFromPrompt(prompt);
    console.log("LLM RESULT:", locationData);

    // 2. Query Google Maps
    const places = await searchPlaces(locationData);
    console.log("PLACES RESULT:", places);

   res.render("dashboardApp", {
    places
  });
  } catch (error) {
    console.error("SEARCH ERROR:", error.message);
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
