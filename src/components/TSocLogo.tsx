import React, { useId } from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  glow?: boolean;
}

export function TSocLogoIcon({ className = "w-9 h-9", glow = true, ...props }: LogoProps) {
  const uid = useId().replace(/:/g, '');
  const goldId = `${uid}-icon-gold`;
  const blueId = `${uid}-icon-blue`;

  return (
    <svg
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'drop-shadow-[0_4px_12px_rgba(245,176,37,0.15)] hover:drop-shadow-[0_4px_20px_rgba(56,189,248,0.25)]' : ''} transition-all duration-300`}
      {...props}
    >
      <defs>
        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8D6" />
          <stop offset="35%" stopColor="#F5B225" />
          <stop offset="70%" stopColor="#E59400" />
          <stop offset="100%" stopColor="#A86300" />
        </linearGradient>
        <linearGradient id={blueId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="40%" stopColor="#0284C7" />
          <stop offset="80%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#0B478E" />
        </linearGradient>
      </defs>

      <circle cx="75" cy="32" r="11.5" fill={`url(#${goldId})`} />

      <path d="M 75,130 C 62,126 44,112 35,93 C 27,76 27,55 35,35 C 30,50 30,70 35,88 C 41,104 56,120 75,130 Z" fill={`url(#${blueId})`} />
      <path d="M 75,130 C 73,105 66,80 54,60 C 44,45 35,32 32,15 C 40,28 54,54 62,75 C 69,94 73,115 75,130 Z" fill={`url(#${blueId})`} />
      <circle cx="48.5" cy="71" r="9.2" fill={`url(#${blueId})`} />
      <path d="M 42.5,84 C 45,91.5 53,97.5 62,100.5 C 59,97.5 54.5,91.5 53,84 Z" fill={`url(#${blueId})`} />

      <path d="M 75,130 C 88,126 106,112 115,93 C 123,76 123,55 115,35 C 120,50 120,70 115,88 C 109,104 94,120 75,130 Z" fill={`url(#${goldId})`} />
      <path d="M 75,130 C 77,105 84,80 96,60 C 106,45 115,32 118,15 C 110,28 96,54 88,75 C 81,94 77,115 75,130 Z" fill={`url(#${goldId})`} />
      <circle cx="101.5" cy="71" r="9.2" fill={`url(#${goldId})`} />
      <path d="M 107.5,84 C 105,91.5 97,97.5 88,100.5 C 91,97.5 95.5,91.5 97,84 Z" fill={`url(#${goldId})`} />
    </svg>
  );
}

export function TSocLogoFull({ className = "w-full max-w-xs", glow = true, ...props }: LogoProps) {
  const uid = useId().replace(/:/g, '');
  const fullGoldId = `${uid}-full-gold`;
  const iconGoldId = `${uid}-icon-gold`;
  const iconBlueId = `${uid}-icon-blue`;

  return (
    <svg
      viewBox="0 0 500 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'drop-shadow-[0_4px_16px_rgba(245,192,67,0.12)]' : ''} transition-all duration-300`}
      {...props}
    >
      <defs>
        <linearGradient id={fullGoldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2A1" />
          <stop offset="25%" stopColor="#F5B025" />
          <stop offset="50%" stopColor="#FFE07A" />
          <stop offset="75%" stopColor="#C47E0B" />
          <stop offset="100%" stopColor="#8F5402" />
        </linearGradient>
        <linearGradient id={iconGoldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8D6" />
          <stop offset="35%" stopColor="#F5B225" />
          <stop offset="70%" stopColor="#E59400" />
          <stop offset="100%" stopColor="#A86300" />
        </linearGradient>
        <linearGradient id={iconBlueId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="40%" stopColor="#0284C7" />
          <stop offset="80%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#0B478E" />
        </linearGradient>
      </defs>

      <g>
        <g transform="translate(-15, 6)">
          <circle cx="75" cy="32" r="11.5" fill={`url(#${iconGoldId})`} />

          <path d="M 75,130 C 62,126 44,112 35,93 C 27,76 27,55 35,35 C 30,50 30,70 35,88 C 41,104 56,120 75,130 Z" fill={`url(#${iconBlueId})`} />
          <path d="M 75,130 C 73,105 66,80 54,60 C 44,45 35,32 32,15 C 40,28 54,54 62,75 C 69,94 73,115 75,130 Z" fill={`url(#${iconBlueId})`} />
          <circle cx="48.5" cy="71" r="9.2" fill={`url(#${iconBlueId})`} />
          <path d="M 42.5,84 C 45,91.5 53,97.5 62,100.5 C 59,97.5 54.5,91.5 53,84 Z" fill={`url(#${iconBlueId})`} />

          <path d="M 75,130 C 88,126 106,112 115,93 C 123,76 123,55 115,35 C 120,50 120,70 115,88 C 109,104 94,120 75,130 Z" fill={`url(#${iconGoldId})`} />
          <path d="M 75,130 C 77,105 84,80 96,60 C 106,45 115,32 118,15 C 110,28 96,54 88,75 C 81,94 77,115 75,130 Z" fill={`url(#${iconGoldId})`} />
          <circle cx="101.5" cy="71" r="9.2" fill={`url(#${iconGoldId})`} />
          <path d="M 107.5,84 C 105,91.5 97,97.5 88,100.5 C 91,97.5 95.5,91.5 97,84 Z" fill={`url(#${iconGoldId})`} />
        </g>

        <g>
          <path
            d="M 195,85 C 190,81 183,82 179,85 C 177,86 177,88 179,88 C 184,85 190,84 195,88 C 200,84 206,85 211,88 C 213,88 213,86 211,85 C 207,81 200,81 195,85 Z"
            fill={`url(#${fullGoldId})`}
          />
          <line x1="195" y1="85" x2="195" y2="88" stroke={`url(#${fullGoldId})`} strokeWidth="1" />
        </g>

        <g>
          <path d="M 140,55 L 180,55 L 180,71 L 168,71 L 168,125 L 152,125 L 152,71 L 140,71 Z" fill={`url(#${fullGoldId})`} />
          <path d="M 272,68 C 272,55 260,55 245,55 L 225,55 C 215,55 210,60 210,70 L 210,78 C 210,88 220,90 235,92 L 250,94 C 265,96 272,99 272,110 L 272,112 C 272,121 264,125 245,123 L 225,123 C 212,123 210,118 210,112 L 210,105 L 228,105 L 228,110 C 228,113 234,113 245,113 L 250,113 C 255,113 255,110 255,107 L 255,101 C 255,95 245,93 235,91 L 220,89 C 210,87 210,78 210,72 L 210,70 C 210,61 216,55 235,55 L 250,55 C 264,55 272,60 272,68 Z" fill={`url(#${fullGoldId})`} />
          <path d="M 292,70 C 292,55 300,55 320,55 L 326,55 C 346,55 354,55 354,70 L 354,110 C 354,125 346,125 326,125 L 320,125 C 300,125 292,125 292,110 Z M 310,75 L 310,105 C 310,108 314,108 320,108 L 326,108 C 332,108 336,108 336,105 L 336,75 C 336,72 332,72 326,72 L 320,72 C 314,72 310,72 310,75 Z" fill={`url(#${fullGoldId})`} />
          <path d="M 436,68 L 418,68 C 418,71 411,71 405,71 L 400,71 C 390,71 390,72 390,76 L 390,104 C 390,108 390,109 400,109 L 405,109 C 411,109 418,109 418,112 L 436,112 C 436,125 423,125 408,125 L 400,125 C 382,125 374,125 374,110 L 374,70 C 374,55 382,55 400,55 L 408,55 C 423,55 436,55 436,68 Z" fill={`url(#${fullGoldId})`} />
        </g>
      </g>

      <path
        d="M 15,138 L 220,137 L 225,135 L 230,137 L 436,138 L 230,139 L 225,141 L 220,139 Z"
        fill={`url(#${fullGoldId})`}
      />

      <text
        x="225"
        y="156"
        fill={`url(#${fullGoldId})`}
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="bold"
        fontSize="11.5"
        letterSpacing="4.2"
        textAnchor="middle"
      >
        TRUST SCHOOL OF COMMUNICATIONS
      </text>
    </svg>
  );
}
