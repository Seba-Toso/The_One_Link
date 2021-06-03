import React from 'react';
import ReactDOM from 'react-dom';
import Store from './context/context';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from "./theme/theme"
import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Store>
      <App />
      </Store>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

