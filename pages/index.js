// Dashboard.js
import React from 'react';
import Link from 'next/link';
import styles from './styles/Home.Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h2>Choose an Application:</h2>
      <div className={styles.buttonContainer}>
        <Link href="unittest">
          <div className={styles.button}>UnitTestGPT</div>
        </Link>
        <Link href="mockdatagenerator">
          <div className={styles.button}>MockDataGPT</div>
        </Link>
        <Link href="commitmessagegenerator">
          <div className={styles.button}>CommitMessageGPT</div>
        </Link>
        <Link href="codereview">
          <div className={styles.button}>CodeReviewGPT</div>
        </Link>
        <Link href="chatbot">
          <div className={styles.button}>ChatbotGPT</div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
