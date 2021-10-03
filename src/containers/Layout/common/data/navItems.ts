import {
  HomeTwoTone as HomeTwoToneIcon,
  HomeOutlined as HomeOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PeopleAltTwoTone as PeopleAltTwoToneIcon,
  SearchOutlined as SearchOutlinedIcon,
  SearchTwoTone as SearchTwoToneIcon,
  TheatersOutlined as TheatersOutlinedIcon,
  TheatersTwoTone as TheatersTwoToneIcon,
  TvOutlined as TvOutlinedIcon,
  TvTwoTone as TvTwoToneIcon,
  WhatshotOutlined as WhatshotOutlinedIcon,
  WhatshotTwoTone as WhatshotTwoToneIcon
} from '@material-ui/icons';

import { NavItem } from '../../../../components/NavItem/types';

const navItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
    iconActive: HomeTwoToneIcon,
    icon: HomeOutlinedIcon
  },
  {
    label: 'Search',
    path: '/search',
    iconActive: SearchTwoToneIcon,
    icon: SearchOutlinedIcon
  },
  {
    label: 'Trending',
    path: '/trending',
    iconActive: WhatshotTwoToneIcon,
    icon: WhatshotOutlinedIcon,
    children: [
      { label: 'Trending Movies', path: '/trending/movie', renderChild: false },
      { label: 'Trending TV', path: '/trending/tv', renderChild: false },
      { label: 'Trending People', path: '/trending/person', renderChild: false }
    ]
  },
  {
    label: 'Movies',
    path: '/movies',
    iconActive: TheatersTwoToneIcon,
    icon: TheatersOutlinedIcon,
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
    iconActive: TvTwoToneIcon,
    icon: TvOutlinedIcon,
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
    iconActive: PeopleAltTwoToneIcon,
    icon: PeopleAltOutlinedIcon
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
