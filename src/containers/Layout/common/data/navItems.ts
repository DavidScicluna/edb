import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import TheatersOutlinedIcon from '@material-ui/icons/TheatersOutlined';
import TheatersTwoToneIcon from '@material-ui/icons/TheatersTwoTone';
import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
import TvTwoToneIcon from '@material-ui/icons/TvTwoTone';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';

import { NavItem } from '../../components/NavItems/types';

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
      { label: 'Popular Movies', path: '/movies/popular', renderChild: true },
      { label: 'Movies Now Playing', path: '/movies/now-playing', renderChild: true },
      { label: 'Upcoming Movies', path: '/movies/upcoming', renderChild: true },
      { label: 'Top Rated Movies', path: '/movies/top-rated', renderChild: true }
    ]
  },
  {
    label: 'TV Shows',
    path: '/tv',
    iconActive: TvTwoToneIcon,
    icon: TvOutlinedIcon,
    children: [
      { label: 'Popular TV', path: '/tv/popular', renderChild: true },
      { label: 'Shows Airing Today', path: '/tv/airing-today', renderChild: true },
      { label: 'On TV', path: '/tv/on-tv', renderChild: true },
      { label: 'Top Rated TV', path: '/tv/top-rated', renderChild: true }
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
