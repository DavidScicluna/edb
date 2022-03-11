import { ReactElement } from 'react';
import CountUp from 'react-countup';

import { Center, HStack, Fade } from '@chakra-ui/react';

import compact from 'lodash/compact';
import isNil from 'lodash/isNil';
import { useElementSize } from 'usehooks-ts';

import { MediaTypesHeaderProps } from './types';

import { useSelector } from '../../../../common/hooks';
import Badge from '../../../../components/Badge';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import Divider from '../../../../components/Divider';
import Icon from '../../../../components/Icon';
import TabList from '../../../../components/Tabs/components/TabList';
import { defaultUser, getUser } from '../../../../store/slices/Users';

const defaultMediaTypes: MediaTypesHeaderProps['mediaTypes'] = ['movie', 'tv', 'person', 'company', 'collection'];

const defaultTotal: MediaTypesHeaderProps['total'] = { movie: 0, tv: 0, person: 0, company: 0, collection: 0 };

const MediaTypesHeader = (props: MediaTypesHeaderProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [headerRef, { height: heightHeight }] = useElementSize();
	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const { activeTab, mediaTypes = defaultMediaTypes, total = defaultTotal, renderActions } = props;

	return (
		<HStack
			ref={headerRef}
			width='100%'
			minHeight='43px' // Size of Actions since they might be un-rendered
			maxHeight='43px' // Size of Actions since they might be un-rendered
			spacing={2}
			divider={
				!isNil(activeTab) || renderActions ? (
					<Divider orientation='vertical' height={`${heightHeight}px`} />
				) : undefined
			}
		>
			<Center width={`calc(100% - ${!isNil(activeTab) || renderActions ? actionsWidth + 34 : 0}px)`}>
				<TabList color={color}>
					{compact([
						mediaTypes.includes('movie')
							? {
									label: 'Movies',
									isDisabled: total.movie === 0,
									renderLeft: ({ isSelected, fontSize }) => (
										<Icon
											icon='theaters'
											type={isSelected ? 'filled' : 'outlined'}
											fontSize={fontSize}
										/>
									),
									renderRight:
										(total.movie || 0) > 0
											? ({ isSelected, size }) => (
													<Fade in unmountOnExit>
														<Badge
															color={isSelected ? color : 'gray'}
															isLight={!isSelected}
															size={size}
														>
															<CountUp duration={1} end={total.movie || 0} />
														</Badge>
													</Fade>
											  )
											: undefined
							  }
							: undefined,
						mediaTypes.includes('tv')
							? {
									label: 'TV Shows',
									isDisabled: total.tv === 0,
									renderLeft: ({ isSelected, fontSize }) => (
										<Icon icon='tv' type={isSelected ? 'filled' : 'outlined'} fontSize={fontSize} />
									),
									renderRight:
										(total.tv || 0) > 0
											? ({ isSelected, size }) => (
													<Fade in unmountOnExit>
														<Badge
															color={isSelected ? color : 'gray'}
															isLight={!isSelected}
															size={size}
														>
															<CountUp duration={1} end={total.tv || 0} />
														</Badge>
													</Fade>
											  )
											: undefined
							  }
							: undefined,
						mediaTypes.includes('person')
							? {
									label: 'People',
									isDisabled: total.person === 0,
									renderLeft: ({ isSelected, fontSize }) => (
										<Icon
											icon='people_alt'
											type={isSelected ? 'filled' : 'outlined'}
											fontSize={fontSize}
										/>
									),
									renderRight:
										(total.person || 0) > 0
											? ({ isSelected, size }) => (
													<Fade in unmountOnExit>
														<Badge
															color={isSelected ? color : 'gray'}
															isLight={!isSelected}
															size={size}
														>
															<CountUp duration={1} end={total.person || 0} />
														</Badge>
													</Fade>
											  )
											: undefined
							  }
							: undefined,
						mediaTypes.includes('company')
							? {
									label: 'Companies',
									isDisabled: total.company === 0,
									renderLeft: ({ isSelected, fontSize }) => (
										<Icon
											icon='business'
											type={isSelected ? 'filled' : 'outlined'}
											fontSize={fontSize}
										/>
									),
									renderRight:
										(total.company || 0) > 0
											? ({ isSelected, size }) => (
													<Fade in unmountOnExit>
														<Badge
															color={isSelected ? color : 'gray'}
															isLight={!isSelected}
															size={size}
														>
															<CountUp duration={1} end={total.company || 0} />
														</Badge>
													</Fade>
											  )
											: undefined
							  }
							: undefined,
						mediaTypes.includes('collection')
							? {
									label: 'Collections',
									isDisabled: total.collection === 0,
									renderLeft: ({ isSelected, fontSize }) => (
										<Icon
											icon='library_books'
											type={isSelected ? 'filled' : 'outlined'}
											fontSize={fontSize}
										/>
									),
									renderRight:
										(total.collection || 0) > 0
											? ({ isSelected, size }) => (
													<Fade in unmountOnExit>
														<Badge
															color={isSelected ? color : 'gray'}
															isLight={!isSelected}
															size={size}
														>
															<CountUp duration={1} end={total.collection || 0} />
														</Badge>
													</Fade>
											  )
											: undefined
							  }
							: undefined
					])}
				</TabList>
			</Center>

			{renderActions ? (
				<HStack ref={actionsRef} spacing={2}>
					<Fade in={!isNil(activeTab)} unmountOnExit>
						<DisplayMode />
					</Fade>
					{renderActions ? renderActions() : null}
				</HStack>
			) : (
				<Fade in={!isNil(activeTab)} unmountOnExit>
					<DisplayMode ref={actionsRef} />
				</Fade>
			)}
		</HStack>
	);
};

export default MediaTypesHeader;
