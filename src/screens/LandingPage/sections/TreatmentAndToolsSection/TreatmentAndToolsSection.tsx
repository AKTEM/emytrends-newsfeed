
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const products = [
  {
    image: "/image.png",
    title: "silk Seam Clip-In \nCaramel Latter Roted Highlight",
    price: "$50",
    bgColor: "bg-[#cccccc]",
  },
  {
    image: "/image-33.png",
    title: "silk Seam Clip-In \nCaramel Latter Roted Highlight",
    price: "$50",
    bgColor: "bg-white",
  },
  {
    image: "/image-36.png",
    title: "silk Seam Clip-In \nCaramel Latter Roted Highlight",
    price: "$50",
    bgColor: "bg-white",
  },
  {
    image: "/image-35.png",
    title: "silk Seam Clip-In \nCaramel Latter Roted Highlight",
    price: "$50",
    bgColor: "bg-white",
  },
];

export const TreatmentAndToolsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-[100px] bg-backgroundbackground-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full max-w-[1440px]">
        <h2 className="font-semi-bold-heading-large font-[number:var(--semi-bold-heading-large-font-weight)] text-black text-[length:var(--semi-bold-heading-large-font-size)] tracking-[var(--semi-bold-heading-large-letter-spacing)] leading-[var(--semi-bold-heading-large-line-height)] [font-style:var(--semi-bold-heading-large-font-style)] text-2xl sm:text-3xl lg:text-4xl">
          TREATMENT &amp; TOOLS
        </h2>

        <Button
          variant="outline"
          className="w-full sm:w-[200px] h-12 sm:h-14 gap-2.5 p-4 sm:p-5 rounded-lg border-[1.5px] border-[#e3a857] bg-transparent hover:bg-transparent"
        >
          <span className="text-tertiarytertiary-0 font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
            SHOP ALL
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1440px]">
        {products.map((product, index) => (
          <Card
            key={index}
            className="flex flex-col gap-4 border-0 shadow-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
          >
            <CardContent className="p-0 flex flex-col gap-4">
              <div
                className={`flex items-center gap-2.5 w-full ${product.bgColor} overflow-hidden rounded-lg`}
              >
                <img
                  className="w-full h-[280px] sm:h-[300px] lg:h-[318px] object-cover"
                  alt="Image"
                  src={product.image}
                />
              </div>

              <div className="flex items-start justify-between gap-2 w-full">
                <div className="flex flex-col flex-1 items-start gap-2 sm:gap-[13px] min-w-0">
                  <p className="[font-family:'Inter',Helvetica] font-medium text-black text-sm sm:text-base tracking-[0] leading-6 whitespace-pre-line line-clamp-2">
                    {product.title}
                  </p>
                </div>

                <div className="font-semi-bold-title-medium font-[number:var(--semi-bold-title-medium-font-weight)] text-black text-[length:var(--semi-bold-title-medium-font-size)] tracking-[var(--semi-bold-title-medium-letter-spacing)] leading-[var(--semi-bold-title-medium-line-height)] whitespace-nowrap [font-style:var(--semi-bold-title-medium-font-style)] text-base sm:text-lg">
                  {product.price}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
