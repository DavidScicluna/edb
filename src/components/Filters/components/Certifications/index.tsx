import React, { ReactElement } from 'react';

import { useMediaQuery, Wrap, WrapItem } from '@chakra-ui/react';
import _ from 'lodash';
import { Controller } from 'react-hook-form';

import { useSelector } from '../../../../common/hooks';
import { Certification as CertificationType } from '../../../../common/types';
import Button from '../../../../components/Clickable/Button';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import Panel from '../../../Panel';
import Certification from './components/Certification';
import { CertificationsProps } from './types';

const Certifications = (props: CertificationsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { certifications, form, isLoading = true, isError = false } = props;

  const handleCertificationClick = (certification: CertificationType): void => {
    const certifications = form.getValues().certifications;

    if (
      certifications.some((activeCertification) => activeCertification.certification === certification.certification)
    ) {
      form.setValue(
        'certifications',
        certifications.filter(
          (activeCertification) => activeCertification.certification !== certification.certification
        ),
        { shouldDirty: true }
      );
    } else {
      form.setValue('certifications', [...certifications, certification], { shouldDirty: true });
    }
  };

  const handleAllClick = (): void => {
    if (form.getValues().certifications.length === (certifications || []).length) {
      form.setValue('certifications', [], { shouldDirty: true });
    } else {
      form.setValue('certifications', [...(certifications || [])], { shouldDirty: true });
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
              actions: (
                <Button
                  color={color}
                  isDisabled={isLoading || isError}
                  onClick={() => handleAllClick()}
                  size='sm'
                  variant='text'
                >
                  {handleAllLabel()}
                </Button>
              ),
              title: 'Certification'
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
                          (activeCertification) => activeCertification.certification === certification.certification
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
