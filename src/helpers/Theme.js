import { css } from 'styled-components';

export default {
  font: (fontSize, fontWeight) => {
    return `
			font-size: ${fontSize}px;
			font-weight: ${fontWeight};
		`;
  },
  colors: {
    primary: '#0E6AE9',
    secondary: '#4CB944 ',
    secondary_light: '#DEF2DD',
    white: '#FDFFFC',
    black: '#2E2E2E',
    gray: '#9C9CA1',
    gray_light: '#E6E8E6',
    error: '#F8333C'
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
    `
  },
  zIndex: {
    default: 0,
    bottom: 1,
    middle: 2,
    top: 3
  },
  transition: (property, time, delay = 0) => {
    return `${property} ${time}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
  },
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  shadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);'
};
