// createChatbot.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './styles/Home.module.css';

import Link from 'next/link';
import LoadingSpinner from './loadingSpinner';


// ... (other imports and code)

export default function Home() {
    const [data, setData] = useState({ text: '' });
    const [query, setQuery] = useState('');
    const [instructions, setInstructions] = useState('');
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [useDefaultPrompt, setUseDefaultPrompt] = useState(false);
    const [selectedModel, setSelectedModel] = useState('gpt-4');
    const [showTooltip, setShowTooltip] = useState(false);
    const [temperature, setTemperature] = useState(0.5);
  
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            <a>Build your own ChatBot:</a>
          </h1>
          <div className={styles.grid}>
            <div className={`${styles.card} ${styles.animation}`}>
              <div className={styles.ownChatBotWindow}>
                <h3>Name:</h3>
                <textarea
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="The name of your ChatBot..."
                  className={`${styles.codeChatbotArea} ${styles.answerTextarea}`}
                  disabled={useDefaultPrompt}
                />
                <h3>Instructions:</h3>
                <textarea
                  value={instructions}  
                  onChange={(event) => setInstructions(event.target.value)} 
                  placeholder="e.g. you are an expert on code documentation..."
                  className={`${styles.codeChatbotArea} ${styles.answerTextarea}`}
                  disabled={useDefaultPrompt}
                />
              </div>
              {/* Temperature Slider Above Dropdown */}
              <div className={styles.temperatureSliderContainerAbove}>
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
              <div className={styles.buttonContainer}>
                <Link href="ownChatBot" passHref>
                  <div className={styles.button}>Create ChatBot</div>
                </Link>        
              </div>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>           
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
  


  