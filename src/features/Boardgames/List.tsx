import { useEffect, useState } from 'react';
import { MdAddCircle } from "react-icons/md";
import { Link } from 'react-router';
import { useAuth } from '../Auth/Auth';
import type { Boardgame } from './types';
import { Card } from './Card';

import styles from './Boardgames.module.css';

export function List() {
  const [games, setGames] = useState<Boardgame[] | null>(null);
  const {user} = useAuth();

  useEffect(() => {
    void fetch('/api/boardgames?_limit=10&_page=29')
      .then((res) => res.json())
      .then(setGames);
  }, []);

  return (
    <section className={styles.list}>
      <h1>Boardgames</h1>
      {!games && <strong>Loading ...</strong>}
      {games?.map((game) => <Card key={game.id} game={game} />)}
      {user && <Link to="add" className={styles.addBtn}><MdAddCircle /></Link>}
    </section>
  );
}
