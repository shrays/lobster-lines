import React from 'react';
import styles from '../styles/Legend.module.css';

const MapLegend: React.FC = () => {
  return (
    <div className={styles.legend}>
      <div className={styles.legendItem}><span className={styles.legendKey} style={{ backgroundColor: 'green' }}></span> Open</div>
      <div className={styles.legendItem}><span className={styles.legendKey} style={{ backgroundColor: 'black' }}></span> Closed</div>
      <div className={styles.legendItem}><span className={styles.legendKey} style={{ backgroundColor: 'orange' }}></span> Short Wait</div>
      <div className={styles.legendItem}><span className={styles.legendKey} style={{ backgroundColor: 'red' }}></span> Long Wait</div>
    </div>
  );
};

export default MapLegend;
