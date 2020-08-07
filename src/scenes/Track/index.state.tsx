/* eslint-disable no-shadow */
import React, { useContext, createContext, useState } from 'react';

import { Color, Time } from 'src/types';
import { firestore } from 'src/util/firebase';
import { getTimeFromNow, nowString } from 'src/util/time';

type TrackState = {
  title: string;
  theme: Color;
  expiresAt: string;
  setTitle: (title: string) => void;
  setTheme: (theme: Color) => void;
  saveInfo: (id: string, expireDuration: number, expireUnit: Time) => void;
  retrieveInfo: (id: string) => void;
};

const initialState: TrackState = {
  title: 'untitled',
  theme: Color.RED,
  expiresAt: '',
  setTitle: () => {},
  setTheme: () => {},
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
  const [title, setTitle] = useState(initialState.title);
  const [theme, setTheme] = useState(Color.RED);
  const [expiresAt, setExpiresAt] = useState(initialState.expiresAt);
  const tracksRef = firestore.collection('tracks');

  const saveInfo = (id: string, expireDuration: number, expireUnit: Time) => {
    const date = getTimeFromNow(expireDuration, expireUnit);
    setExpiresAt(date);
    tracksRef.doc(id).set({
      title,
      createdAt: nowString(),
      expiresAt: date,
      theme,
    });
  };

  const retrieveInfo = (id: string) =>
    tracksRef
      .doc(id)
      .get()
      .then((snapshot) => console.log(snapshot.data()))
      .catch((err) => console.log(err));

  return (
    <TrackContext.Provider
      value={{
        title,
        theme,
        expiresAt,
        setTitle,
        setTheme,
        saveInfo,
        retrieveInfo,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
}
