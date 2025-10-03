import React from "react";

const CircularLeaveProgress = ({
  total = 23,       // 최대 연차
  remaining = 0,    // 남은 연차
  size = 130,       // 원 지름
  strokeWidth = 12, // 바 두께
  circleColor = "rgba(98, 204, 208, 0.2)", // 배경 원
  progressColor = "#62CCD0", // 진행 바
  fontColor = "#62CCD0",    // 중앙 텍스트 색
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // 남은 연차를 기준으로 퍼센트 계산
    const percent = Math.min((remaining / total) * 100, 100);
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div style={{ width: size, height: size, position: "relative" }}>
            <svg width={size} height={size}>
                {/* 배경 원 */}
                <circle
                    stroke={circleColor}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* 진행 바 */}
                <circle
                    stroke={progressColor}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`} // 시작점을 위로
                />
            </svg>

            {/* 중앙 텍스트 */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: '28px',
                    fontWeight: "bold",
                    color: fontColor,
                }}
            >
                {remaining}
            </div>
        </div>
    );
};

export default CircularLeaveProgress;