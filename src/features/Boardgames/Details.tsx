import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type { Boardgame } from "./types";
import { Link } from "react-router";

export function Details() {
  const [game, setGame] = useState<Boardgame | null>(null)
  const { id } = useParams();

  useEffect(() => {
    void fetch(`/api/boardgames/${id}`).then((res) => res.json()).then(setGame);
  }, [id]);

  if(!game) {
    return <strong>Loading ...</strong>;
  }

  return (
    <>
      <h1>{game.name}</h1>
      <img src={game.image} alt={`Poster for "${game.name}"`} width={800} />
      <Link to={`/boardgames/${Number(id) - 1}`}>Prev</Link>
      <Link to={`/boardgames/${Number(id) + 1}`}>Next</Link>
    </>
  )
}
