// Home.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './styles/Home.module.css';
import LoadingSpinner from './loadingSpinner';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState({ text: '' });
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [useDefaultPrompt, setUseDefaultPrompt] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4'); // Default model
  const [showTooltip, setShowTooltip] = useState(false);
  const [temperature, setTemperature] = useState(0.5); // Initial temperature value

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
    setQuery('');
    setSearch('');
    setIsLoading(false);
    setInstructions('');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
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
        const res = await fetch(`/api/openai_codeDebugging`, {
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
        <title>CodeDebuggingGPT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>CodeDebuggingGPT</a>
        </h1>

        <p className={styles.description}>Built with NextJS & GPT-4 API for Bayernwerk</p>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.animation}`}>
            <div className={styles.codeWindow}>
              <h3>Code Input:</h3>
              <div className={styles.customCodeEditor}>
                <textarea
                  spellCheck="false"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Copy and paste your code here or use the upload file button below"
                  className={`${styles.codeTextarea} ${styles.answerTextarea}`}
                />
              </div>
              <input
                type="file"
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
                Use default prompt for code review
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
                <button type="button" onClick={() => setSearch(query)}>
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
                <div className={styles.answerContainer}>
                <pre className={styles.answerText}>
                  {data.text}
                  </pre>
                  </div>

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
