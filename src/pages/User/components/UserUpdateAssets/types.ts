import { ChangeEvent as CE } from 'react';

import { ColorMode } from '@chakra-ui/react';

import { UseFormReturn } from 'react-hook-form';

import { UserInfo, UserThemeColor } from '../../../../store/slices/Users/types';

export type FileInputRef = HTMLInputElement | null;

export type ChangeEvent = CE<HTMLInputElement>;

export type UserUpdateAssetsForm = Pick<UserInfo, 'avatar_path' | 'background_path'>;

export type UserUpdateAssetsProps = {
	color: UserThemeColor;
	colorMode: ColorMode;
	form: UseFormReturn<UserUpdateAssetsForm>;
	username: string;
	firstName: string;
	lastName: string;
};
