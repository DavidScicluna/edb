import { ReactElement } from 'react';

import {
	useTheme,
	Accordions,
	AccordionsQuickToggles,
	AccordionsPanel,
	DummyAccordions,
	DummyAccordionsPanel,
	DummyAccordion,
	DummyAccordionHeader,
	Button,
	Badge,
	BadgeLabel,
	Icon,
	utils
} from '@davidscicluna/component-library';

import { range } from 'lodash';

import { PersonCredit, PersonDepartment } from '../../../../types';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions
} from '../../../../../../../../../components';
import { getEmptySubtitle } from '../../../../../../../../../components/QueryEmpty/common/utils';
import { usePersonContext } from '../../../../common/hooks';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import CreditsTabAccordion from '../CreditsTabAccordion';

import { CreditsTabMediaTypeTabProps, CreditsTabMediaTypeTabQuery } from './types';

const { getColor } = utils;

const CreditsTabMediaTypeTab = <
	Cast extends PersonCredit,
	Crew extends PersonCredit,
	Query extends CreditsTabMediaTypeTabQuery
>(
	props: CreditsTabMediaTypeTabProps<Cast, Crew, Query>
): ReactElement => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { personQuery } = usePersonContext();

	const { data: person } = personQuery || {};
	const { name } = person || {};

	const { mediaType, departments = [], query } = props;
	const { isFetching, isLoading, isError, isSuccess, error, refetch } = query || {};

	return !(isFetching || isLoading) && isError ? (
		<QueryEmpty
			color={color}
			colorMode={colorMode}
			borderWidth='2px'
			borderStyle='dashed'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='lg'
		>
			<QueryEmptyStack>
				<QueryEmptyIcon
					renderIcon={(props) => (
						<Icon
							{...props}
							width={theme.fontSizes['6xl']}
							height={theme.fontSizes['6xl']}
							fontSize={theme.fontSizes['6xl']}
							icon='error_outline'
						/>
					)}
					p={2}
				/>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{getEmptySubtitle({
							type: 'error',
							label: name
								? `"${name}" ${formatMediaTypeLabel({ type: 'multiple', mediaType })} Credits`
								: `${formatMediaTypeLabel({ type: 'multiple', mediaType })} Credits`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>

				{error &&
					error.response?.data &&
					error.response.data.status_code &&
					error.response.data.status_message && (
						<Badge color={color} colorMode={colorMode}>
							<BadgeLabel>{`(${error.response.data.status_code}) ${error.response.data.status_message}`}</BadgeLabel>
						</Badge>
					)}

				{refetch && (
					<QueryEmptyActions
						renderActions={(props) => (
							<Button {...props} onClick={refetch}>
								Try Again
							</Button>
						)}
					/>
				)}
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetching || isLoading) && isSuccess && departments.length === 0 ? (
		<QueryEmpty
			color={color}
			colorMode={colorMode}
			borderWidth='2px'
			borderStyle='dashed'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='lg'
		>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{getEmptySubtitle({
							type: 'empty',
							label: name
								? `"${name}" ${formatMediaTypeLabel({ type: 'multiple', mediaType })} Credits`
								: `${formatMediaTypeLabel({ type: 'multiple', mediaType })} Credits`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetching || isLoading) && isSuccess && departments.length > 0 ? (
		<Accordions<PersonDepartment<Cast, Crew>>
			color='gray'
			colorMode={colorMode}
			accordions={departments.map((department) => {
				return {
					id: department.id,
					title: department.label,
					data: { ...department }
				};
			})}
			spacing={2}
		>
			{departments.length > 5 && (
				<AccordionsQuickToggles<PersonDepartment<Cast, Crew>> color={color} size='xs' spacing={1} />
			)}
			<AccordionsPanel<PersonDepartment<Cast, Crew>>>
				{({ accordions, opened = [] }) =>
					accordions.map(({ id, title, data: department }) => (
						<CreditsTabAccordion
							key={id}
							mediaType={mediaType}
							id={id}
							title={title}
							credits={department.credits}
							isOpen={opened.some((accordion: unknown) => accordion === id)}
						/>
					))
				}
			</AccordionsPanel>
		</Accordions>
	) : (
		<DummyAccordions color='gray' colorMode={colorMode} accordions={range(4)} spacing={2}>
			<DummyAccordionsPanel>
				{({ accordions }) =>
					accordions.map((dummy) => (
						<DummyAccordion key={dummy} p={2}>
							<DummyAccordionHeader />
						</DummyAccordion>
					))
				}
			</DummyAccordionsPanel>
		</DummyAccordions>
	);
};

export default CreditsTabMediaTypeTab;
