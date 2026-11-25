import { siteConfig } from '../config/siteConfig';

interface BrandMarkProps {
  variant?: 'light' | 'dark';
}

export function BrandMark({ variant = 'light' }: BrandMarkProps) {
  const displayName = siteConfig.brandName.trim() || siteConfig.editorialLabel;
  const textColor = variant === 'dark' ? 'text-[#FAF8F3]' : 'text-[#202A26]';
  const ringColor = variant === 'dark' ? '#C6A15B' : '#0B6856';
  const leafColor = variant === 'dark' ? '#FAF8F3' : '#08483B';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1.5" y="1.5" width="29" height="29" rx="7" stroke={ringColor} strokeWidth="1.4" />
        <path
          d="M16 7.5C12.2 11.4 10.2 15.2 10.2 19.1C10.2 22.5 12.8 25 16 25C19.2 25 21.8 22.5 21.8 19.1C21.8 15.2 19.8 11.4 16 7.5Z"
          stroke={leafColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M16 11.5V25" stroke="#C6A15B" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M16 17.5L19.4 14.8" stroke="#C6A15B" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span className={`font-display text-lg font-semibold tracking-tight ${textColor}`}>
        {displayName}
      </span>
    </span>
  );
}
