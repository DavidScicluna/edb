import React, { ReactElement, useState } from 'react';

import { ExpandedIndex, useColorMode, VStack, Collapse } from '@chakra-ui/react';

import Card from '../../../../components/Card';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import Accordion from './components/Accordion';
import Header from './components/Header';
import QuickToggles from './components/QuickToggles';
import { FilmographyProps } from './types';

const Filmography = (props: FilmographyProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { departments, name, isSuccess = false, isLoading = false, isError = false } = props;

  const [expandedAccordions, setExpandedAccordions] = useState<ExpandedIndex>([]);

  /**
   * This method will either expand/collapse all accordions at once
   */
  const handleToggleAccordions = (): void => {
    const expanded: number = Array.isArray(expandedAccordions) ? expandedAccordions.length : 0;

    setExpandedAccordions(expanded === departments.length ? [] : departments.map((_department, index) => index));
  };

  /**
   * This method will check if all the accordions are either expanded or collapsed
   *
   * @returns Boolean - If expanded or collapsed
   */
  const handleCheckisAccordionsExpanded = (): boolean => {
    const expanded: number = Array.isArray(expandedAccordions) ? expandedAccordions.length : 0;

    return expanded === departments.length;
  };

  /**
   * This method will either expand/collapse the accordion passed as param
   *
   * @param department String - The accordion clicked
   */
  const handleToggleAccordion = (department: string): void => {
    const expanded: number[] = Array.isArray(expandedAccordions) ? expandedAccordions : [];
    const index: number = departments.findIndex((paramDepartment) => paramDepartment.label === department);

    if (!expanded.includes(index)) {
      setExpandedAccordions([...expanded, index]);
    }
  };

  return (
    <Card colorMode={colorMode} isFullWidth variant='outlined' px={2} pt={1.25} pb={2}>
      <VStack width='100%' spacing={1.5}>
        <Header
          isAccordionsExpanded={handleCheckisAccordionsExpanded()}
          isLoading={isLoading}
          isError={isError}
          onToggleAccordions={handleToggleAccordions}
        />

        <Collapse in={!isError} unmountOnExit style={{ width: '100%' }}>
          <QuickToggles
            departments={departments.map((department) => department.label)}
            isLoading={isLoading}
            onToggleAccordion={handleToggleAccordion}
          />
        </Collapse>

        {isError ? (
          <Error
            label='Oh no! Something went wrong'
            description={`Failed to fetch ${name ? `"${name}"` : ''} Filmography credits list!`}
            variant='transparent'
          />
        ) : isSuccess && departments && departments.length === 0 ? (
          <Empty label={`${name ? `"${name}"` : ''} has no credits`} variant='transparent' />
        ) : (
          <Accordion
            departments={departments}
            expanded={expandedAccordions}
            isLoading={isLoading}
            onChange={(indexes: ExpandedIndex) => setExpandedAccordions(indexes)}
          />
        )}
      </VStack>
    </Card>
  );
};

export default Filmography;
