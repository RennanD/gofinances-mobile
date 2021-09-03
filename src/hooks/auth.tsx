import React, { createContext, useContext, useEffect, useState } from 'react';

// import * as GoogleAuth from 'expo-google-app-auth';
// import * as AppleAuth from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthSesstion from 'expo-auth-session';

import googleConfig from '../config/google.auth';

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type AuthContextData = {
  user: User;
  userStoragedLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type GoogleResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState({} as User);
  const [userStoragedLoading, setUserStoragedLoading] = useState(true);

  async function handleSignInWithGoogle() {
    try {
      const {
        AUTH_URL,
        CLIENT_ID,
        REDIRECT_URI,
        RESPONSE_TYPE,
        SCOPE,
        USER_INFO_URL,
      } = googleConfig;

      const authUrl = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSesstion.startAsync({
        authUrl,
      })) as GoogleResponse;

      if (type === 'success') {
        const response = await fetch(
          `${USER_INFO_URL}?alt=json&access_token=${params.access_token}`,
        );

        const userInfo = await response.json();

        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify({
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            photo: userInfo.picture,
          }),
        );
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          photo: userInfo.picture,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function handleSignInWithApple() {
    // try {
    //   const credential = await AppleAuth.signInAsync({
    //     requestedScopes: [
    //       AppleAuth.AppleAuthenticationScope.FULL_NAME,
    //       AppleAuth.AppleAuthenticationScope.EMAIL,
    //     ],
    //   });
    //   if (credential) {
    //     const name = credential.fullName!.givenName!;
    //     const photo = `https://ui-avatars.com/api/?name=${name}?length=1`;
    //     const userLogged = {
    //       id: String(credential.user),
    //       email: credential.email!,
    //       name,
    //       photo,
    //     };
    //     await AsyncStorage.setItem(
    //       '@gofinances:user',
    //       JSON.stringify(userLogged),
    //     );
    //     setUser(userLogged);
    //   }
    // } catch (error) {
    //   throw new Error(error);
    // }
  }

  async function handleSignOut() {
    setUser({} as User);
    await AsyncStorage.removeItem('@gofinances:user');
  }

  useEffect(() => {
    async function loadLoggedUser() {
      const response = await AsyncStorage.getItem('@gofinances:user');
      const loggedUser = response ? JSON.parse(response) : ({} as User);

      setUser(loggedUser);
      setUserStoragedLoading(false);
    }
    loadLoggedUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userStoragedLoading,
        signInWithGoogle: handleSignInWithGoogle,
        signInWithApple: handleSignInWithApple,
        signOut: handleSignOut,
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
