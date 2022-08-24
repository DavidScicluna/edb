// import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import Providers from './containers/Providers';

// Importing Main Fonts (Work Sans & Roboto)
import '@fontsource/work-sans/100.css';
import '@fontsource/work-sans/100-italic.css';
import '@fontsource/work-sans/200.css';
import '@fontsource/work-sans/200-italic.css';
import '@fontsource/work-sans/300.css';
import '@fontsource/work-sans/300-italic.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/400-italic.css';
import '@fontsource/work-sans/500.css';
import '@fontsource/work-sans/500-italic.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/work-sans/600-italic.css';
import '@fontsource/work-sans/700.css';
import '@fontsource/work-sans/700-italic.css';
import '@fontsource/work-sans/800.css';
import '@fontsource/work-sans/800-italic.css';
import '@fontsource/work-sans/900.css';
import '@fontsource/work-sans/900-italic.css';
// Importing Main Fonts (Roboto Slab)
import '@fontsource/roboto-slab/100.css';
import '@fontsource/roboto-slab/200.css';
import '@fontsource/roboto-slab/300.css';
import '@fontsource/roboto-slab/400.css';
import '@fontsource/roboto-slab/500.css';
import '@fontsource/roboto-slab/600.css';
import '@fontsource/roboto-slab/700.css';
import '@fontsource/roboto-slab/800.css';
import '@fontsource/roboto-slab/900.css';
// Importing Main Fonts (Roboto Mono)
import '@fontsource/roboto-mono/100.css';
import '@fontsource/roboto-mono/100-italic.css';
import '@fontsource/roboto-mono/200.css';
import '@fontsource/roboto-mono/200-italic.css';
import '@fontsource/roboto-mono/300.css';
import '@fontsource/roboto-mono/300-italic.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/400-italic.css';
import '@fontsource/roboto-mono/500.css';
import '@fontsource/roboto-mono/500-italic.css';
import '@fontsource/roboto-mono/600.css';
import '@fontsource/roboto-mono/600-italic.css';
import '@fontsource/roboto-mono/700.css';
import '@fontsource/roboto-mono/700-italic.css';
// Importing Main Fonts (Pacifico)
import '@fontsource/pacifico/400.css';

// Importing Material UI Icons
import '@fontsource/material-icons';
import '@fontsource/material-icons-outlined';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLElement);

root.render(
	// <StrictMode>
	// </StrictMode>
	<Providers />
);
