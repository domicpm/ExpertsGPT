// Home.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './styles/Home.module.css';
import Link from 'next/link';
import LoadingSpinner from './loadingSpinner';

export default function Home() {
  const [data, setData] = useState({ text: '', imageUrl: '' });
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [useDefaultPrompt, setUseDefaultPrompt] = useState(false); // New state for the checkbox

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
    setData({ text: '', imageUrl: '' });
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
    setInstructions(''); // Clear instructions when the checkbox is clicked
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/openai_websiteGenerator`, {
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

          // Log the received data and image URL
          console.log('Received Data from OpenAI:', resultData);
          const imageUrl = resultData.imageUrl;
          console.log('Image URL:', imageUrl);

          // Verify if the imageUrl is not empty and contains a valid URL
          if (imageUrl) {
            // Update the state or directly set the image source for rendering
            setData(resultData);
          } else {
            console.error('Invalid or empty image URL received from OpenAI API.');
            // Handle the case where the image URL is not valid
          }

          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data from OpenAI:', error);
          setIsLoading(false);
        }
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
        <title>CodeReviewGPT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>ImageGeneratorGPT</a>
        </h1>

        <p className={styles.description}>Built with NextJS & GPT-4 API for Bayernwerk</p>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.animation}`}>
            <div className={styles.codeWindow}>
              <h3>Your Picture Describtion:</h3>
              <textarea
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Describe your picture here..."
                className={`${styles.instructionsTextarea} ${styles.answerTextarea}`}
                disabled={useDefaultPrompt} // Disable textarea if using default prompt
              />
              <input
                type="file"
                onChange={(event) => handleFileUpload(event)}
                className={styles.fileInput}
              />
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
                <SyntaxHighlighter language="javascript" style={solarizedlight}>
                  {data.text}
                </SyntaxHighlighter>
                {data.imageUrl && (
                  <img src={data.imageUrl} alt="Generated Image" className={styles.generatedImage} />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
