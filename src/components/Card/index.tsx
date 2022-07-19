import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  description: string;
  image: string;
  points: number;
}

export default function Card({ description, image, title, points }: CardProps) {
  return (
    <li className={styles.card}>
      <h1>{title}</h1>
      <img src={image} alt="imagem do card" />
      <p>{description}</p>
      <strong>{points} pontos</strong>
    </li>
  );
}
