export type Gender = 0 | 1 | 2 | 3;

import { PartialMovie } from './movie';
import { PartialTV } from './tv';

type Person = {
  known_for_department: string;
  id: number;
  name: string;
  gender: Gender;
  popularity: number;
  profile_path: string | null;
  adult: boolean;
};

export type PartialPerson = {
  known_for: (PartialMovie & PartialTV)[];
} & Person;

export type FullPerson = {
  birthday: string | null;
  deathday: string | null;
  also_known_as: string[];
  biography: string;
  place_of_birth: string | null;
  imdb_id: string;
  homepage: string | null;
} & Person;
