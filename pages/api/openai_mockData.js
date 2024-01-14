//openai.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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"
});

const myExportedFunction = async (req, res) => {

  let userText;
 userText = `Generate mock data based on the given input. Use this style (example):  input: generate mock data for a customer with name, age, gender. chatgpt output: 1. {
    "name": "Alice Smith",
    "age": 25,
    "gender": "female",
    "email": "alice.smith@gmail.com"   Begin a new line after every attribute, and 2 new lines after a mock data set is finished${req.body.name}`;


  if (!userText) {
    res.status(400).json({ error: 'Benutzereingabe fehlt oder ist leer.' });
    return;
  }
  const messages = [
    { role: 'user', content: userText },
  ];
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const responseText = chatCompletion.choices[0].message.content;

    res.status(200).json({ text: responseText });
  } catch (error) {
    console.error('Fehler bei der Anfrage an GPT-4:', error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
};

export default myExportedFunction;
