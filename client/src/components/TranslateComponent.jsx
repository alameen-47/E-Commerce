import { useState, useEffect } from "react";
import axios from "axios";

const TranslateComponent = ({ text, targetLanguage }) => {
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const translateText = async () => {
      const cacheKey = `${text}_${targetLanguage}`;
      const cachedTranslation = localStorage.getItem(cacheKey);

      if (cachedTranslation) {
        setTranslatedText(cachedTranslation);
      } else {
        try {
          const response = await axios.post(
            "https://translation.googleapis.com/language/translate/v2",
            {},
            {
              params: {
                q: text,
                target: targetLanguage,
                key: "YOUR_GOOGLE_CLOUD_API_KEY",
              },
            }
          );
          const translation = response.data.data.translations[0].translatedText;
          setTranslatedText(translation);
          localStorage.setItem(cacheKey, translation);
        } catch (error) {
          console.error("Error translating text:", error);
        }
      }
    };

    translateText();
  }, [text, targetLanguage]);

  return <div>{translatedText}</div>;
};

export default TranslateComponent;
