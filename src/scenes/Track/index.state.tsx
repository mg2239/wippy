/* eslint-disable no-shadow */
import React, { useContext, createContext, useState } from 'react';

import { Color, Time } from 'src/types';
import { firestore } from 'src/util/firebase';
import { getTimeFromNow, nowString } from 'src/util/time';

type TrackInfo = {
  id: string;
  title: string;
  bgColor: Color;
  expireDuration: number; // The numerical part of the time
  expireUnit: Time; // The unit of time (day, hour, minute)
};

type TrackState = {
  title: string;
  bgColor: Color;
  expireDate: string;
  saveInfo: (info: TrackInfo) => void;
  retrieveInfo: (id: string) => void;
};

const initialState: TrackState = {
  title: '',
  bgColor: Color.RED,
  expireDate: '',
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
  const [bgColor, setBgColor] = useState(initialState.bgColor);
  const [expireDate, setExpireDate] = useState(initialState.expireDate);
  const tracksRef = firestore.collection('tracks');

  const saveInfo = (info: TrackInfo) => {
    const { id, title, bgColor, expireDuration, expireUnit } = info;
    setTitle(title);
    setBgColor(bgColor);
    const newExpireDate = getTimeFromNow(expireDuration, expireUnit);
    setExpireDate(newExpireDate);
    tracksRef.doc(id).set({
      title,
      created: nowString(),
      expires: newExpireDate,
      theme: bgColor,
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
      value={{ title, bgColor, expireDate, saveInfo, retrieveInfo }}
    >
      {children}
    </TrackContext.Provider>
  );
}
