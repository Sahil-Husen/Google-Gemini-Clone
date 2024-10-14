/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
 
  
  // Access the API key from the environment variables
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  // Initialize the Google Generative AI client
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Define the model configuration
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  // Define the generation configuration
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  // Define the run function that takes a prompt as input
  async function run(prompt) {
    try {
      // Start a new chat session
      const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [],
      });
  
      // Send the message and await the response
      const result = await chatSession.sendMessage(prompt);

      
      // Log the response text
      console.log(result.response.text());
      return result.response.text();
    } catch (error) {
      // Log any errors that occur during generation
      console.error("Error during message generation:", error);
    }
  }
  
  // Export the run function for use in other modules
  export default run;
  