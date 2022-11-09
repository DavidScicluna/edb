import { ColorMode } from '@chakra-ui/react';

import { UseFormReturn } from 'react-hook-form';

import { UserInfoGenres, UserThemeColor } from '../../../store/slices/Users/types';

export type UserGenresForm = UserInfoGenres;

export type UserGenresProps = {
	color?: UserThemeColor;
	colorMode?: ColorMode;
	form: UseFormReturn<UserGenresForm>;
};
