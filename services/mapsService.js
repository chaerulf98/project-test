import axios from "axios";

export const searchPlaces = async ({ keyword, location }) => {
  const safeKeyword = keyword.toLowerCase().trim();
  const safeLocation = location ? location.toLowerCase().trim() : null;

  console.log("OSM SEARCH:", safeKeyword, safeLocation || "[GLOBAL]");

  // ===== 1. STRUCTURED SEARCH (ONLY IF LOCATION EXISTS) =====
  if (safeLocation) {
    try {
      const structured = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            format: "json",
            limit: 10,
            addressdetails: 1,
            amenity: safeKeyword,
            city: safeLocation
          },
          headers: {
            "User-Agent": "Local-LLM-Maps/1.0"
          },
          timeout: 8000
        }
      );

      if (structured.data?.length > 0) {
        return normalize(structured.data);
      }
    } catch (err) {
      console.warn("STRUCTURED FAILED:", err.message);
    }
  }

  // ===== 2. GLOBAL FREE TEXT SEARCH =====
  try {
    const q = safeLocation
      ? `${safeKeyword} ${safeLocation}`
      : safeKeyword;

    const freeText = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q,
          format: "json",
          limit: 10,
          addressdetails: 1
        },
        headers: {
          "User-Agent": "Local-LLM-Maps/1.0"
        },
        timeout: 8000
      }
    );

    if (freeText.data?.length > 0) {
      return normalize(freeText.data);
    }

    console.warn("NO RESULT FROM OSM");
    return [];

  } catch (err) {
    console.error("OSM SEARCH ERROR:", err.message);
    return [];
  }
};

const normalize = (data) =>
  data
    .filter(p => p.lat && p.lon)
    .slice(0, 8) // batasi
    .map(place => ({
      name: place.display_name.split(",")[0],
      address: place.display_name,
      lat: Number(place.lat),
      lng: Number(place.lon)
    }));

