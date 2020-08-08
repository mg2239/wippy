import React, { useContext, createContext, useState, useEffect } from 'react';

import { getTimeFromNow, nowString } from './index.util';
import { Color, Time } from 'src/types';
import { firestore } from 'src/util/firebase';

type TrackData = {
  title: string;
  theme: Color;
  expiresAt: string;
};

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
      .then((snapshot) => {
        const data: TrackData = snapshot.data() as any;
        const {
          title: newTitle,
          theme: newTheme,
          expiresAt: newExpiresAt,
        } = data;
        setTitle(newTitle);
        setTheme(newTheme);
        setExpiresAt(newExpiresAt);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    if (id.length) retrieveInfo();
  }, [id]);

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
      }}
    >
      {children}
    </TrackContext.Provider>
  );
}
