import { ReactElement } from 'react';

import { Accordion as CUIAccordion, VStack } from '@chakra-ui/react';
import _ from 'lodash';

import AccordionItem from './components/AccordionItem';
import DummyAccordionItem from './components/DummyAccordionItem';
import { AccordionProps } from './types';

const Accordion = (props: AccordionProps): ReactElement => {
  const { departments, expanded, isLoading = false, onChange } = props;

  return (
    <>
      {!isLoading ? (
        <CUIAccordion
          width='100%'
          allowMultiple
          allowToggle
          defaultIndex={[]}
          index={expanded}
          onChange={(indexes) => onChange(indexes)}
        >
          <VStack width='100%' spacing={2}>
            {departments.map((department, index) => (
              <AccordionItem
                key={`${department.label.toLowerCase()}-accordion`}
                {...department}
                isExpanded={Array.isArray(expanded) ? expanded.includes(index) : false}
              />
            ))}
          </VStack>
        </CUIAccordion>
      ) : (
        _.range(0, 5).map((_dummy, index) => <DummyAccordionItem key={index} />)
      )}
    </>
  );
};

export default Accordion;
