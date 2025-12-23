import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { getSiteSettings } from "../../lib/firebaseSiteSettings";

export const PromoBanner = (): JSX.Element => {
  const [promoText, setPromoText] = useState("Get 50% Discount On Every Item Purchased On Christmas Day");
  
  useEffect(() => {
    const loadPromoText = async () => {
      const settings = await getSiteSettings();
      setPromoText(settings.promoText);
    };
    loadPromoText();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-8 sm:h-10 px-4 sm:px-12 bg-backgroundbackground-0">
      <button className="p-1.5 sm:p-2.5 hover:opacity-80 transition-opacity">
        <ChevronLeftIcon className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      
      <div className="inline-flex items-center justify-center gap-6 flex-1 px-2">
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
