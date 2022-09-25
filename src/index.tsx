// import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import Providers from './containers/Providers';

// Importing Main Fonts (Pacifico)
import '@fontsource/pacifico/400.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLElement);

root.render(
	// <StrictMode>
	// </StrictMode>
	<Providers />
);
