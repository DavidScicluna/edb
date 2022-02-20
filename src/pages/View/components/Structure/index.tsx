import { ReactElement } from 'react';

import { useMediaQuery, VStack, HStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { StructureProps } from './types';

import Divider from '../../../../components/Divider';
import Page from '../../../../containers/Page';

const Structure = ({ children }: StructureProps): ReactElement => {
	const [isMd] = useMediaQuery('(max-width: 960px)');

	const [ref, { height }] = useElementSize();

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
							justifyContent={!isMd ? 'space-between' : 'flex-start'}
							divider={<Divider orientation='vertical' height={`${height}px`} />}
							spacing={2}
						>
							{children.tabList}

							{children.socials ? <Center ref={ref}>{!isMd ? children.socials : null}</Center> : null}
						</HStack>

						<VStack alignItems='stretch' justifyContent='stretch' spacing={2}>
							{children.tabPanels}
						</VStack>
					</VStack>
				)
			}}
		</Page>
	);
};

export default Structure;
