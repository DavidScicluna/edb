import { FC } from 'react';

import { useFormState, useWatch } from 'react-hook-form';
import { isEqual } from 'lodash';

import { UserGenres } from '../../../../../../components';
import EditUserStructure from '../EditUserStructure';
import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';
import { useSelector } from '../../../../../../common/hooks';

import { GenresTabProps } from './types';

const GenresTab: FC<GenresTabProps> = (props) => {
	const {
		info: { prefers }
	} = useSelector((state) => state.users.data.activeUser.data);

	const { form, color = defaultColor, colorMode = defaultColorMode, onSubmit } = props;
	const { control, reset, handleSubmit } = form;

	const watchMovieGenres = useWatch({ control, name: 'movie' });
	const watchTVShowGenres = useWatch({ control, name: 'tv' });

	const { isDirty } = useFormState({ control });

	// usePrompt({
	// 	title: 'Unsubmitted Changes!',
	// 	subtitle:
	// 		'Are you sure you want to cancel editing the prefered Genres? Once you close the page you will not be able to retrieve the changed data!',
	// 	when: isDirty
	// });

	const handleClear = (): void => {
		reset({ ...prefers });
	};

	return (
		<EditUserStructure
			color={color}
			colorMode={colorMode}
			title='Favored Genres'
			subtitle='Select your most favorite Movie & TV Show genres.'
			isSubmitDisabled={!isDirty}
			onReset={
				!isEqual(watchMovieGenres, prefers.movie) || !isEqual(watchTVShowGenres, prefers.tv)
					? handleClear
					: undefined
			}
			onSubmit={handleSubmit(onSubmit)}
		>
			<UserGenres form={form} color={color} colorMode={colorMode} />
		</EditUserStructure>
	);
};

export default GenresTab;
