import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

const quickLinks = [
  { label: "Home" },
  { label: "Shop" },
  { label: "Learn" },
  { label: "Blog" },
];

const supportItems = [
  {
    icon: PhoneIcon,
    text: "(603) 555-0123",
  },
  {
    icon: MailIcon,
    text: "alma.lawson@example.com",
  },
  {
    icon: MapPinIcon,
    text: "Location: Ontario, Canada",
  },
];

const policyLinks = [
  { label: "Refund Policies" },
  { label: "Return & Exchanges" },
  { label: "Shipping & Deliveries" },
  { label: "Payment & Pricing" },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-start gap-8 sm:gap-10 pt-12 sm:pt-16 pb-6 px-4 sm:px-8 lg:px-12 bg-primaryprimary-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-6 w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col items-start gap-4 sm:gap-6">
          <h3 className="font-semi-bold-title-medium font-[number:var(--semi-bold-title-medium-font-weight)] text-white text-[length:var(--semi-bold-title-medium-font-size)] tracking-[var(--semi-bold-title-medium-letter-spacing)] leading-[var(--semi-bold-title-medium-line-height)] [font-style:var(--semi-bold-title-medium-font-style)]">
            Quick Links
          </h3>

          <nav className="flex flex-col items-start gap-4 w-full">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="font-[number:var(--medium-body-large-font-weight)] tracking-[var(--medium-body-large-letter-spacing)] font-medium-body-large text-white text-[length:var(--medium-body-large-font-size)] leading-[var(--medium-body-large-line-height)] [font-style:var(--medium-body-large-font-style)] hover:opacity-80 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-4 sm:gap-6">
          <h3 className="[font-family:'Inter',Helvetica] font-semibold text-white text-xl tracking-[0.03px] leading-6">
            Support
          </h3>

          <div className="flex flex-col items-start gap-4 w-full">
            {supportItems.map((item, index) => (
              <div key={index} className="flex items-start gap-2.5 w-full">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5" />
                <span className="[font-family:'Inter',Helvetica] font-normal text-white text-sm sm:text-base tracking-[0.04px] leading-5 break-words">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-6">
          <h3 className="[font-family:'Inter',Helvetica] font-semibold text-white text-xl tracking-[0.02px] leading-5 whitespace-nowrap">
            Policies
          </h3>

          <nav className="flex flex-col items-start gap-4">
            {policyLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="font-[number:var(--medium-body-large-font-weight)] tracking-[var(--medium-body-large-letter-spacing)] font-medium-body-large text-white text-[length:var(--medium-body-large-font-size)] leading-[var(--medium-body-large-line-height)] [font-style:var(--medium-body-large-font-style)] hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-4 sm:gap-6">
          <h3 className="[font-family:'Inter',Helvetica] font-semibold text-white text-xl tracking-[0.03px] leading-6">
            connect With Us
          </h3>

          <div className="flex flex-col items-start gap-4 w-full">
            <p className="[font-family:'Inter',Helvetica] font-medium text-white text-sm sm:text-base tracking-[0.04px] leading-5">
              Follow us for hair tips and exclusive offers
            </p>

            <img
              className="w-auto h-auto max-w-full"
              alt="Social media icons"
              src="/frame-1321316456.svg"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-6 pb-2.5 w-full border-t border-[#c9c9c9] max-w-[1440px] mx-auto">
        <p className="[font-family:'Inter',Helvetica] font-normal text-white text-sm sm:text-base lg:text-lg text-center tracking-[0.04px] leading-5 px-4">
          Copyright © 2024. KurtHair. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
