/* eslint-disable no-shadow */
import React, { useContext, createContext, useState } from 'react';

import { getTimeFromNow, nowString } from './index.util';
import { Color, Time } from 'src/types';
import { firestore } from 'src/util/firebase';

type TrackState = {
  id: string;
  title: string;
  theme: Color;
  expiresAt: string;
  setId: (id: string) => void;
  setTitle: (title: string) => void;
  setTheme: (theme: Color) => void;
  setExpiresAt: (expiresAt: string) => void;
  saveInfo: (expireDuration: number, expireUnit: Time) => void;
  retrieveInfo: (id: string) => void;
};

const initialState: TrackState = {
  id: '',
  title: 'untitled',
  theme: 'red',
  expiresAt: '',
  setId: () => {},
  setTitle: () => {},
  setTheme: () => {},
  setExpiresAt: () => {},
  saveInfo: () => {},
  retrieveInfo: () => {},
};

const TrackContext = createContext(initialState);

export function useTrack() {
  return useContext(TrackContext);
}

type ProviderProps = {
  children: JSX.Element;
};

export function TrackProvider({ children }: ProviderProps) {
  const [id, setId] = useState('');
  const [title, setTitle] = useState(initialState.title);
  const [theme, setTheme] = useState(initialState.theme);
  const [expiresAt, setExpiresAt] = useState(initialState.expiresAt);

  const tracksRef = firestore.collection('tracks');

  const saveInfo = (expireDuration: number, expireUnit: Time) => {
    const date = getTimeFromNow(expireDuration, expireUnit);
    setExpiresAt(date);
    tracksRef.doc(id).set({
      title,
      createdAt: nowString(),
      expiresAt: date,
      theme,
    });
  };

  const retrieveInfo = () =>
    tracksRef
      .doc(id)
      .get()
      .then((snapshot) => console.log(snapshot.data()))
      .catch((err) => console.log(err));

  return (
    <TrackContext.Provider
      value={{
        id,
        title,
        theme,
        expiresAt,
        setId,
        setTitle,
        setTheme,
        setExpiresAt,
        saveInfo,
        retrieveInfo,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
}
