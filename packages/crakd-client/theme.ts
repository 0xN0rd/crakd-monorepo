export type FontWeight = 'light' | 'normal' | 'bold';
export type FontSize = 'tiny' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Radius = 'sm' | 'md' | 'lg' | 'none';
export type Shadows = 'sm' | 'md' | 'lg' | 'xl';
export type Screen = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export type Spacing = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ZIndex = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BorderColors = 'light' | 'main' | 'dark';
export type GreyColors = 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
export type SocialColors = 'facebook' | 'twitter' | 'linkedIn' | 'discord' | 'github';
export type GeneralColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error'
  | 'link'
  | 'body'
  | 'white'
  | 'black'
  | 'text'
  | 'textSecondary'
  | 'disabled'
  | 'transparent'
  | 'primaryGradient'
  | 'secondaryGradient';

interface IFont {
  family: string;
  weight: { [key in FontWeight]: string };
  size: { [key in FontSize]: string };
}
type IShadows = { [key in Shadows]: string };
type IScreen = { [key in Screen]: string };
type ISpacing = { [key in Spacing]: string };
type IRadius = { [key in Radius]: string };
type IZIndex = { [key in ZIndex]: number };
export interface IColors {
  general: { [key in GeneralColors]: string };
  border: { [key in BorderColors]: string };
  grey: { [key in GreyColors]: string };
  social: { [key in SocialColors]: string };
}

export interface Theme {
  font: IFont;
  screen: IScreen;
  spacing: ISpacing;
  shadows: IShadows;
  radius: IRadius;
  zIndex: IZIndex;
  colors: IColors;
}

const theme: Theme = {
  font: {
    family:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Rubik, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    weight: {
      light: '300',
      normal: '400',
      bold: '700',
    },
    size: {
      tiny: '11px',
      xxs: '13px',
      xs: '14px',
      sm: '16px',
      md: '18px',
      lg: '20px',
      xl: '34px',
    },
  },

  colors: {
    general: {
      primary: '#ff0080',
      secondary: '#f50057',
      success: '#00A699',
      warning: '#FFB818',
      info: '#4169E1',
      error: '#ea3323',
      link: '#0073F5',
      body: '#111111',
      white: '#fff',
      black: '#0e0e10',
      text: '#E5E5EA',
      textSecondary: '#8a8f98',
      disabled: '#444950',
      transparent: 'transparent',
      primaryGradient: 'linear-gradient(to right, #56ccf2, #2f80ed)',
      secondaryGradient: 'linear-gradient(to right, #00d2ff, #3a7bd5)',
    },

    border: {
      light: '#f5f5f5',
      main: '#e0e0e0',
      dark: '#bdbdbd',
    },

    social: {
      facebook: '#385898',
      twitter: '#1DA1F2',
      linkedIn: '#2867B2',
      discord: '#7289da',
      github: '#171515',
    },

    grey: {
      5: '#1C1E21',
      10: '#303338',
      20: '#444950',
      30: '#606770',
      40: '#8D949E',
      50: '#BEC3C9',
      60: '#CCD0D5',
      70: '#DADDE1',
      80: '#EBEDF0',
      90: '#F2F3F5',
    },
  },

  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)',
    md: 'rgba(0, 0, 0, 0.3) 0px 1px 8px 0px',
    lg: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    xl: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },

  screen: {
    xs: '540px',
    sm: '640px',
    md: '1007px',
    lg: '1100px',
    xl: '1230px',
    xxl: '1440px',
    xxxl: '1920px',
  },

  spacing: {
    none: '0',
    xxs: '5px',
    xs: '10px',
    sm: '20px',
    md: '30px',
    lg: '40px',
    xl: '60px',
  },

  radius: {
    none: '0',
    sm: '8px',
    md: '12px',
    lg: '16px',
  },

  zIndex: {
    xs: 10,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50,
  },
};

export default theme;