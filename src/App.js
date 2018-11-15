import React, { Component } from 'react';
import { ThemeProvider, createGlobalStyle, css } from 'styled-components';
import Auth from './components/Auth';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faDumbbell } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope, faLock, faDumbbell)

const GlobalStyle = createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
		font-family: 'Barlow Condensed', sans-serif;
		box-sizing: border-box;
	}
	ul {
		list-style-type: none;
	}
	p, h1, h2, h3, h4, h5, h6, ul, li {
		margin: 0;
		padding: 0;
	}
	button {
		outline: none;
		border: none;
		background-color: transparent;
		&:focus, &:active {
			outline: none;
		}
		&:hover {
			cursor: pointer;
		}
	}
	a {
		text-decoration: none;
	}
`;

const theme = {
  font: (fontSize, fontWeight) => {
    return `
			font-size: ${fontSize}px;
			font-weight: ${fontWeight};
		`;
  },
  colors: {
    primary: '#0E6AE9',
    offWhite: '#F4F4FC',
    offBlack: '#9C9CA1',
  },
  media: {
    laptop: (...args) => css`
      @media (max-width: 1024px) {
        ${css(...args)};
      }
    `,
    tablet: (...args) => css`
      @media (max-width: 980px) {
        ${css(...args)};
      }
    `,
    phone: (...args) => css`
      @media (max-width: 425px) {
        ${css(...args)};
      }
    `,
  },
  zIndex: {
    default: 0,
    bottom: 1,
    middle: 2,
    top: 3,
  },
  transition: (property, time, delay = 0) => {
    return `${property} ${time}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
  },
  shadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);',
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Auth />
          <GlobalStyle />
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
