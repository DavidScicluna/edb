import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Wrap, WrapItem, HStack, Box } from '@chakra-ui/react';
import _ from 'lodash';
import { Controller } from 'react-hook-form';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../common/hooks';
import { Certification as CertificationType } from '../../../../common/types';
import Button from '../../../../components/Clickable/Button';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import Panel from '../../../Panel';
import Certification from './components/Certification';
import { CertificationsProps } from './types';

const Certifications = (props: CertificationsProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const [ref, { height }] = useElementSize();

  const { certifications, form, isLoading = true, isError = false } = props;

  const handleCertificationClick = (certification: CertificationType): void => {
    const certifications = form.getValues().certifications;

    if (certifications.some((activeCertification) => activeCertification === certification.certification)) {
      form.setValue(
        'certifications',
        certifications.filter((activeCertification) => activeCertification !== certification.certification),
        { shouldDirty: true }
      );
    } else {
      form.setValue('certifications', [...certifications, certification.certification], { shouldDirty: true });
    }
  };

  const handleAllClick = (): void => {
    if (form.getValues().certifications.length === (certifications || []).length) {
      form.setValue('certifications', [], { shouldDirty: true });
    } else {
      form.setValue('certifications', [...(certifications || []).map((certification) => certification.certification)], {
        shouldDirty: true
      });
    }
  };

  const handleAllLabel = (): string => {
    return `${form.getValues().certifications.length === (certifications || []).length ? 'Remove' : 'Select'} All`;
  };

  return (
    <Controller
      control={form.control}
      name='certifications'
      render={({ field: { value } }) => (
        <Panel isFullWidth>
          {{
            header: {
              title: 'Certifications',
              actions: (
                <HStack
                  ref={ref}
                  divider={
                    <Box
                      width='2px'
                      height={height}
                      backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
                    />
                  }
                >
                  <Button
                    color={color}
                    isDisabled={
                      isLoading || isError || value.length === 0 || value.length === (certifications?.length || 0)
                    }
                    onClick={() => form.setValue('certifications', [], { shouldDirty: true })}
                    size='sm'
                    variant='text'
                  >
                    Clear
                  </Button>
                  <Button
                    color={color}
                    isDisabled={isLoading || isError}
                    onClick={() => handleAllClick()}
                    size='sm'
                    variant='text'
                  >
                    {handleAllLabel()}
                  </Button>
                </HStack>
              )
            },
            body: (
              <Wrap width='100%' spacing={isSm ? 1 : 1.5}>
                {!isLoading && isError ? (
                  <WrapItem width='100%'>
                    <Error
                      hasIllustration={false}
                      label='Oh no! Something went wrong 😭'
                      description='Failed to fetch certifications!'
                      size='sm'
                      variant='transparent'
                    />
                  </WrapItem>
                ) : !isLoading && _.isNil(certifications) ? (
                  <WrapItem width='100%'>
                    <Empty
                      hasIllustration={false}
                      label='Oh no!'
                      description='Failed to find any certifications!'
                      size='sm'
                      variant='transparent'
                    />
                  </WrapItem>
                ) : !isLoading && !_.isNil(certifications) ? (
                  certifications.map((certification) => (
                    <WrapItem key={certification.certification}>
                      <Certification
                        {...certification}
                        isActive={value.some(
                          (activeCertification) => activeCertification === certification.certification
                        )}
                        isLoading={false}
                        onClick={handleCertificationClick}
                      />
                    </WrapItem>
                  ))
                ) : (
                  _.range(0, 5).map((_dummy, index) => (
                    <WrapItem key={index}>
                      <Certification isLoading />
                    </WrapItem>
                  ))
                )}
              </Wrap>
            )
          }}
        </Panel>
      )}
    />
  );
};

export default Certifications;
