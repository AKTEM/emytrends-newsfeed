
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../../components/ui/card";

const hairExtensionProducts = [
  {
    id: 1,
    image: "/image-31.png",
    title: "Raw Wavy Hair",
    imageClass: "h-[274px]",
  },
  {
    id: 2,
    image: "/img-20250902-wa0008.png",
    title: "Seamless Clip-Ins",
    imageClass: "h-[278px]",
  },
  {
    id: 3,
    image: "/image-31-1.png",
    title: "Seamless Clip-Ins",
    imageClass: "h-[274px]",
  },
  {
    id: 4,
    image: "/image-31-2.png",
    title: "Seamless Clip-Ins",
    imageClass: "h-[274px]",
  },
];

export const HairExtensionsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-6 sm:gap-8 lg:gap-10 pt-12 sm:pt-16 lg:pt-[100px] pb-0 px-4 sm:px-8 lg:px-12 bg-backgroundbackground-2">
      <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-4 w-full max-w-[1440px] mx-auto">
        <h2 className="w-full font-semi-bold-display-medium font-[number:var(--semi-bold-display-medium-font-weight)] text-black text-[length:var(--semi-bold-display-medium-font-size)] tracking-[var(--semi-bold-display-medium-letter-spacing)] leading-[var(--semi-bold-display-medium-line-height)] [font-style:var(--semi-bold-display-medium-font-style)] text-2xl sm:text-3xl lg:text-4xl">
          Unlocking the Secrets of Hair Extensions
        </h2>

        <p className="w-full font-regular-title-large font-[number:var(--regular-title-large-font-weight)] text-black text-[length:var(--regular-title-large-font-size)] tracking-[var(--regular-title-large-letter-spacing)] leading-[var(--regular-title-large-line-height)] [font-style:var(--regular-title-large-font-style)] text-base sm:text-lg lg:text-xl">
          Not sure which extensions suit you best? We&#39;re here to guide you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1440px] mx-auto">
        {hairExtensionProducts.map((product) => (
          <Link key={product.id} to="/shop">
            <Card className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
              <CardContent className="flex flex-col items-start justify-center gap-4 sm:gap-6 p-0">
                <img
                  className="w-full object-cover h-[250px] sm:h-[270px] lg:h-[274px]"
                  alt={product.title}
                  src={product.image}
                />

                <div className="flex items-start justify-around w-full px-4 pb-4">
                  <h3 className="flex-1 font-semi-bold-title-large font-[number:var(--semi-bold-title-large-font-weight)] text-black text-[length:var(--semi-bold-title-large-font-size)] tracking-[var(--semi-bold-title-large-letter-spacing)] leading-[var(--semi-bold-title-large-line-height)] [font-style:var(--semi-bold-title-large-font-style)] text-base sm:text-lg">
                    {product.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
