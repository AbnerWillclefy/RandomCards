import { BrowserRouter } from "react-router-dom";

import { UserContextProvider } from "../contexts/UserContext";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <BrowserRouter>
      <UserContextProvider>{children}</UserContextProvider>
    </BrowserRouter>
  );
}
