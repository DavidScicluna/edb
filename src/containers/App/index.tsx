// import React, { ReactElement, useState, useEffect } from 'react';
import React, { ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
// import _ from 'lodash';
import { QueryClient, QueryClientProvider } from 'react-query';

// import useSelector from '../../common/hooks/useSelectorTyped';
import Router from '../../routes';
import theme from '../../theme';
// import typography from '../../theme/foundations/typography';
// import { Theme } from '../../theme/types';

const queryClient = new QueryClient();

const App = (): ReactElement => {
  // const fontSize = useSelector((state) => state.user.ui.theme.fontSize);

  // const [theme, setTheme] = useState<Theme>(CUITheme);

  // useEffect(() => {
  //   if (fontSize) {
  //     setTheme(_.merge(theme, { fontSizes: typography.fontSizes[fontSize] }));
  //   }
  // }, [fontSize]);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
