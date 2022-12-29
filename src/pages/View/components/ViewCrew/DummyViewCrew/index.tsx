import { FC } from 'react';

import {
	DummyAccordions,
	DummyAccordionsPanel,
	DummyAccordion,
	DummyAccordionHeader
} from '@davidscicluna/component-library';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';

const DummyViewCrew: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<DummyAccordions color='gray' colorMode={colorMode} accordions={range(8)} spacing={2}>
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

export default DummyViewCrew;
