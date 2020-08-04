import React, { useContext, createContext, useState } from 'react';

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
  desc: string;
  bgColor: Color;
  expireTime: number;
  expireType: 'minutes' | 'hours' | 'days';
};

const initialInfo: TrackInfo = {
  title: '',
  desc: '',
  bgColor: 'red',
  expireTime: 60,
  expireType: 'minutes',
};

type TrackState = {
  setInfo: (info: TrackInfo) => void;
} & TrackInfo;

const initialState: TrackState = {
  ...initialInfo,
  setInfo: () => {},
};

const TrackContext = createContext(initialState);

export function useTrack() {
  return useContext(TrackContext);
}

type ProviderProps = {
  children: JSX.Element;
};

export function TrackProvider({ children }: ProviderProps) {
  const [info, setInfo] = useState(initialInfo);

  return (
    <TrackContext.Provider value={{ ...info, setInfo }}>
      {children}
    </TrackContext.Provider>
  );
}
