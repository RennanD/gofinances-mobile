import React, { createContext, useContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const user = {
    id: '123245',
    name: 'Rennan Douglas',
    email: 'rennan@email.com',
  };

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used in AuthProvider');
  }

  return context;
}
