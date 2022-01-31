import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';

export const AuthContext = createContext({
  user: null,
  login: (user) => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    //document.cookie = 'username=' + user;
    setCookie(null, 'username', user);
    setUser(user);
  };

  const context = { user, login };

  useEffect(() => {
    //const cookieUser = getCookie('username', document.cookie);
    const { username } = parseCookies();
    if (username) {
      setUser(username);
    }
  }, []);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export function getCookie(cname, fromWhere) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(fromWhere);
  //let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
