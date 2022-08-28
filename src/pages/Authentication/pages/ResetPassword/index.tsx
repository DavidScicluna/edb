import { FC } from 'react';

import { useLocation } from 'react-router';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, Center, Container } from '@chakra-ui/react';

import qs from 'query-string';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useElementSize } from 'usehooks-ts';

import Illustration from '../../components/Illustration';

import { Form as FormType } from './types';
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

	const location = useLocation();

	const [illustrationRef, { width: illustrationWidth }] = useElementSize();

	const form = useForm<FormType>({
		defaultValues: { ...defaultValues, ...qs.parse(location.search) },
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
			>
				<Container maxWidth='container.lg' centerContent px={[2, 2, 3, 3]} py={[3, 3, 4, 4]}>
					<Form form={form} onSubmit={handleChangePassword} />
				</Container>
			</Center>

			{isLg && <Illustration ref={illustrationRef} position='fixed' top={0} right={0} />}
		</Center>
	);
};

export default ForgotPassword;
