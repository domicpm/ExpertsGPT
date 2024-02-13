// openai.js
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: "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"
});

const myExportedFunction = async (req, res, temperature) => {
  let userText;

  console.log('Temperature value in openai.js:', req.body.temperature);

  if (req.body.useDefaultPrompt) {
    // Use the default prompt if the checkbox is checked
    userText =
      `You are a expert for code debugging in python. The given python code snippets contain a error. Find the error and explain.`;
  } else {
    // Use the user-provided text if the checkbox is not checked
    userText = req.body.userText || '';
  }

  // Append content from the uploaded file to userText
  if (req.body.name) {
    userText += `\n\nContent from uploaded file:\n${req.body.name}`;
  }
  if (req.body.instructions) {
    userText += `\n\nUser instructions:\n${req.body.instructions}`;
  }

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
      temperature: temperature,
    });

    const responseText = chatCompletion.choices[0].message.content;

    res.status(200).json({ text: responseText });
  } catch (error) {
    console.error('Fehler bei der Anfrage an GPT-4:', error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
};

export default myExportedFunction;
