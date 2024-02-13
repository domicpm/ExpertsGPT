// Dashboard.js
import React from 'react';
import Link from 'next/link';
import styles from './styles/Home.Dashboard.module.css';
const Dashboard = () => {
  return (
    <div>
      <div className={styles.container}>
        <img
          src="/Bayernwerk_Logo.svg.png"
          alt="Bayernwerk Logo"
          className={styles.logo}
          width={800}
          height={150}
        />
        <div className={styles.categoryContainer}>
          {/* Software Development Tools */}
          <div className={styles.category}>
            <h3>Testing Tools</h3>
            <Link href="unittest" passHref>
              <div className={styles.button}>UnitTestGPT</div>
            </Link>
            <Link href="mockdatagenerator">
              <div className={styles.button}>MockDataGPT</div>
            </Link>
          </div>
          {/* Chatbot Management */}
          <div className={styles.category}>
            <h3>Development Tools</h3>
            
            <Link href="angularupdate">
              <div className={styles.button}>AngularUpdateGPT</div>
            </Link>
            <Link href="commitmessage">
              <div className={styles.button}>CommitMessageGPT</div>
            </Link>
            <Link href="codedebugging">
              <div className={styles.button}>CodeDebuggingGPT</div>
            </Link>
            <Link href="codegenerator">
              <div className={styles.button}>CodeGeneratorGPT</div>
            </Link>
          </div>
           {/* Chatbot and Generators */}
 <div className={styles.category}>
            <h3>Chatbots & Generators</h3>
            <Link href="chatbot">
              <div className={styles.button}>OnboardingGPT</div>
            </Link>
            
            <Link href="websiteGenerator">
              <div className={styles.button}>ImageGeneratorGPT</div>
            </Link>
          </div>
          <div className={styles.category}>
            <h3>Chatbots</h3>
            <Link href="createChatbot">
              <div className={styles.button}>Create ChatBot</div>
              {isBotCreated ? (
  <Link href="ownChatBot">
    <div className={styles.button}>{name}</div>
  </Link>
) : null}

            </Link>       
          </div>
          
        </div>
      </div>
    </div>
  );
};
let isBotCreated;
let name;
export default Dashboard;
export function setIsBotCreated(chatbotName){
        isBotCreated = true;
        name = chatbotName;
}