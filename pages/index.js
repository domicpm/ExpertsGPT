// Dashboard.js
import React from 'react';
import Link from 'next/link';
import styles from './styles/Home.Dashboard.module.css';

const Dashboard = () => {

  return (
    <div>
      <div className={styles.container}>
        <img
          src="/Bayernwerk_Logo.svg.png" // Replace with the actual path to your image
          alt="Bayernwerk Logo"
          className={styles.logo}
          width={800} // Adjust the width as needed
          height={150} // Adjust the height as needed
        />
        <h2>Choose an Application:</h2>
        <div className={styles.buttonContainer}>
          <Link href="unittest" passHref>
            <div className={styles.button}>UnitTestGPT</div>
          </Link>
          <Link href="mockdatagenerator">
            <div className={styles.button}>MockDataGPT</div>
          </Link>
          <Link href="commitmessage">
            <div className={styles.button}>CommitMessageGPT</div>
          </Link>
          <Link href="codereview">
            <div className={styles.button}>CodeReviewGPT</div>
          </Link>
          <Link href="chatbot">
            <div className={styles.button}>ChatbotGPT</div>
          </Link>
          <Link href="angularupdate">
            <div className={styles.button}>AngularUpdateGPT</div>
          </Link>
          <Link href="codegenerator">
            <div className={styles.button}>CodeGeneratorGPT</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
