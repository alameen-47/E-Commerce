import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post("https://libretranslate.com/translate", {
      q: text,
      source: "en",
      target: targetLanguage,
      format: "text",
    });

    return response.data.translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};
const translateAndCache = async (text, targetLanguage) => {
  const cacheKey = `${text}-${targetLanguage}`;
  const cachedTranslation = cache.get(cacheKey);

  if (cachedTranslation) {
    return cachedTranslation;
  }
  const translatedText = await translateText(text, targetLanguage);
  cache.set(cacheKey, translatedText);
  return translatedText;
};
export default translateAndCache;
