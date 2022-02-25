import ReactDOM from 'react-dom';

import App from './containers/App';
// Importing Main Font (Work-Sans)
import '@fontsource/work-sans/100.css';
import '@fontsource/work-sans/200.css';
import '@fontsource/work-sans/300.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/500.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/work-sans/700.css';
import '@fontsource/work-sans/800.css';
import '@fontsource/work-sans/900.css';
// Importing Logo Font (Pacifico)
import '@fontsource/pacifico/400.css';
import './index.css';
// Importing Material UI Icons
import '@fontsource/material-icons-outlined';
import '@fontsource/material-icons-two-tone';

ReactDOM.render(<App />, document.getElementById('root'));
