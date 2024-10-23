import axios from "axios";
import { LRUCache } from "lru-cache";
import dotenv from "dotenv";

//configure env
dotenv.config();

// const apiKey = process.env.GOOGLE_TRANSLATION_API_KEY;
// const apiUrl = `https://translation.googleapis.com/language/translate/v2`;

const apiUrl = `http://localhost:5001/translate`; // Use LibreTranslate endpoint

// Configure LRUCache Cache
const cache = new LRUCache({
  max: 1000, //No of data to be stored in cache
  maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
});

let usageCount = 0;
const usageLimit = 500000; // Set your monthly character limit

const translateText = async (texts, targetLanguage) => {
  const cacheKey = `${texts}-${targetLanguage}`;

  if (cache.has(cacheKey)) {
    // console.log("TRANSLATED", cacheKey, cache);
    return cache.get(cacheKey);
  }

  if (usageCount >= usageLimit) {
    throw new Error("Monthly translation limit exceeded");
  }

  try {
    const response = await axios.post(apiUrl, null, {
      params: {
        q: texts,
        target: targetLanguage,
        // key: apiKey,
        // source: "auto", // Auto-detect source language if necessary
        source: "en", // Specify English as the source language
      },
    });

    // Check if the API returned an error
    if (response.data && response.data.error) {
      console.warn(`Translation API error: ${response.data.error}`);
      // Return the original text if there's an error from the API
      return texts;
    }

    // const translatedText = response.data.data.translations[0].translatedText;
    // Check if translation was successful
    if (response.data && response.data.translatedText) {
      const translatedText = response.data.translatedText; // Adjusted to match LibreTranslate's response structure

      // Update usage count
      usageCount += texts.length;

      // Cache the result
      cache.set(cacheKey, translatedText);

      return translatedText;
    } else {
      // Return the original text if no translation is found
      return texts;
    }
  } catch (error) {
    // console.error("Translation API error:", error);
    // throw error;
    if (error.response) {
      console.error("Translation API error:", error.response.data);
      if (error.response.status === 400) {
        console.warn("Bad Request: Returning original text.");
        return texts; // Return original text on bad request
      }
    } else {
      console.error("Translation API error:", error.message);
    }

    // Return the original text on any error
    return texts;
  }
};

export default translateText;
