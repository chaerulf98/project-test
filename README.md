# Local LLM + Google Maps Integration

## Description
This project demonstrates a Local LLM (Ollama + LLaMA3) integrated with OpenStreetMap using Leaflet js. It allows users to search for places worldwide using natural language prompts and displays results interactively on a map.

## Tech Stack
- Backend: Node.js + Express.js
- Frontend: EJS templates, Leaflet.js for map rendering
- LLM: Ollama running LLaMA3
- Maps: OpenStreetMap (via Nominatim API)


## How It Works
1. User Input: User types a prompt (e.g., "chinese restaurants in singapore").
2. LLM Processing: The prompt is parsed by the local LLM to extract keyword and location.
3. OSM Query: Backend queries OpenStreetMap Nominatim API for matching places.
4. Results Display: Places are shown on a Leaflet map and in a sidebar with OpenStreetMap links.


## Setup
```bash
npm install
ollama pull llama3, 
ollama list ( output : llama3 ), 
ollama run llama3
npm run dev

