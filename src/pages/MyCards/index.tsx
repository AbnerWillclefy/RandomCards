import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Card from "../../components/Card";
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

  const [isLoadingNewCard, setIsLoadingNewCard] = useState(false);
  const [isLoadingCardList, setIsLoadingCardList] = useState(true);

  const navigate = useNavigate();

  const { username } = useUser();

  const canPullAnotherCard = pulledCardsTimes < 3;

  const totalPoints = useMemo(() => {
    return cards
      .reduce((acc, card) => {
        return acc + card.points;
      }, 0)
      .toFixed(2);
  }, [cards]);

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

  function handleRandomSortCards() {
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
    if (!username) {
      navigate("/");
    }

    Promise.all(Array.from(new Array(5), () => loadAnime())).then(() =>
      setIsLoadingCardList(false)
    );
  }, [loadAnime, navigate, username]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div>
          <Button
            onClick={handlePullCard}
            disabled={!canPullAnotherCard}
            isLoading={isLoadingNewCard}
          >
            Nova carta
          </Button>
          <Button onClick={handleRandomSortCards}>Embaralhar cartas</Button>
        </div>
        <h1>{username}</h1>
      </header>

      <section className={styles.content}>
        {!isLoadingCardList && (
          <h1 className={styles.points}>{totalPoints} pontos</h1>
        )}

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
      </section>
    </main>
  );
}
