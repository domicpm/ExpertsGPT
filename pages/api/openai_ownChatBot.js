//openai.js
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: "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"
});

const myExportedFunction = async (req, res) => {
  
  let userText;
 userText = `${req.body.name}`;
 userText += `You will behave as a ChatBot, beeing a expert / imitating the behavour of a person on the topic as follows: ${req.body.instructions}`;
  if (!userText) {
    res.status(400).json({ error: 'Benutzereingabe fehlt oder ist leer.' });
    return;
  }
  const messages = [
    { role: 'user', content: userText },
   // { role: 'user', content: pdfText },
  ];
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: req.body.temperature,
    });
    const responseText = chatCompletion.choices[0].message.content;
    res.status(200).json({ text: responseText });
  } catch (error) {
    console.error('Fehler bei der Anfrage an GPT-4:', error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
};

export default myExportedFunction;
