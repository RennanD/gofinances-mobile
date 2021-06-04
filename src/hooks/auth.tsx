import React, { createContext, useContext, useState } from 'react';

import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState({} as User);

  async function handleSignInWithGoogle() {
    try {
      const response = await Google.logInAsync({
        iosClientId:
          '368450672599-d26m1ag21t1icj35jcsf1u8mckdnof4j.apps.googleusercontent.com',
        androidClientId:
          '368450672599-suiorhlefqjtp1fpr28q564s83sdokpq.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (response.type === 'success') {
        const userLogged = {
          id: String(response.user.id),
          email: response.user.email!,
          name: response.user.name!,
          photo: response.user.photoUrl!,
        };

        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged),
        );

        setUser(userLogged);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle: handleSignInWithGoogle,
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
