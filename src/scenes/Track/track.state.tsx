import React, { useContext, createContext, useState, useEffect } from 'react';

import { getTimeFromNow, nowString, isAfterNow } from './track.util';
import { useMP3 } from 'src/context/mp3';
import { Color, Time } from 'src/types';
import { firestore, storage } from 'src/util/firebase';

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
  loading: boolean;
  exists: boolean;
  setId: (id: string) => void;
  setTitle: (title: string) => void;
  setTheme: (theme: Color) => void;
  saveInfo: (expireDuration: number, expireUnit: Time) => void;
};

const initialState: TrackState = {
  id: '',
  title: 'untitled',
  theme: 'red',
  expiresAt: '',
  loading: true,
  exists: true,
  setId: () => {},
  setTitle: () => {},
  setTheme: () => {},
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
  const [id, setId] = useState(initialState.id);
  const [title, setTitle] = useState(initialState.title);
  const [theme, setTheme] = useState(initialState.theme);
  const [expiresAt, setExpiresAt] = useState(initialState.expiresAt);
  const [loading, setLoading] = useState(initialState.loading);
  const [exists, setExists] = useState(initialState.exists);
  const { isNew, setMP3 } = useMP3();

  const tracksRef = firestore.collection('tracks');

  const getMP3 = () => {
    storage
      .ref(`${id}.mp3`)
      .getDownloadURL()
      .then((url) => {
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => setMP3(blob as File))
          .catch(console.error);
      })
      .catch(() => setExists(false));
  };

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

  const deleteTrack = () => {
    tracksRef
      .doc(id)
      .delete()
      .then(() => {
        storage.ref(`${id}.mp3`).delete().catch(console.error);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (id) {
      if (!isNew) {
        tracksRef
          .doc(id)
          .get()
          .then((snapshot) => {
            const {
              title: newTitle,
              theme: newTheme,
              expiresAt: newExpiresAt,
            }: TrackData = snapshot.data() as any;
            const trackExists = isAfterNow(newExpiresAt);
            setExists(trackExists);
            if (trackExists) {
              setTitle(newTitle);
              setTheme(newTheme);
              setExpiresAt(newExpiresAt);
              getMP3();
            } else {
              deleteTrack();
            }
            setLoading(false);
          })
          .catch(() => {
            setExists(false);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [id]);

  return (
    <TrackContext.Provider
      value={{
        id,
        title,
        theme,
        expiresAt,
        loading,
        exists,
        setId,
        setTitle,
        setTheme,
        saveInfo,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
}
