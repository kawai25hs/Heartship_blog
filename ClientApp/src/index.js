import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, amber } from '@mui/material/colors';

const theme = createTheme({
  typography: {
      fontFamily: 'Noto Sans',
  },
  palette: {
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: amber[500],
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider >
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals