import { KeyboardEvent, ChangeEvent } from 'react';

export type InputKeyboardEvent = KeyboardEvent<HTMLInputElement>;

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export type TotalResults = {
  movies?: number;
  tv?: number;
  people?: number;
};

export type Keyword = {
  id: number;
  name: string;
};
