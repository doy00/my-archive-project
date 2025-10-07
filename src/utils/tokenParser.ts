/**
 * Figma 디자인 토큰을 CSS 변수로 변환하는 유틸리티
 */

interface ColorToken {
  value: string;
  type?: string;
  blendMode?: string;
  description?: string;
}

interface TypographyToken {
  fontSize?: { value: number };
  fontFamily?: { value: string };
  fontWeight?: { value: number };
  lineHeight?: { value: number };
  letterSpacing?: { value: number };
}

interface TokenData {
  color?: Record<string, any>;
  font?: Record<string, any>;
  typography?: Record<string, any>;
  effect?: Record<string, any>;
  'system colors'?: Record<string, any>;
}

/**
 * RGBA 문자열을 CSS rgba() 형식으로 변환
 */
const parseColorValue = (value: string): string => {
  // #rrggbbaa 형식을 rgba()로 변환
  if (value.startsWith('#') && value.length === 9) {
    const r = parseInt(value.slice(1, 3), 16);
    const g = parseInt(value.slice(3, 5), 16);
    const b = parseInt(value.slice(5, 7), 16);
    const a = parseInt(value.slice(7, 9), 16) / 255;
    
    // 알파값이 1이면 생략, 아니면 소수점 표시
    if (a === 1) {
      return `rgba(${r}, ${g}, ${b}, 1)`;
    }
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }
  return value;
};

/**
 * 중첩된 객체 키를 CSS 변수명으로 변환
 */
const formatCssVarName = (keys: string[]): string => {
  return keys
    .map(key => key.replace(/\s+/g, '').replace(/[^\w-]/g, ''))
    .join('-')
    .toLowerCase();
};

/**
 * 컬러 토큰을 CSS 변수로 변환
 */
const parseColorTokens = (tokens: Record<string, any>, prefix = ''): Record<string, string> => {
  const cssVars: Record<string, string> = {};
  
  const processTokens = (obj: any, keys: string[] = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      const currentKeys = [...keys, key];
      
      if (typeof value === 'object' && value !== null) {
        // value 프로퍼티가 있으면 실제 색상 값
        if ('value' in value && typeof value.value === 'string') {
          const varName = `--${prefix}${formatCssVarName(currentKeys)}`;
          cssVars[varName] = parseColorValue(value.value);
        }
        // 중첩된 객체면 재귀적으로 처리
        else if (!('0' in value || '1' in value)) {
          // 복합 색상이 아닌 경우만 재귀 처리
          processTokens(value, currentKeys);
        }
      }
    });
  };
  
  processTokens(tokens);
  return cssVars;
};

/**
 * 타이포그래피 토큰을 CSS 변수로 변환
 */
const parseTypographyTokens = (tokens: Record<string, any>): Record<string, string> => {
  const cssVars: Record<string, string> = {};
  
  Object.entries(tokens).forEach(([category, styles]) => {
    Object.entries(styles as Record<string, any>).forEach(([style, properties]) => {
      if (typeof properties === 'object' && properties !== null) {
        // fontSize
        if (properties.fontSize?.value) {
          const varName = `--font-${formatCssVarName([category, style, 'size'])}`;
          cssVars[varName] = `${properties.fontSize.value}px`;
        }
        
        // fontWeight
        if (properties.fontWeight?.value) {
          const varName = `--font-${formatCssVarName([category, style, 'weight'])}`;
          cssVars[varName] = String(properties.fontWeight.value);
        }
        
        // lineHeight
        if (properties.lineHeight?.value) {
          const varName = `--font-${formatCssVarName([category, style, 'lineheight'])}`;
          cssVars[varName] = `${properties.lineHeight.value}px`;
        }
        
        // letterSpacing
        if (properties.letterSpacing?.value) {
          const varName = `--font-${formatCssVarName([category, style, 'letterspacing'])}`;
          cssVars[varName] = `${properties.letterSpacing.value}px`;
        }
        
        // fontFamily
        if (properties.fontFamily?.value) {
          const varName = `--font-${formatCssVarName([category, style, 'family'])}`;
          cssVars[varName] = `'${properties.fontFamily.value}', sans-serif`;
        }
      }
    });
  });
  
  return cssVars;
};

/**
 * 전체 토큰 데이터를 CSS 변수로 변환
 */
export const parseTokens = (tokenData: TokenData): string => {
  const allCssVars: Record<string, string> = {};
  
  // 색상 토큰 처리
  if (tokenData.color) {
    Object.assign(allCssVars, parseColorTokens(tokenData.color, ''));
  }
  
  // 시스템 색상 토큰 처리
  if (tokenData['system colors']) {
    Object.assign(allCssVars, parseColorTokens(tokenData['system colors'], 'system-'));
  }
  
  // 타이포그래피 토큰 처리
  if (tokenData.typography) {
    Object.assign(allCssVars, parseTypographyTokens(tokenData.typography));
  }
  
  // CSS 변수 문자열 생성
  const cssString = Object.entries(allCssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  
  return `:root {\n${cssString}\n}`;
};

/**
 * TypeScript 타입 정의 생성
 */
export const generateTypeDefinitions = (tokenData: TokenData): string => {
  const allVars: string[] = [];
  
  // 색상 토큰에서 변수명 추출
  const extractVarNames = (obj: any, keys: string[] = [], prefix = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const currentKeys = [...keys, key];
      
      if (typeof value === 'object' && value !== null) {
        if ('value' in value && typeof value.value === 'string') {
          const varName = `--${prefix}${formatCssVarName(currentKeys)}`;
          allVars.push(varName);
        } else if (!('0' in value || '1' in value)) {
          extractVarNames(value, currentKeys, prefix);
        }
      }
    });
  };
  
  if (tokenData.color) {
    extractVarNames(tokenData.color);
  }
  
  if (tokenData['system colors']) {
    extractVarNames(tokenData['system colors'], [], 'system-');
  }
  
  // 타이포그래피 변수명 추출
  if (tokenData.typography) {
    Object.entries(tokenData.typography).forEach(([category, styles]) => {
      Object.entries(styles as Record<string, any>).forEach(([style, properties]) => {
        if (properties.fontSize?.value) {
          allVars.push(`--font-${formatCssVarName([category, style, 'size'])}`);
        }
        if (properties.fontWeight?.value) {
          allVars.push(`--font-${formatCssVarName([category, style, 'weight'])}`);
        }
        if (properties.lineHeight?.value) {
          allVars.push(`--font-${formatCssVarName([category, style, 'lineheight'])}`);
        }
        if (properties.letterSpacing?.value) {
          allVars.push(`--font-${formatCssVarName([category, style, 'letterspacing'])}`);
        }
        if (properties.fontFamily?.value) {
          allVars.push(`--font-${formatCssVarName([category, style, 'family'])}`);
        }
      });
    });
  }
  
  const typeDefinition = `// Auto-generated design token types
export type DesignToken = 
${allVars.map(v => `  | '${v}'`).join('\n')};

export const tokens = {
${allVars.map(v => `  '${v.replace('--', '')}': 'var(${v})' as const`).join(',\n')}
} as const;

export type TokenKeys = keyof typeof tokens;
`;
  
  return typeDefinition;
};