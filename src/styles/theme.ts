// Auto-generated theme from design tokens
import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    // Accents
    red: 'var(--accents-red)',
    orange: 'var(--accents-orange)',
    yellow: 'var(--accents-yellow)',
    green: 'var(--accents-green)',
    mint: 'var(--accents-mint)',
    teal: 'var(--accents-teal)',
    cyan: 'var(--accents-cyan)',
    blue: 'var(--accents-blue)',
    indigo: 'var(--accents-indigo)',
    purple: 'var(--accents-purple)',
    pink: 'var(--accents-pink)',
    gray: 'var(--accents-gray)',
    brown: 'var(--accents-brown)',
    
    // Text colors
    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    textTertiary: 'var(--text-tertiary)',
    textQuaternary: 'var(--text-quaternary)',
    
    // Fill colors
    fillPrimary: 'var(--fills-primary)',
    fillSecondary: 'var(--fills-secondary)',
    fillTertiary: 'var(--fills-tertiary)',
    fillQuaternary: 'var(--fills-quaternary)',
    fillQuinary: 'var(--fills-quinary)',
    
    // Materials
    materialUltrathick: 'var(--materials-ultrathick)',
    materialThick: 'var(--materials-thick)',
    materialMedium: 'var(--materials-medium)',
    materialThin: 'var(--materials-thin)',
    materialUltrathin: 'var(--materials-ultrathin)',
  },
  
  typography: {
    largeTitle: {
      regular: {
        fontSize: 'var(--font-largetitle-regular-size)',
        fontWeight: 'var(--font-largetitle-regular-weight)',
        lineHeight: 'var(--font-largetitle-regular-lineheight)',
        fontFamily: 'var(--font-largetitle-regular-family)',
      },
      emphasized: {
        fontSize: 'var(--font-largetitle-emphasized-size)',
        fontWeight: 'var(--font-largetitle-emphasized-weight)',
        lineHeight: 'var(--font-largetitle-emphasized-lineheight)',
        fontFamily: 'var(--font-largetitle-emphasized-family)',
      },
    },
    title1: {
      regular: {
        fontSize: 'var(--font-title1-regular-size)',
        fontWeight: 'var(--font-title1-regular-weight)',
        lineHeight: 'var(--font-title1-regular-lineheight)',
        fontFamily: 'var(--font-title1-regular-family)',
      },
      emphasized: {
        fontSize: 'var(--font-title1-emphasized-size)',
        fontWeight: 'var(--font-title1-emphasized-weight)',
        lineHeight: 'var(--font-title1-emphasized-lineheight)',
        fontFamily: 'var(--font-title1-emphasized-family)',
      },
    },
    body: {
      regular: {
        fontSize: 'var(--font-body-regular-size)',
        fontWeight: 'var(--font-body-regular-weight)',
        lineHeight: 'var(--font-body-regular-lineheight)',
        fontFamily: 'var(--font-body-regular-family)',
      },
      emphasized: {
        fontSize: 'var(--font-body-emphasized-size)',
        fontWeight: 'var(--font-body-emphasized-weight)',
        lineHeight: 'var(--font-body-emphasized-lineheight)',
        fontFamily: 'var(--font-body-emphasized-family)',
      },
    },
  },
  
  shadows: {
    primary: 'var(--shadows-primary)',
    secondary: 'var(--shadows-secondary)',
    tertiary: 'var(--shadows-tertiary)',
    quaternary: 'var(--shadows-quaternary)',
  },
};

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // Dark mode overrides
    red: 'var(--accents-red-dark)',
    orange: 'var(--accents-orange-dark)',
    yellow: 'var(--accents-yellow-dark)',
    green: 'var(--accents-green-dark)',
    mint: 'var(--accents-mint-dark)',
    teal: 'var(--accents-teal-dark)',
    cyan: 'var(--accents-cyan-dark)',
    blue: 'var(--accents-blue-dark)',
    indigo: 'var(--accents-indigo-dark)',
    purple: 'var(--accents-purple-dark)',
    pink: 'var(--accents-pink-dark)',
    gray: 'var(--accents-gray-dark)',
    brown: 'var(--accents-brown-dark)',
    
    textPrimary: 'var(--text-primary-dark)',
    textSecondary: 'var(--text-secondary-dark)',
    textTertiary: 'var(--text-tertiary-dark)',
    textQuaternary: 'var(--text-quaternary-dark)',
    
    fillPrimary: 'var(--fills-primary-dark)',
    fillSecondary: 'var(--fills-secondary-dark)',
    fillTertiary: 'var(--fills-tertiary-dark)',
    fillQuaternary: 'var(--fills-quaternary-dark)',
    fillQuinary: 'var(--fills-quinary-dark)',
    
    materialUltrathick: 'var(--materials-ultrathick-dark)',
    materialThick: 'var(--materials-thick-dark)',
    materialMedium: 'var(--materials-medium-dark)',
    materialThin: 'var(--materials-thin-dark)',
    materialUltrathin: 'var(--materials-ultrathin-dark)',
  },
};

// styled.d.ts 파일과 함께 사용하기 위한 타입 확장
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      red: string;
      orange: string;
      yellow: string;
      green: string;
      mint: string;
      teal: string;
      cyan: string;
      blue: string;
      indigo: string;
      purple: string;
      pink: string;
      gray: string;
      brown: string;
      
      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
      textQuaternary: string;
      
      fillPrimary: string;
      fillSecondary: string;
      fillTertiary: string;
      fillQuaternary: string;
      fillQuinary: string;
      
      materialUltrathick: string;
      materialThick: string;
      materialMedium: string;
      materialThin: string;
      materialUltrathin: string;
    };
    
    typography: {
      [key: string]: {
        regular: {
          fontSize: string;
          fontWeight: string;
          lineHeight: string;
          fontFamily: string;
        };
        emphasized: {
          fontSize: string;
          fontWeight: string;
          lineHeight: string;
          fontFamily: string;
        };
      };
    };
    
    shadows: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
    };
  }
}
