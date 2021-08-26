export type Department = {
  id: number;
  name: string;
  value: string;
};

const departments: Department[] = [
  {
    id: 1,
    name: 'Actor',
    value: 'Acting'
  },
  {
    id: 2,
    name: 'Director',
    value: 'Directing'
  },
  {
    id: 3,
    name: 'Producer',
    value: 'Production'
  },
  {
    id: 4,
    name: 'Writer',
    value: 'Writing'
  },
  {
    id: 5,
    name: 'Cinematography',
    value: 'Camera'
  }
];

export default departments;
