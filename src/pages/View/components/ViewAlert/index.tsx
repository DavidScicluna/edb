import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst, Box, Collapse } from '@chakra-ui/react';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Transition } from 'framer-motion';

import { useLayoutContext } from '../../../../containers/Layout/common/hooks';
import { Alert } from '../../../../components';
import { formatDate, formatMediaTypeLabel } from '../../../../common/utils';

import { ViewAlertProps } from './types';

dayjs.extend(relativeTime);

const { getTransitionDuration, getTransitionConfig } = utils;

const ViewAlert: FC<ViewAlertProps> = (props) => {
	const theme = useTheme();
	const { spacing } = useLayoutContext();

	const { mediaType, title, date } = props;

	const [isVisible, setIsVisible] = useBoolean(true);

	const fromNow = useConst<string>(dayjs(date).fromNow());

	const duration = useConst<number>(getTransitionDuration({ theme, duration: 'slow' }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), duration });

	return (
		<Collapse in={isVisible} transition={{ enter: { ...config }, exit: { ...config } }} style={{ width: '100%' }}>
			<Box width='100%' p={spacing}>
				<Alert
					duration={null}
					title={`Coming Soon ${fromNow}!`}
					description={`${
						title ? title : formatMediaTypeLabel({ type: 'single', mediaType })
					} will be released ${fromNow} on ${formatDate({
						date: date
					})}`}
					status='info'
					onClose={() => setIsVisible.off()}
				/>
			</Box>
		</Collapse>
	);
};

export default ViewAlert;
