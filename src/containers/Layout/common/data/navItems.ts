import {
  Home as HomeIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Film as FilmIcon,
  Tv as TVIcon,
  Users as UsersIcon
} from 'react-feather';

import { NavItem } from '../../../../components/NavItem/types';

const navItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
    icon: HomeIcon
  },
  {
    label: 'Search',
    path: '/search',
    icon: SearchIcon
  },
  {
    label: 'Trending',
    path: '/trending',
    icon: TrendingUpIcon,
    children: [
      { label: 'Trending Movies', path: '/trending/movie', renderChild: false },
      { label: 'Trending TV', path: '/trending/tv', renderChild: false },
      { label: 'Trending People', path: '/trending/person', renderChild: false }
    ]
  },
  {
    label: 'Movies',
    path: '/movies',
    icon: FilmIcon,
    children: [
      { label: 'Popular', path: '/movies/popular', renderChild: true },
      { label: 'Upcoming', path: '/movies/upcoming', renderChild: true },
      { label: 'Now Playing', path: '/movies/now-playing', renderChild: true },
      { label: 'Top Rated', path: '/movies/top-rated', renderChild: true }
    ]
  },
  {
    label: 'TV Shows',
    path: '/tv',
    icon: TVIcon,
    children: [
      { label: 'Popular', path: '/tv/popular', renderChild: true },
      { label: 'Airing Today', path: '/tv/airing-today', renderChild: true },
      { label: 'On at the moment', path: '/tv/on-tv', renderChild: true },
      { label: 'Top Rated', path: '/tv/top-rated', renderChild: true }
    ]
  },
  {
    label: 'People',
    path: '/people',
    icon: UsersIcon
  }
  // {
  //   label: 'Companies',
  //   path: '/companies',
  //   iconActive: SearchTwoToneIcon,
  //   icon: SearchOutlinedIcon
  // },
  // {
  //   label: 'Networks',
  //   path: '/networks',
  //   iconActive: SearchTwoToneIcon,
  //   icon: SearchOutlinedIcon
  // }
];

export default navItems;
