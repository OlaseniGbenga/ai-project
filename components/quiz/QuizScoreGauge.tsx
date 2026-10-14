
"use client";

interface QuizScoreGaugeProps {
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
}

export default function QuizScoreGauge({
  correctAnswers,
  totalQuestions,
  passed,
}: QuizScoreGaugeProps) {
  const percentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const normalizedPercentage = Math.min(
    100,
    Math.max(0, percentage),
  );

  const radius = 75;
  const centerX = 100;
  const centerY = 100;
  const arcLength = Math.PI * radius;
  const progressLength =
    (normalizedPercentage / 100) * arcLength;

  const color = passed ? "#43AC47" : "#F59E0B";

  const arcPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`;

  return (
    <div className="flex h-[125px] w-[200px] items-center justify-center">
      <svg
        viewBox="0 0 200 125"
        width="200"
        height="125"
        className="block h-full w-full"
        role="img"
        aria-label={`Quiz score: ${correctAnswers} out of ${totalQuestions}, ${percentage} percent`}
      >
        <path
          d={arcPath}
          fill="none"
          stroke="#EAEAEA"
          strokeWidth="17"
          strokeLinecap="round"
        />

        {progressLength > 0 && (
          <path
            d={arcPath}
            fill="none"
            stroke={color}
            strokeWidth="17"
            strokeLinecap="round"
            strokeDasharray={`${progressLength} ${arcLength}`}
          />
        )}

        <text
          x="100"
          y="88"
          textAnchor="middle"
          fontSize="26"
          fontWeight="700"
          fill="#0B3440"
        >
          {correctAnswers}/{totalQuestions}
        </text>

        <text
          x="100"
          y="108"
          textAnchor="middle"
          fontSize="12"
          fill="#647A82"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
}
