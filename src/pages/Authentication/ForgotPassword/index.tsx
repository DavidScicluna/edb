import { FC } from 'react';

import { useParams } from 'react-router';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, Center } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useElementSize } from 'usehooks-ts';

import Illustration from '../components/Illustration';

import { Form as FormType, Params } from './types';
import { schema } from './validation';
import Form from './components/Form';

export const defaultValues: FormType = {
	username: '',
	password: '',
	newPassword: '',
	confirmNewPassword: ''
};

const ForgotPassword: FC = () => {
	const theme = useTheme();
	const [isLg] = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

	const { username } = useParams<Params>();

	const [illustrationRef, { width: illustrationWidth }] = useElementSize();

	const form = useForm<FormType>({
		defaultValues: { ...defaultValues, username },
		resolver: yupResolver(schema)
	});

	const handleChangePassword = (values: FormType): void => {
		console.log(values);
	};

	return (
		<Center width='100%' minHeight='100vh' position='relative' overflowX='hidden' overflowY='auto'>
			<Center
				width={isLg ? `calc(100% - ${illustrationWidth}px)` : '100%'}
				minHeight='100vh'
				position='absolute'
				top={0}
				left={0}
				alignItems='center'
				justifyContent='center'
				p={[2, 2, 3, 3]}
			>
				<Form form={form} onSubmit={handleChangePassword} />
			</Center>

			{isLg && <Illustration ref={illustrationRef} position='fixed' top={0} right={0} />}
		</Center>
	);
};

export default ForgotPassword;
