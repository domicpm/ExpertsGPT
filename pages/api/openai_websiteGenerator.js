import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: "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"
  });
const myExportedFunction = async (req, res) => {
  const prompt = ` ${req.body.name}`;

  try {
    const image = await openai.images.generate({ model: "dall-e-3", prompt: prompt });

    const imageUrl = image.data[0].url;

    res.status(200).json({ imageUrl: imageUrl });
  } catch (error) {
    console.error('Fehler bei der Anfrage an GPT-4:', error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
};

export default myExportedFunction;
