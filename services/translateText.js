import axios from "axios";
import { LRUCache } from "lru-cache";

// Configure LRUCache Cache
const cache = new LRUCache({
  max: 500,
  maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
});

const apiKey = "AIzaSyAs5xsurNhOhJpHNnSNdIPbIR-azSG1iIk";
// const apiKey = process.env.GOOGLE_TRANSLATION_API_KEY;
const apiUrl = `https://translation.googleapis.com/language/translate/v2`;

let usageCount = 0;
const usageLimit = 500000; // Set your monthly character limit

const translateText = async (text, targetLanguage) => {
  const cacheKey = `${text}-${targetLanguage}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  if (usageCount >= usageLimit) {
    throw new Error("Monthly translation limit exceeded");
  }

  try {
    const response = await axios.post(apiUrl, null, {
      params: {
        q: text,
        target: targetLanguage,
        key: apiKey,
      },
    });

    const translatedText = response.data.data.translations[0].translatedText;

    // Update usage count
    usageCount += text.length;

    // Cache the result
    cache.set(cacheKey, translatedText);

    return translatedText;
  } catch (error) {
    console.error("Translation API error:", error);
    throw error;
  }
};

export default translateText;