import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';

import { Time } from 'src/types';

dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);

const now = () => dayjs();

export const nowString = () => now().toISOString();

// For displaying time until expire
export const getDifference = (time1: string, time2: string) =>
  dayjs.duration(dayjs(time1).diff(time2)).humanize(false);

// For calculating what date a track expires
export const getTimeFromNow = (duration: number, unit: Time) =>
  now().add(duration, unit).toISOString();

// For determining if a track has expired
export const isBeforeNow = (time: string) => dayjs(time).isBefore(now());

// For displaying time unit choices when inputting information
export const timeToPlural = (time: Time) => `${time}s`;
