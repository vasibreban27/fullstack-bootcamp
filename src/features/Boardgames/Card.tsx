import { Link } from "react-router"
import type { Boardgame } from "./types"


import styles from './Boardgames.module.css';

type Props = {
  game: Boardgame
}

export function Card({game}: Props) {
  return (
    <article className={styles.card}>
      <Link to={String(game.id)}>
        <img src={game.thumbnail} alt={`Thumbnail for "${game.name}"`} />
        <h2>{game.name}</h2>
      </Link>
    </article>
  )
}
