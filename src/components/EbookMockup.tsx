interface EbookMockupProps {
  mode: 'cover' | 'book' | 'tablet' | 'phone' | 'page';
  imageSrc: string;
  imageSrcSet?: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * Presentación editorial del e-book y páginas reales extraídas del PDF
 * preservando proporciones, tipografía y paleta originales sin alteraciones.
 */
export function EbookMockup({
  mode,
  imageSrc,
  imageSrcSet,
  alt,
  priority = false,
  className = '',
}: EbookMockupProps) {
  const imgProps = {
    src: imageSrc,
    srcSet: imageSrcSet,
    alt,
    referrerPolicy: 'no-referrer' as const,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    decoding: priority ? ('sync' as const) : ('async' as const),
    fetchPriority: priority ? ('high' as const) : ('auto' as const),
  };

  if (mode === 'book') {
    return (
      <div className={`relative mx-auto w-full max-w-[340px] sm:max-w-[380px] ${className}`}>
        <div className="relative rounded-r-[10px] rounded-l-[4px] bg-[#FFFFFF] border border-[#DCE5E0] shadow-[0_24px_48px_-20px_rgba(8,72,59,0.28)] overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-[#202A26]/18 via-[#202A26]/5 to-transparent z-10"
          />
          <img
            {...imgProps}
            width={1200}
            height={1697}
            className="block w-full aspect-[1200/1697] object-cover"
          />
        </div>
      </div>
    );
  }

  if (mode === 'tablet') {
    return (
      <div className={`mx-auto w-full max-w-[360px] ${className}`}>
        <div className="rounded-[20px] bg-[#202A26] p-3 sm:p-4 border border-[#626C67]/30 shadow-[0_20px_40px_-24px_rgba(8,72,59,0.28)]">
          <div className="rounded-[12px] overflow-hidden bg-[#FAF8F3] border border-[#DCE5E0]">
            <img
              {...imgProps}
              width={1200}
              height={1697}
              className="block w-full aspect-[1200/1697] object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'phone') {
    return (
      <div className={`mx-auto w-full max-w-[270px] ${className}`}>
        <div className="rounded-[28px] bg-[#202A26] p-2.5 sm:p-3 border border-[#626C67]/40 shadow-[0_20px_40px_-22px_rgba(8,72,59,0.3)]">
          <div
            aria-hidden="true"
            className="mx-auto mb-2 h-1 w-12 rounded-full bg-[#626C67]/50"
          />
          <div className="rounded-[18px] overflow-hidden bg-[#FAF8F3] border border-[#DCE5E0]">
            <img
              {...imgProps}
              width={1200}
              height={1697}
              className="block w-full aspect-[1200/1697] object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-auto w-full max-w-[340px] ${className}`}>
      <div className="rounded-[8px] overflow-hidden bg-[#FFFFFF] border border-[#DCE5E0] shadow-[0_14px_32px_-20px_rgba(32,42,38,0.22)]">
        <img
          {...imgProps}
          width={1200}
          height={1697}
          className="block w-full aspect-[1200/1697] object-cover"
        />
      </div>
    </div>
  );
}
