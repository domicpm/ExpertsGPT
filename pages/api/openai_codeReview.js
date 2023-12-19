//openai.js
import OpenAI from 'openai';
//import pdf from 'pdf-parse';
//import fs from 'fs';

//const pdfFile = "";
//const fileRequired = false;

//let pdfText;

/*  // Funktion zum Einlesen des PDFs, nur sofern fileRequired auf true gesetzt wird
if(fileRequired){
 const readPdfFile = async () => {s
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
}  */
const openai = new OpenAI({
  apiKey: "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"
});

const myExportedFunction = async (req, res) => {
  /*  if (!pdfText && fileRequired == true) {
     res.status(500).json({ error: 'Fehler bei der Verarbeitung der PDF-Datei.' });
    return;
  }  */
  let userText;
 userText = `Du erhältst als eingabe eine git diff Datei. Du schlägst als erstes eine kurze Commit Message vor, anschließend eine ausführliche Commit message und zuletzt eine Pull Request Descripiton. Trenne die 3 Punkte mit new lines.  ${req.body.name}`;


  if (!userText) {
    res.status(400).json({ error: 'Benutzereingabe fehlt oder ist leer.' });
    return;
  }
  const messages = [
    { role: 'user', content: userText },
   // { role: 'user', content: pdfText },
  ];
/*  }else{
   const messages = [
  {role: 'user', content: userText},
  ]; */

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
