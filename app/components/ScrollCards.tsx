'use client'

import React from 'react';
import styles from '../styles/ScrollCards.module.css';

interface Summary {
  totalStores: number;
  storesOpen: number;
  storesWithWaitlist: number;
  averageWaitTime: number;
  storesTemporarilyClosed: number;
}
interface HorizontalScrollCardsProps {
  summaryData: Summary;
}

const HorizontalScrollCards: React.FC<HorizontalScrollCardsProps> = ({ summaryData }) => {
  const items = [
    [`${summaryData.totalStores}`, 'Stores'],
    [`${summaryData.storesOpen}`, 'Stores Open'],
    [`${summaryData.storesWithWaitlist}`, 'Waitlists'],
    [`${summaryData.averageWaitTime}`, 'Average Wait'],
    [`${summaryData.storesTemporarilyClosed}`, 'Stores Temporarily Closed']
  ];

  return (
    <div className={styles.container}>
      {items.map(([stat, description], index) => (
        <div className={styles.card} key={index}>
          <strong>{stat}</strong> {description}
        </div>
      ))}
    </div>
  );
};

export default HorizontalScrollCards;
