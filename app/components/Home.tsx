import React from 'react';
import { Link } from 'react-router-dom';
import { DateRangePicker } from '@blueprintjs/datetime';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <DateRangePicker />
      <br />
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
