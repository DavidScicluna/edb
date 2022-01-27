import { KeyboardEvent, ChangeEvent } from 'react';

import { Collection as MovieCollection } from '../../common/types/movie';

export type InputKeyboardEvent = KeyboardEvent<HTMLInputElement>;

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export type Collection = Omit<MovieCollection, 'parts'>;
