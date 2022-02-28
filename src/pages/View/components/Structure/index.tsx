import { ReactElement } from 'react';

import { VStack, HStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { StructureProps } from './types';

import Divider from '../../../../components/Divider';
import Page from '../../../../containers/Page';

const Structure = ({ children }: StructureProps): ReactElement => {
	const [ref, { width, height }] = useElementSize();

	return (
		<Page title={children.title}>
			{{
				actions: children.actions,
				body: (
					<VStack
						width='100%'
						alignItems='stretch'
						justifyContent='stretch'
						divider={<Divider my={2} />}
						spacing={2}
						p={2}
					>
						<HStack
							width='100%'
							justifyContent={children.socials ? 'space-between' : 'flex-start'}
							divider={
								children.socials ? <Divider orientation='vertical' height={`${height}px`} /> : undefined
							}
							spacing={2}
						>
							<Center width={`calc(100% - ${children.socials ? width + 34 : 0}px)`}>
								{children.tabList}
							</Center>

							{children.socials ? <Center ref={ref}>{children.socials}</Center> : null}
						</HStack>

						<VStack alignItems='stretch' justifyContent='stretch' spacing={0}>
							{children.tabPanels}
						</VStack>
					</VStack>
				)
			}}
		</Page>
	);
};

export default Structure;
