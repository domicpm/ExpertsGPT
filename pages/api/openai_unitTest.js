// openai.js
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: "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"
});
const myExportedFunction = async (req, res, temperature) => {
  let userText;
  const selectedPromptScenario = req.body.promptScenario;

  console.log('Temperature value in openai.js:', req.body.temperature);
  console.log('Model in openai.js:', req.body.selectedModel);
  console.log('Prompt secnario in openai.js:', req.body.promptScenario);

  if (selectedPromptScenario === 'detailedPrompt') {


 
  userText = `You are an expert on generating unit tests based on a provided Java Code.
  Generate complete and compilable unit tests for the given Java code, strive for maximum branch coverage, 
  statement coverage and a high variety of individual test cases.
  A good unit test suite should aim to: 
  - Test the function's behavior for a wide range of possible inputs 
  - Test edge cases that the author may not have foreseen   
  - Be deterministic, so that the tests always pass or fail in the same way
  - Unit tests should be independet of each other, one test should not rely on the success or failure caused by another test
  The Test must be written in JUnit 5 framework format. Return code only, include all necessary imports.`


;
  } else if(selectedPromptScenario === 'simplePrompt'){



    userText = 'Generate unit tests using Junit5. Return code only';




  }



  else if(selectedPromptScenario === 'contextPrompt'){
    userText = `Generate unit tests for the specified Java code, strive for maximum code coverage. Return code only
    Example of a good Unit Test:
    package com.dailycodebuffer;
Code:
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.stream.Stream;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

public class FindMaxTest {

    @ParameterizedTest
    @MethodSource("inputStream")
    void numberTests(int expected, int[] input) {
        Assertions.assertEquals(expected, FindMax.findMax(input));
    }

    private static Stream<Arguments> inputStream() {
        return Stream.of(Arguments.of(10, new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}), Arguments.of(5, new int[] {5, 5, 5, 5, 5}), Arguments.of(0, new int[] {-1, 0}), Arguments.of(-1, new int[] {-10, -9, -8, -7, -6, -5, -4, -3, -2, -1}), Arguments.of(9, new int[] {3, -2, 3, 9, -4, -4, 8}));
    }

    @Test
    public void testFindMaxThrowsExceptionForEmptyInput() {
        assertThrows(IllegalArgumentException.class, () -> FindMax.findMax(new int[] {}));
    }
}

Unit Test:
    package com.dailycodebuffer;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.stream.Stream;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

public class FindMaxTest {

    @ParameterizedTest
    @MethodSource("inputStream")
    void numberTests(int expected, int[] input) {
        Assertions.assertEquals(expected, FindMax.findMax(input));
    }

    private static Stream<Arguments> inputStream() {
        return Stream.of(Arguments.of(10, new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}), Arguments.of(5, new int[] {5, 5, 5, 5, 5}), Arguments.of(0, new int[] {-1, 0}), Arguments.of(-1, new int[] {-10, -9, -8, -7, -6, -5, -4, -3, -2, -1}), Arguments.of(9, new int[] {3, -2, 3, 9, -4, -4, 8}));
    }

    @Test
    public void testFindMaxThrowsExceptionForEmptyInput() {
        assertThrows(IllegalArgumentException.class, () -> FindMax.findMax(new int[] {}));
    }
}
    `
  ;
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
  const selectedTemperature = req.body.temperature;
if(selectedModel === 'gpt-3.5-turbo-0125'){
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: messages,
      temperature: 0.5,
    });

    const responseText = chatCompletion.choices[0].message.content;

    res.status(200).json({ text: responseText });
  } catch (error) {
    console.error('Fehler bei der Anfrage an GPT-4:', error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
} else if(selectedModel === 'gpt-4-0125-preview'){
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: messages,
      temperature: 0.5,
    });
  
    const responseText = chatCompletion.choices[0].message.content;

    res.status(200).json({ text: responseText });
  } catch (error) {
    console.error('Fehler bei der Anfrage an GPT:', error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
}
}
export default myExportedFunction;
