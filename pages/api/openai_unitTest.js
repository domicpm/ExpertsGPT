// openai.js
import OpenAI from 'openai';
import pdf from 'pdf-parse';
import fs from 'fs';

const pdfFile = "";  // Set your PDF file path
const fileRequired = false;  // Set to true if the file is required
let pdfText;

// Funktion zum Einlesen des PDFs, nur sofern fileRequired auf true gesetzt wird
if (fileRequired) {
  const readPdfFile = async () => {
    try {
      const data = await fs.promises.readFile(pdfFile);
      const pdfData = await pdf(data);
      pdfText = pdfData.text;
    } catch (error) {
      console.error('Fehler beim Lesen der PDF-Datei:', error);
    }
  };
  // PDF einmalig einlesen
  readPdfFile();
}
const openai = new OpenAI({
  apiKey: "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"
});

const myExportedFunction = async (req, res) => {
  if (!pdfText && fileRequired == true) {
    res.status(500).json({ error: 'Fehler bei der Verarbeitung der PDF-Datei.' });
    return;
  }
  let userText;
  console.log(typeof req.body.useDefaultPrompt);
  console.log(req.body.useDefaultPrompt);
  
  if (req.body.useDefaultPrompt) {
    // Use the default prompt if the checkbox is checked
    
    userText =
    `Generate unit tests for the specified C# code
    using NUnit, strive for maximum code coverage
    when generating the unit tests. 
    Return code only. `;
    

  } else {
    // Use the user-provided text if the checkbox is not checked
    userText = req.body.userText || '';

  }

  // Append content from the uploaded file to userText
  if (req.body.name) {
    userText += `\n\nContent from CodeMirror text field:\n${req.body.code}`;
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
