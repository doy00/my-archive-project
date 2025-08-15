import React, { useState, useEffect, CSSProperties } from "react";

interface ClockProps {
  className?: string;
  style?: CSSProperties;
  format?: "12" | "24";
}

const Clock: React.FC<ClockProps> = ({ className, style, format = "12" }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const containerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px",
    color: "black",
    cursor: "default",
    lineHeight: 0,
    top: 10,
    height: 10,
    fontWeight: "500",
    ...style,
  };

  const elementStyle: CSSProperties = {
    position: "absolute",
    right: 0,
    bottom: 0,
    lineHeight: "60px",
    borderLeft: "0.5px solid black",
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour12: format === "12",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return time.toLocaleTimeString(undefined, options);
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={elementStyle}>
        &nbsp;&nbsp;{formatTime(currentTime)}&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default Clock;
