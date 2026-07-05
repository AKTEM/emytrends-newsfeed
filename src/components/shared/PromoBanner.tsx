import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { getSiteSettings } from "../../lib/firebaseSiteSettings";

const PROMO_CACHE_KEY = "promoText_cache_v1";

// Module-level cache so navigation between pages doesn't refetch/flash
let cachedPromoText: string | null =
  typeof window !== "undefined" ? window.localStorage.getItem(PROMO_CACHE_KEY) : null;
let inflight: Promise<string> | null = null;

const loadPromo = (): Promise<string> => {
  if (inflight) return inflight;
  inflight = getSiteSettings()
    .then((s) => {
      cachedPromoText = s.promoText;
      try {
        window.localStorage.setItem(PROMO_CACHE_KEY, s.promoText);
      } catch {}
      return s.promoText;
    })
    .catch(() => cachedPromoText ?? "");
  return inflight;
};

export const PromoBanner = (): JSX.Element => {
  const [promoText, setPromoText] = useState<string>(cachedPromoText ?? "");

  useEffect(() => {
    let mounted = true;
    loadPromo().then((text) => {
      if (mounted && text !== promoText) setPromoText(text);
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-8 sm:h-10 px-4 sm:px-12 bg-backgroundbackground-0">
      <button className="p-1.5 sm:p-2.5 hover:opacity-80 transition-opacity">
        <ChevronLeftIcon className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      <div className="inline-flex items-center justify-center gap-6 flex-1 px-2 min-h-[1em]">
        <div className="font-medium-body-large font-[number:var(--medium-body-large-font-weight)] text-textprimary-text text-[length:var(--medium-body-large-font-size)] tracking-[var(--medium-body-large-letter-spacing)] leading-[var(--medium-body-large-line-height)] text-center [font-style:var(--medium-body-large-font-style)] text-xs sm:text-sm md:text-base">
          {promoText}
        </div>
      </div>

      <button className="p-1.5 sm:p-2.5 hover:opacity-80 transition-opacity">
        <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};
