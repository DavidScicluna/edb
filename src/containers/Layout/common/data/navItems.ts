import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import ExploreTwoToneIcon from '@material-ui/icons/ExploreTwoTone';
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
    label: 'Discover',
    path: '/discover',
    iconActive: ExploreTwoToneIcon,
    icon: ExploreOutlinedIcon
  },
  {
    label: 'Trending',
    path: '/trending',
    iconActive: WhatshotTwoToneIcon,
    icon: WhatshotOutlinedIcon
  },
  {
    label: 'Movies',
    path: '/movies',
    iconActive: TheatersTwoToneIcon,
    icon: TheatersOutlinedIcon,
    children: [
      { label: 'Popular Movies', path: '/movies/popular' },
      { label: 'Movies Now Playing', path: '/movies/now-playing' },
      { label: 'Upcoming Movies', path: '/movies/upcoming' },
      { label: 'Top Rated Movies', path: '/movies/top-rated' }
    ]
  },
  {
    label: 'TV Shows',
    path: '/tv',
    iconActive: TvTwoToneIcon,
    icon: TvOutlinedIcon,
    children: [
      { label: 'Popular TV', path: '/tv/popular' },
      { label: 'Shows Airing Today', path: '/tv/airing-today' },
      { label: 'On TV', path: '/tv/on-tv' },
      { label: 'Top Rated TV', path: '/tv/top-rated' }
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
