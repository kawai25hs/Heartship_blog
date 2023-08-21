import * as React from "react";

const authContext = React.createContext("");

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [username, setUsername] = React.useState("");

  return {
    authed,
    login(name) {
      return new Promise((res) => {
        setAuthed(true);
        setUsername(name);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
    username,

  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}