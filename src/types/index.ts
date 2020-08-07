// Common enums or types.

export enum Color {
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  PURPLE = 'purple',
  PINK = 'pink',
  GRAY = 'gray',
  BLACK = 'black',
}

export const toColor = (color: string): Color => (Color as any)[color];

export enum Time {
  MINUTE = 'minute',
  HOUR = 'hour',
  DAY = 'day',
}

export const toTime = (time: string): Time => (Time as any)[time];
