/* eslint-disable no-shadow */
import React, { useContext, createContext, useState } from 'react';

import { Time, getTimeFromNow } from 'src/util/date';

type Color =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'gray'
  | 'black';

type TrackInfo = {
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
  bgColor: 'red',
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

  const saveInfo = (info: TrackInfo) => {
    const { title, bgColor, expireDuration, expireUnit } = info;
    setTitle(title);
    setBgColor(bgColor);
    setExpireDate(getTimeFromNow(expireDuration, expireUnit));
  };

  const retrieveInfo = (id: string) => console.log(id);

  return (
    <TrackContext.Provider
      value={{ title, bgColor, expireDate, saveInfo, retrieveInfo }}
    >
      {children}
    </TrackContext.Provider>
  );
}
