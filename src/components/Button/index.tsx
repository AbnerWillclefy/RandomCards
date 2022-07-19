import Spinner from "../Spinner";

import styles from "./styles.module.scss";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({ isLoading, children, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={isLoading ? styles.loading : styles.loaded}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
