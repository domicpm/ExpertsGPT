// unittest.js

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './styles/Home.module.css';
<<<<<<< HEAD
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import App from './App';  // Import the App component
=======
import LoadingSpinner from './loadingSpinner';
import Link from 'next/link';
>>>>>>> c11f8dddaaae9ee9c5911343e31b6fb45e9f3460

export default function Home() {
  const [data, setData] = useState({ text: '' });
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [useDefaultPrompt, setUseDefaultPrompt] = useState(false);
<<<<<<< HEAD
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
=======
  const [selectedModel, setSelectedModel] = useState('gpt-4'); // Default model
  const [showTooltip, setShowTooltip] = useState(false);
  const [temperature, setTemperature] = useState(0.5); // Initial temperature value
>>>>>>> c11f8dddaaae9ee9c5911343e31b6fb45e9f3460

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // You can read the file content or perform other operations as needed
    // For example, you can use FileReader to read the content of the file
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setQuery(fileContent);
    };
    reader.readAsText(file);
  };

  const handleCheckboxChange = () => {
    setUseDefaultPrompt(!useDefaultPrompt);
    setInstructions('');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        if (!useDefaultPrompt && !instructions) {
          alert('Please give instructions or use the default prompt.');
          return;
        }

        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            name: search,
            instructions: useDefaultPrompt ? '' : instructions,
            useDefaultPrompt: useDefaultPrompt,
            temperature: temperature,
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
    fetchData();
  }, [search, useDefaultPrompt, instructions]);

  return (
    
    <div className={styles.container}>
         <Link href="/" passHref>      
          <img
          src="/icon_home.png" 
          alt="Home Icon"
          className={styles.logo}
          width={80} 
          height={80} 
        />
          </Link>
  
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
            <div className={styles.codeWindow}>
              <h3>Code Input:</h3>
<<<<<<< HEAD
              <textarea
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Copy and paste your code here..."
                className={`${styles.codeTextarea} ${styles.answerTextarea}`}
                disabled={useDefaultPrompt} // Disable textarea if using default prompt
              />
=======
              <div className={styles.customCodeEditor}>
                <textarea
                  spellCheck="false"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Copy and paste your code here or use the upload file button below"
                  className={`${styles.codeTextarea} ${styles.answerTextarea}`}
                />
              </div>
>>>>>>> c11f8dddaaae9ee9c5911343e31b6fb45e9f3460
              <input
                type="file"
                accept=".cs"
                onChange={(event) => handleFileUpload(event)}
                className={styles.fileInput}
              />
            </div>

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
            <div className={styles.temperatureSliderContainer}>
        <label>Adjust Temperature:</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={temperature}
          onChange={(event) => setTemperature(parseFloat(event.target.value))}
        />
        <span>{temperature.toFixed(1)}</span>
      </div>
            <div className={styles.dropdownContainer}>
              <label>Select ChatGPT Model:</label>
              <select
                value={selectedModel}
                onChange={(event) => setSelectedModel(event.target.value)}
              >
                <option value="gpt-4-preview">gpt-4-1106-preview</option>
                <option value="gpt-4">gpt-4</option>
                <option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</option>
              </select>
              {/* Info button to trigger the tooltip */}
              <button
                className={styles.infoButton}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                &#9432;
              </button>
              {/* Tooltip */}
              {showTooltip && (
                <div className={`${styles.tooltip} ${styles.right}`}>
                  <p>Information about the models...</p>
                </div>
              )}
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
              <LoadingSpinner />
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
