//openai_ownChatBot.js
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: "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"
});

const myExportedFunction = async (req, res) => {
  console.log(req.body.instructions);
  console.log(req.body.name);
  console.log(req.body.query)
  let userText = ` ${req.body.name}`;
   userText += ` ${req.body.instructions}`;

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
      model: "gpt-4",
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
