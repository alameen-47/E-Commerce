import axios from "axios";
import { LRUCache } from "lru-cache";
import dotenv from "dotenv";

//configure env
dotenv.config();
const apiKey = process.env.GOOGLE_TRANSLATION_API_KEY;
const apiUrl = `https://translation.googleapis.com/language/translate/v2`;

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
        key: apiKey,
      },
    });
    const translatedText = response.data.data.translations[0].translatedText;

    // Update usage count
    usageCount += texts.length;

    // Cache the result
    cache.set(cacheKey, translatedText);

    // inspectCache(); // Inspect cache state

    return translatedText;
  } catch (error) {
    console.error("Translation API error:", error);
    throw error;
  }
};


export default translateText;
