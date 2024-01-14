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
  const [instructions, setInstructions] = useState('');
  const [useDefaultPrompt, setUseDefaultPrompt] = useState(false); // New state for the checkbox

  const handleRefresh = () => {
    setData({ text: '' });
    setQuery('');
    setSearch('');
    setIsLoading(false);
    setInstructions('');
  };
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai_chatBot`, {
          body: JSON.stringify({
            name: search,
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
    fetchData();
  }, [search, instructions]);

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
        <title>ChatBotGPT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>ChatBotGPT</a>
        </h1>
        <p className={styles.description}>Built with NextJS & GPT-4 API for Bayernwerk</p>
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.animation}`}>
            <div className={styles.codeWindow}>
              <h3>Your Question:</h3>
              <textarea
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter a abbrevation in the Bayernwerk context"
                className={`${styles.codeTextarea} ${styles.answerTextarea}`}
                disabled={useDefaultPrompt} // Disable textarea if using default prompt
              />       
            </div>
            <div className={`${styles.card}`}>
              <div className={styles.buttonContainer}>
                <button type="button" onClick={() => setSearch(query)}>
                  Ask
                </button>
                <button type="button" onClick={handleRefresh} className={styles.refreshButton}>
                  Refresh
                </button>
              </div>
            </div>
            <h4>Answer:</h4>
            {isLoading ? (
       <LoadingSpinner />            ) : (
              <>
                <SyntaxHighlighter language="javascript" style={solarizedlight}>
                  {data.text}
                </SyntaxHighlighter>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
