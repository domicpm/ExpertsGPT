import Head from "next/head";
import styles from "./styles/Home.module.css"; // Pfade sollten relativ zur aktuellen Datei sein
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({ text: '' });
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/chatbot_openai`, {
          body: JSON.stringify({
            name: search
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [search]);

  return (
    
    <div className={styles.container}>
      <Head>
        <title>Bayernwerk ChatBot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>ChatBot / Bayernwerk abbrevations</a>
        </h1>

        <p className={styles.description}>Built with NextJS & GPT-4 API for Bayernwerk</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Enter a abbrevation in the Bayernwerk context:</h3>
            <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
            style={{ width: "100%", height: "50px", textAlign: "left", verticalAlign: "top"}}
            />
            <div className={styles.button}>
              <button
                type="button"
                onClick={() => setSearch(query)}
              >
                Generate
              </button>
            </div>
            <h4>Answer:</h4>
            {isLoading ? (
              <div>Loading ...</div>
            ) : (
              <span>{data.text}</span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
