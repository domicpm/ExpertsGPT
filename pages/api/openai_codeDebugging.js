// openai.js
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: "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"
});
const myExportedFunction = async (req, res, temperature) => {
  let userText;
  const selectedPromptScenario = req.body.promptScenario;

  console.log('Temperature value in openai.js:', req.body.temperature);
  console.log('Model value in openai.js:', req.body.selectedModel);

  if (selectedPromptScenario === 'simplePrompt') {
 


    userText = `Does this code snippet contain a bug? Do not fix the bug, only tell where. If no bug,
     reply with "the code is correct."`;


  }
  else if(selectedPromptScenario === 'detailedPrompt'){


    userText = `The provided Java code snippet contains a one-line bug. Fix the bug.`;


  }else{
    userText = req.body.instructions;
  }
  if (req.body.name) {
    userText += `${req.body.name}`;
  }
  if (req.body.instructions) {
    userText += `${req.body.instructions}`;
  }
  if (!userText) {
    res.status(400).json({ error: 'Benutzereingabe fehlt oder ist leer.' });
    return;
  }

  const messages = [
    { role: 'user', content: userText },
    // { role: 'user', content: pdfText },
  ];
  const selectedModel = req.body.selectedModel;
if(selectedModel === 'gpt-3.5-turbo-0125'){
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: messages,
      temperature: 1.0,
    });
  
    const responseText = chatCompletion.choices[0].message.content;

    res.status(200).json({ text: responseText });
  } catch (error) {
    console.error('Fehler bei der Anfrage an GPT:', error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }}else if(selectedModel === 'gpt-4-0125-preview'){
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4-0125-preview",
        messages: messages,
        temperature: 1.0
      });
    
      const responseText = chatCompletion.choices[0].message.content;
  
      res.status(200).json({ text: responseText });
    } catch (error) {
      console.error('Fehler bei der Anfrage an GPT:', error);
      res.status(500).json({ error: 'Interner Serverfehler.' });
    }
  }
};

export default myExportedFunction;
