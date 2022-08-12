import { FC } from 'react';

import { Form as DSUIForm, Card, CardBody, CardFooter, Divider } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';

import Body from './components/Body';
import Footer from './components/Footer';
import { FormProps } from './types';

const Form: FC<FormProps> = ({ form, onSubmit }) => {
	const { colorMode } = useUserTheme();

	const { handleSubmit } = form;

	return (
		<DSUIForm width='100%' onSubmit={handleSubmit((values) => onSubmit({ ...values }))}>
			<Card colorMode={colorMode} isFullWidth p={[2, 3, 4, 5]}>
				<VStack width='100%' divider={<Divider />} spacing={[1, 1.5, 2, 2.5]}>
					<CardBody>
						<Body form={form} />
					</CardBody>
					<CardFooter>
						<Footer form={form} />
					</CardFooter>
				</VStack>
			</Card>
		</DSUIForm>
	);
};

export default Form;
