import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import { useUser } from "../../contexts/UserContext";

import { getAnime } from "../../services/anime";
import { AnimeData } from "../../types";

import styles from "./styles.module.scss";

interface CardsData extends AnimeData {
  points: number;
}

export default function MyCards() {
  const [cards, setCards] = useState<CardsData[]>([]);
  const [pulledCardsTimes, setPulledCardsTimes] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNewCard, setIsLoadingNewCard] = useState(false);

  const { username } = useUser();

  const canPullAnotherCard = pulledCardsTimes < 3;

  const loadAnime = useCallback(async () => {
    const data = await getAnime();

    const newCard = {
      ...data,
      points: Number((Math.random() * 10).toFixed(2)),
    };

    setCards((prevState) => [...prevState, newCard]);
  }, []);

  async function handlePullCard() {
    if (!canPullAnotherCard) {
      return;
    }

    setIsLoadingNewCard(true);
    await loadAnime();
    setIsLoadingNewCard(false);

    setPulledCardsTimes((prevState) => prevState + 1);
  }

  function randomSortCards() {
    const currentCardsArray = [...cards];

    const randomSortedCardsArray = currentCardsArray
      .map((value) => ({
        value,
        sortValue: Math.random(),
      }))
      .sort((a, b) => a.sortValue - b.sortValue)
      .map(({ value }) => value);

    setCards(randomSortedCardsArray);
  }

  useEffect(() => {
    Promise.all(Array.from(new Array(5), () => loadAnime())).finally(() =>
      setIsLoading(false)
    );
  }, [loadAnime]);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div>
          <Button
            onClick={handlePullCard}
            disabled={!canPullAnotherCard || isLoadingNewCard}
          >
            Nova carta
          </Button>
          <Button onClick={randomSortCards}>Embaralhar cartas</Button>
        </div>
        <h1>{username}</h1>
      </header>

      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <ul className={styles.cardsContainer}>
          {cards?.map((card) => (
            <Card
              description={card?.synopsis}
              image={card?.images?.webp?.image_url}
              title={card?.title}
              points={card?.points}
              key={card?.mal_id}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
