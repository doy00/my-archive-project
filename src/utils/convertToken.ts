/**
 * 디자인 토큰 변환 스크립트
 * Figma JSON 토큰을 CSS 변수와 TypeScript 타입으로 변환
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseTokens, generateTypeDefinitions } from './tokenParser';

// 토큰 파일 읽기
const readTokenFile = (filePath: string) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading token file:', error);
    throw error;
  }
};

// CSS 파일 생성
const generateCssFile = (tokenData: any, outputPath: string) => {
  const cssContent = parseTokens(tokenData);
  
  // 추가 CSS 유틸리티 클래스
  const additionalStyles = `
/* Utility Classes */
.material-ultrathick {
  background-color: var(--materials-ultrathick);
  backdrop-filter: blur(20px);
}

.material-thick {
  background-color: var(--materials-thick);
  backdrop-filter: blur(15px);
}

.material-medium {
  background-color: var(--materials-medium);
  backdrop-filter: blur(10px);
}

.material-thin {
  background-color: var(--materials-thin);
  backdrop-filter: blur(5px);
}

.material-ultrathin {
  background-color: var(--materials-ultrathin);
  backdrop-filter: blur(2px);
}

/* Dark mode materials */
.dark .material-ultrathick {
  background-color: var(--materials-ultrathick-dark);
}

.dark .material-thick {
  background-color: var(--materials-thick-dark);
}

.dark .material-medium {
  background-color: var(--materials-medium-dark);
}

.dark .material-thin {
  background-color: var(--materials-thin-dark);
}

.dark .material-ultrathin {
  background-color: var(--materials-ultrathin-dark);
}

/* Typography utilities */
.text-large-title {
  font-size: var(--font-largetitle-regular-size);
  font-weight: var(--font-largetitle-regular-weight);
  line-height: var(--font-largetitle-regular-lineheight);
}

.text-title1 {
  font-size: var(--font-title1-regular-size);
  font-weight: var(--font-title1-regular-weight);
  line-height: var(--font-title1-regular-lineheight);
}

.text-title2 {
  font-size: var(--font-title2-regular-size);
  font-weight: var(--font-title2-regular-weight);
  line-height: var(--font-title2-regular-lineheight);
}

.text-body {
  font-size: var(--font-body-regular-size);
  font-weight: var(--font-body-regular-weight);
  line-height: var(--font-body-regular-lineheight);
}

.text-caption {
  font-size: var(--font-caption1-regular-size);
  font-weight: var(--font-caption1-regular-weight);
  line-height: var(--font-caption1-regular-lineheight);
}
`;
  
  const fullCssContent = cssContent + additionalStyles;
  
  fs.writeFileSync(outputPath, fullCssContent, 'utf-8');
  console.log(`✅ CSS file generated: ${outputPath}`);
};

// TypeScript 타입 파일 생성
const generateTypeFile = (tokenData: any, outputPath: string) => {
  const typeContent = generateTypeDefinitions(tokenData);
  
  fs.writeFileSync(outputPath, typeContent, 'utf-8');
  console.log(`✅ TypeScript types generated: ${outputPath}`);
};

// styled-components 테마 파일 생성
const generateThemeFile = (tokenData: any, outputPath: string) => {
  const themeContent = `// Auto-generated theme from design tokens
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
`;
  
  fs.writeFileSync(outputPath, themeContent, 'utf-8');
  console.log(`✅ Theme file generated: ${outputPath}`);
};

// 메인 실행 함수
const main = () => {
  const tokenFilePath = process.argv[2] || './design-tokens.tokens.json';
  const outputDir = process.argv[3] || './src/styles';
  
  // 출력 디렉토리 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    // 토큰 파일 읽기
    const tokenData = readTokenFile(tokenFilePath);
    
    // 각 파일 생성
    generateCssFile(tokenData, path.join(outputDir, 'tokens.css'));
    generateTypeFile(tokenData, path.join(outputDir, 'tokens.types.ts'));
    generateThemeFile(tokenData, path.join(outputDir, 'theme.ts'));
    
    console.log('\n✨ All files generated successfully!');
    console.log('\nUsage:');
    console.log('1. Import tokens.css in your global styles');
    console.log('2. Use the theme object with ThemeProvider');
    console.log('3. Access CSS variables via var(--token-name)');
    
  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
};

// 스크립트 실행
if (require.main === module) {
  main();
}

export { main };