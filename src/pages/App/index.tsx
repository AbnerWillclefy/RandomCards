import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import { useUser } from "../../contexts/UserContext";

import styles from "./styles.module.scss";

function App() {
  const { setUsername, username } = useUser();

  const navigate = useNavigate();

  function handleSeeUserCards() {
    navigate("/mycards");
  }

  return (
    <section className={styles.container}>
      <h1>Antes de tudo, digite seu nome!</h1>

      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <Button disabled={!username} onClick={handleSeeUserCards}>
        Ver cartas
      </Button>
    </section>
  );
}

export default App;
