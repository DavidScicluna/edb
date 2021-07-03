import React, { ReactElement } from 'react';

// import { useTheme, useColorMode, HStack, Text, Slider, SliderTrack, SliderFilledTrack } from '@chakra-ui/react';
// import { UseFormReturn, Controller } from 'react-hook-form';

// import { Theme } from '../../../../../../../theme/types';
// import { Form } from '../../types';
// import Container from '../Container';
// import Dot from './components/Dot';

// const FontSize = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
const FontSize = (): ReactElement => {
  // const theme = useTheme<Theme>();
  // const { colorMode } = useColorMode();

  // const color = form.watch('color');

  return (
    // <Controller
    //   control={form.control}
    //   name='fontSize'
    //   render={({ field: { value } }) => (
    //     <Container title='Font-Size'>
    //       <HStack width='100%' spacing={2}>
    //         <Text
    //           align='center'
    //           color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
    //           fontSize='sm'
    //           fontWeight='medium'>
    //           Aa
    //         </Text>
    //         <Slider
    //           defaultValue={value === 'sm' ? 0 : value === 'base' ? 50 : 100}
    //           min={0}
    //           max={100}
    //           step={50}
    //           onChange={(value) =>
    //             form.setValue('fontSize', value === 0 ? 'sm' : value === 50 ? 'base' : 'lg', { shouldDirty: true })
    //           }
    //           sx={{
    //             zIndex: 900,
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'space-between',
    //             transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
    //           }}>
    //           <SliderTrack
    //             sx={{
    //               backgroundColor: `${color}.100`,
    //               transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
    //             }}>
    //             <SliderFilledTrack
    //               sx={{
    //                 backgroundColor: `${color}.400`,
    //                 transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`
    //               }}
    //             />
    //           </SliderTrack>
    //           <Dot
    //             label='Small'
    //             color={color}
    //             isActive={value === 'sm'}
    //             isSmaller={value === 'base' || value === 'lg'}
    //           />
    //           <Dot label='Default' color={color} isActive={value === 'base'} isSmaller={value === 'lg'} />
    //           <Dot label='Large' color={color} isActive={value === 'lg'} />
    //         </Slider>
    //         <Text
    //           align='center'
    //           color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
    //           fontSize='xl'
    //           fontWeight='medium'>
    //           Aa
    //         </Text>
    //       </HStack>
    //     </Container>
    //   )}
    // />
    <h1>FontSize</h1>
  );
};

export default FontSize;
