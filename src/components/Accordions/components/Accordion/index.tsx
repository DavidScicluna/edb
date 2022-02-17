
import { ReactElement } from 'react';
import useInView from 'react-cool-inview';

import { useTheme, useColorMode, VStack, VisuallyHidden, Collapse } from '@chakra-ui/react';

import _ from 'lodash';

import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import useStyles from './styles';
import { AccordionProps } from './types';

import { Theme } from '../../../../theme/types';
import Divider from '../../../Divider';

const Accordion = <D,>(props: AccordionProps<D>): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { observe: ref, inView } = useInView<HTMLDivElement>({
    threshold: [0.2, 0.4, 0.6, 0.8, 1],
    unobserveOnEnter: true
  });

  const {
    children,
    footer,
    id,
    title,
    subtitle,
    total,
    color,
    isOpen: isOpenProp = false,
    isDisabled = false,
    isLoading = true,
    onToggle
  } = props;

  const isOpen = isLoading || isDisabled ? false : isOpenProp;

  const style = useStyles(theme, isOpen);

  return (
    <VStack
      ref={ref}
      aria-disabled={isDisabled}
      width='100%'
      spacing={0}
      sx={{ ..._.merge(style.accordion, style[colorMode]) }}
      _disabled={{ ..._.merge(style.disabled.accordion, style.disabled[colorMode]) }}
    >
      {id ? (
        <VisuallyHidden>
          <span id={id.toLowerCase()} />
        </VisuallyHidden>
      ) : null}

      <Header
        title={title}
        subtitle={subtitle}
        total={total}
        color={color}
        inView={inView}
        isOpen={isOpen}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onToggle={onToggle}
      />

      {children ? (
        <Collapse in={isOpen && inView} unmountOnExit style={{ width: '100%' }}>
          <VStack width='100%' spacing={0} px={2}>
            <Divider />

            <VStack width='100%' divider={<Divider />} spacing={0}>
              <Body>{children}</Body>

              {footer ? <Footer footer={footer} /> : null}
            </VStack>
          </VStack>
        </Collapse>
      ) : null}
    </VStack>
  );
};

export default Accordion;
