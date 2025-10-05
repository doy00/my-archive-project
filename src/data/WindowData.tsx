import React from "react";
import styled from "styled-components";
import { PortfolioData } from "@/data/PortfolioData";
import { useMediaQuery } from "react-responsive";

interface CustomLinkProps {
  text: string;
  href: string;
  color?: string;
}

// Styled Link 컴포넌트 - Custom Link의 styled-components 컴포넌트
const StyledLink = styled.a<{ $color: string }>`
  text-decoration: underline;
  pointer-events: auto;
  color: ${(props) => props.$color};
  letter-spacing: 0px;
  transition: letter-spacing 0.2s ease-in-out;

  &:hover {
    letter-spacing: 1px;
  }

  &:focus {
    outline: 2px solid ${(props) => props.$color};
    outline-offset: 2px;
  }
`;

/**
 * CustomLink 컴포넌트
 * - 외부 링크를 렌더링
 * - 호버 시 letterSpacing 애니메이션 효과
 *
 * @param text - 링크에 표시될 텍스트
 * @param href - 링크 URL
 * @param color - 링크 색상 (기본값: #ee4898)
 */
function CustomLink({
  text,
  href,
  color = "#ee4898",
}: CustomLinkProps): React.ReactElement {
  return (
    <StyledLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      $color={color}
      aria-label={`Visit ${text}`}
    >
      {text}
    </StyledLink>
  );
};


interface ContentBlockProps {
  content: React.ReactNode;
  textAlign?: "left" | "center" | "right" | "justify";
  padding?: string;
  fontSize?: number;
}

/**
 * ContentBlock 컴포넌트
 *
 * @param content - 렌더링할 콘텐츠
 * @param textAlign - 텍스트 정렬 (기본값: "left")
 * @param padding - 패딩 값 (기본값: "165px 20px")
 * @param fontSize - 폰트 크기 (기본값: 22)
 */
const ContentBlock: React.FC<ContentBlockProps> = ({
  content,
  textAlign = "left",
  padding = "165px 20px",
  fontSize = 22,
}) => {
  // 모바일 화면 감지
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <div
      style={{
        whiteSpace: "pre-wrap", // 줄바꿈 유지
        color: "#222",
        fontSize: isMobile ? fontSize * 0.9 : fontSize, // 모바일에서 폰트 크기 10% 축소
        textAlign,
        lineHeight: isMobile ? "1.05" : "1.15", // 모바일에서 줄간격 좁게
        padding: isMobile ? "140px 20px" : padding, // 모바일에서 패딩 조정
        letterSpacing: -0.1,
        fontFamily: "Helvetica",
        // fontWeight: 500,
        zIndex: 1000000, // 최상위 레이어
        pointerEvents: "none", // 클릭 이벤트 무시 (링크는 auto로 설정됨)
      }}
    >
      {content}
    </div>
  );
};

/**
 * Socials 콘텐츠
 * - "( Socials )" 팝업 창에 표시될 내용
 * - 소셜 미디어 링크 목록 렌더링
 */
const socialsContent: React.ReactElement = (
  <>
    start &#8594; brainstorm for ideas 💭
    <br />
    start &#8594; contact to collab 💌
    <br />
    <br />
    {/* PortfolioData에서 소셜 미디어 정보를 가져와 링크 생성 */}
    {PortfolioData.main.social.map((item, index) => (
      <React.Fragment key={index}>
        <CustomLink href={item.url} text={item.name} />
        <div />
      </React.Fragment>
    ))}
  </>
);

/**
 * Site 콘텐츠
 * - "( 🌐🤍🎀🫧 )" 팝업 창에 표시될 내용
 * - 웹사이트 소개 및 기술 스택, 영감 출처 정보
 */
const siteContent: React.ReactElement = (
  <>
    welcome to my safe space on the internet ᡣ • . • 𐭩 ♡
    <br />
    &#40; personal os 🌟 site assemblage 🌐 portfolio 📎 &#41;
    <br />
    <br />
    ૮꒰ ˶• ༝ •˶꒱ა ♡
    <br />
    <br />
    this website is{" "}
    <CustomLink
      text="open source"
      href="https://github.com/mellyeliu/mellyeliu.online"
    />
    , made with <CustomLink text="react" href="https://react.dev/" />, and
    inspired by{" "}
    <CustomLink
      text="everything before me"
      href="https://www.are.na/vaiva-staugaityte/websites-that-look-like-operating-systems"
    />
  </>
);

/**
 * Bio 콘텐츠
 * - "૮꒰ ˶• ༝ •˶꒱ა ♡" 팝업 창에 표시될 내용
 * - 작성자 소개 및 활동 영역, 포트폴리오 링크
 */
const bioContent: React.ReactElement = (
  <>
    <div style={{ textAlign: "center" }}>
      ₊˚ . ⋅☁︎‧₊˚ ☾. ⋅
      <br />
    </div>
    <br />
    Melissa (思源) is a software engineer and net artist. Interests include:
    messaging systems, creation myths, fandom as worldbuilding, recursive
    autofiction, video game as art form, literary tropes, pseudoscientific
    personality tests, relational psychology, bed rotting [...] They maintain an
    enduring belief in the internet as identity play and in softness as
    defiance.
    <br />
    <br />
    In the day they work on web tooling like{" "}
    <CustomLink text="StyleX" href="https://github.com/facebook/stylex" />, a
    css-in-js library, and at night they work on web games. Before that they
    worked on the <CustomLink text="website" href="https://messenger.com" />{" "}
    that first taught them how to talk to people. They still beta test it every
    day with their friends. The rest of their life is just content for their
    work
    {" ("}
    <CustomLink text="code" href="https://github.com/mellyeliu" />,{" "}
    <CustomLink text="text" href="https://reading.supply/@mellyeliu" />,{" "}
    <CustomLink
      text="visuals"
      href="https://mellyeliu.online/portfolio/design"
    />
    ,{" "}
    <CustomLink text="games" href="https://mellyeliu.online/portfolio/games" />
    {")"}.
  </>
);

/**
 * Emojis 콘텐츠
 * - "( Girlhood )" 팝업 창에 표시될 내용
 * - 이모지만 표시
 */
const emojisContent: React.ReactElement = <>🎀💿🧸💫</>;

/**
 * WindowData 타입 정의
 * - 각 키는 팝업 창 제목을 나타냄
 * - 각 값은 JSX Element로 렌더링할 콘텐츠
 */
export interface WindowDataType {
  [key: string]: React.ReactElement;
}

/**
 * WindowData 객체
 * - 데스크톱 아이콘 더블클릭 시 표시되는 팝업 창의 데이터
 * - key: 팝업 창 제목 (아이콘 라벨)
 * - value: ContentBlock 컴포넌트로 감싼 콘텐츠
 *
 * 팝업 종류:
 * 1. "( Socials )": 소셜 미디어 링크 목록
 * 2. "૮꒰ ˶• ༝ •˶꒱ა ♡": 작성자 바이오
 * 3. "( 🌐🤍🎀🫧 )": 웹사이트 소개
 * 4. "( Girlhood )": 이모지 디스플레이
 */
const WindowData: WindowDataType = {
  "( Socials )": <ContentBlock content={socialsContent} padding="175px 20px" />,
  "૮꒰ ˶• ༝ •˶꒱ა ♡": (
    <ContentBlock content={bioContent} padding="195px 25px" />
  ),
  "( 🌐🤍🎀🫧 )": (
    <ContentBlock
      content={siteContent}
      textAlign="center"
      padding="195px 50px"
    />
  ),
  "( Girlhood )": (
    <ContentBlock content={emojisContent} textAlign="center" fontSize={48} />
  ),
};

export default WindowData;
