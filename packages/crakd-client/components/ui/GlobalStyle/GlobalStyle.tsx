import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { Theme } from '../../../theme';
import nProgress from './nprogress';

interface GlobalStyleProps {
  theme: Theme;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
  ${normalize()}
  ${(p) => nProgress(p.theme)}

  html {
    box-sizing: border-box;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-family: Rubik, sans-serif;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.normal};
    color: ${(p) => p.theme.colors.general.text};
    background-color: ${(p) => p.theme.colors.general.body};
  }
`;

export default GlobalStyle;
