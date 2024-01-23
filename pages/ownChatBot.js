// ownChatBot.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './styles/Home.module.css';
import LoadingSpinner from './loadingSpinner';
import Link from 'next/link';

let userInputTitle;
let userInstructions;
let userTemperature;

export function setTitle(title) {
  userInputTitle = title;
}

export function setUserInstructions(instr) {
  userInstructions = instr;
}

export function setUserTemperature(temp) {
  userTemperature = temp;
}

export default function Home() {
  const [data, setData] = useState({ text: '' });
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [useDefaultPrompt, setUseDefaultPrompt] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [showTooltip, setShowTooltip] = useState(false);
  const [temperature, setTemperature] = useState(0.5);

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setQuery(fileContent);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai_ownChatBot`, {
          body: JSON.stringify({
            name: search,
            instructions: userInstructions,
            temperature: userTemperature,
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
  }, [search, useDefaultPrompt, userInstructions, userTemperature]);


  const handleRefresh = () => {
    setData({ text: '' });
    setQuery('');
    setSearch('');
    setIsLoading(false);
    setInstructions('');
  };

  const handleGenerate = () => {
    setSearch(query);

    // Save user input to localStorage
    const userData = {
      query,
      instructions: userInstructions,
      temperature: userTemperature,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  };

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
        <title>OwnChatBotGPT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>{userInputTitle}</a>
        </h1>

        <p className={styles.description}></p>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.animation}`}>
            <div className={styles.codeWindow}>
              <h3>User Input:</h3>
              <div className={styles.customCodeEditor}>
                <textarea
                  spellCheck="false"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ask any Question..."
                  className={`${styles.codeTextarea} ${styles.answerTextarea}`}
                />
              </div>
              <input
                type="file"
                onChange={(event) => handleFileUpload(event)}
                className={styles.fileInput}
              />
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
                <SyntaxHighlighter language="javascript" style={solarizedlight}>
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
