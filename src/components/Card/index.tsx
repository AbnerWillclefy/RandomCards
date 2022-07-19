import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  description: string;
  image: string;
  points: number;
}

export default function Card({ description, image, title, points }: CardProps) {
  const cardDescription =
    description ??
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sapien leo, egestas eget congue at, iaculis vitae odio. Etiam non sollicitudin libero.";

  return (
    <li className={styles.card}>
      <h1>{title}</h1>
      <img src={image} alt="imagem do card" />
      <p>{cardDescription}</p>
      <strong>{points} pontos</strong>
    </li>
  );
}
