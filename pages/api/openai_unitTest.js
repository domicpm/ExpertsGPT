// openai.js
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: "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"
});
const myExportedFunction = async (req, res, temperature) => {
  let userText;
  const selectedPromptScenario = req.body.promptScenario;

  console.log('Temperature value in openai.js:', req.body.temperature);

  if (selectedPromptScenario === 'detailedPrompt') {
    // Use the default prompt if the checkbox is checked
    /* userText =
      `Generate unit tests for the specified C# code
    using NUnit, strive for maximum code coverage
    when generating the unit tests. 
    Return code only. A good unit test suite should aim to:
    - Test the function's behavior for a wide range of possible inputs
    - Test edge cases that the author may not have foreseen
    - Be easy to read and understand, with clean code and descriptive names
    - Be deterministic, so that the tests always pass or fail in the same way`; */

    userText = `Generate unit tests for the specified javascript code
    using Jest, strive for maximum code coverage
    when generating the unit tests. 
    Return code only. A good unit test suite should aim to:
    - Test the function's behavior for a wide range of possible inputs
    - Test edge cases that the author may not have foreseen
    - Be easy to read and understand, with clean code and descriptive names
    - Be deterministic, so that the tests always pass or fail in the same way`;
  } else if(selectedPromptScenario === 'zeroPrompt'){
    // Use the user-provided text if the checkbox is not checked
    userText = '';
  }
  else if(selectedPromptScenario === 'simplePrompt'){
    userText = 'write a unit test';
  }else{
    userText = req.body.instructions;
  }
  // Append content from the uploaded file to userText
  if (req.body.name) {
    userText += `\n\nContent from CodeMirror text field:\n${req.body.name}`;
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
