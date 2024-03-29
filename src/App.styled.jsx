import styled from '@emotion/styled';
import backgroundTop from './assets/img/background-main-page.png';
import backgroundBottom from './assets/img/background-main-page-bottom.png';
import 'normalize.css';

export const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
export const Background = styled.div`
  width: 100%;
  background-image: url(${backgroundTop});
  background-repeat: no-repeat;
  background-position: left top;
`;
export const BackgroundBot = styled.div`
  width: 100%;
  background-image: url(${backgroundBottom});
  background-repeat: no-repeat;
  background-position: left bottom;
`;
