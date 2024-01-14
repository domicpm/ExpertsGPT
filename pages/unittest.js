// unittest.js

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './styles/Home.module.css';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import App from './App';  // Import the App component

export default function Home() {
  const [data, setData] = useState({ text: '' });
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [useDefaultPrompt, setUseDefaultPrompt] = useState(false);
  const [file, setFile] = useState(null);
  const codeMirrorRef = useRef(null);

  const handleFileUpload = useCallback((event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setFile(fileContent);
        setSearch(uploadedFile.name);
        // Update the CodeMirror content
        const codeMirrorInstance = codeMirrorRef.current;
        if (codeMirrorInstance) {
          codeMirrorInstance.setValue(fileContent);
        }
      };
      reader.readAsText(uploadedFile);
    }
  }, []);

  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = data.text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  const handleRefresh = () => {
    setData({ text: '' });
    setSearch('');
    setIsLoading(false);
    setInstructions('');
  };

  const handleCheckboxChange = () => {
    setUseDefaultPrompt(!useDefaultPrompt);
    setInstructions('');
  };

  const handleGenerate = () => {
    setIsLoading(true);
    fetchData();
  };

  const fetchData = async () => {
    if (file || (!useDefaultPrompt && instructions)) {
      const res = await fetch(`/api/unitTest_openai`, {
        body: JSON.stringify({
          code: file || null,
          instructions: useDefaultPrompt ? '' : instructions,
          useDefaultPrompt: useDefaultPrompt,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const resultData = await res.json();
      setData(resultData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch data when the Generate button is clicked
    if (file || (!useDefaultPrompt && instructions)) {
      fetchData();
    }
  }, [file, useDefaultPrompt, instructions]);

  return (
    <div className={styles.container}>
      <Head>
        <title>UnitTestGPT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>UnitTestGPT</a>
        </h1>

        <p className={styles.description}>Built with NextJS & GPT-4 API for Bayernwerk</p>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.animation}`}>
            <App value={file} onChange={(val, viewUpdate) => console.log('val:', val)} />

            <input
              type="file"
              accept=".cs"
              onChange={handleFileUpload}
              className={styles.fileInput}
            />

            <div className={styles.instructionsWindow}>
              <h3>Instructions:</h3>
              <textarea
                placeholder="Provide instructions here..."
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                className={styles.instructionsTextarea}
                disabled={useDefaultPrompt}
              />
            </div>

            <div className={styles.checkboxContainer}>
              <label>
                <input
                  type="checkbox"
                  checked={useDefaultPrompt}
                  onChange={handleCheckboxChange}
                />
                Use default prompt for unit tests
              </label>
            </div>

            <div className={`${styles.card}`}>
              <div className={styles.buttonContainer}>
                <button type="button" onClick={handleGenerate}>
                  Generate
                </button>
                <button type="button" onClick={handleRefresh} className={styles.refreshButton}>
                  Refresh
                </button>
              </div>
            </div>

            <h4>Answer:</h4>
            {isLoading ? (
              <div>UnitTestGPT is typing...</div>
            ) : (
              <>
                <SyntaxHighlighter language="javascript" style={solarizedlight} showLineNumbers>
                  {data.text}
                </SyntaxHighlighter>
                <button onClick={copyToClipboard} className={styles.copyButton}>
                  Copy Code
                </button>
                {copySuccess && <div style={{ color: 'green' }}>Code Copied Successfully!</div>}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
