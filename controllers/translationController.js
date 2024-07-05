import translateText from "../services/translateText.js";

//translationn controller
export const translationController = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    const translatedText = await translateText(text, targetLanguage);
    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
