import React, { createContext, useContext, useState } from "react";

interface UserContextValue {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext({} as UserContextValue);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ setUsername, username }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
