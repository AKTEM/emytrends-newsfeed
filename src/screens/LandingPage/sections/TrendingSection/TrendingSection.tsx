
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const products = [
  {
    id: 1,
    image: "/img-20250902-wa0007.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    rating: "/frame-1000002342.svg",
    price: "$50",
  },
  {
    id: 2,
    image: "/img-20250902-wa0004.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    rating: "/frame-1000002342.svg",
    price: "$50",
  },
  {
    id: 3,
    image: "/img-20250902-wa0005.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    rating: "/frame-1000002342.svg",
    price: "$50",
  },
  {
    id: 4,
    image: "/img-20250902-wa0002.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    rating: "/frame-1000002342.svg",
    price: "$50",
  },
];

export const TrendingSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-[100px] bg-backgroundbackground-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full max-w-[1440px] mx-auto">
        <h2 className="font-semi-bold-heading-large font-[number:var(--semi-bold-heading-large-font-weight)] text-black text-[length:var(--semi-bold-heading-large-font-size)] tracking-[var(--semi-bold-heading-large-letter-spacing)] leading-[var(--semi-bold-heading-large-line-height)] [font-style:var(--semi-bold-heading-large-font-style)] text-2xl sm:text-3xl lg:text-4xl">
          TRENDING
        </h2>

        <Link to="/shop" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="h-12 sm:h-14 px-4 sm:px-5 py-4 sm:py-5 rounded-lg border-[1.5px] border-[#e3a857] bg-transparent hover:bg-tertiarytertiary-0/10 w-full"
          >
            <span className="text-tertiarytertiary-0 font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
              SHOP ALL
            </span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1440px] mx-auto">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col border-none shadow-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
          >
            <CardContent className="flex flex-col items-start justify-center gap-6 p-0">
              <img
                className="h-[200px] sm:h-[230px] lg:h-[258px] w-full object-cover rounded-lg"
                alt={product.title}
                src={product.image}
              />

              <div className="flex items-start justify-between gap-2 w-full">
                <div className="flex flex-col items-start gap-2 sm:gap-[13px] flex-1 min-w-0">
                  <p className="font-medium-body-large font-[number:var(--medium-body-large-font-weight)] text-black text-[length:var(--medium-body-large-font-size)] tracking-[var(--medium-body-large-letter-spacing)] leading-[var(--medium-body-large-line-height)] [font-style:var(--medium-body-large-font-style)] text-sm sm:text-base line-clamp-2">
                    {product.title}
                  </p>

                  <img className="w-full max-w-[120px]" alt="Rating" src={product.rating} />
                </div>

                <p className="font-semi-bold-title-medium font-[number:var(--semi-bold-title-medium-font-weight)] text-black text-[length:var(--semi-bold-title-medium-font-size)] tracking-[var(--semi-bold-title-medium-letter-spacing)] leading-[var(--semi-bold-title-medium-line-height)] whitespace-nowrap [font-style:var(--semi-bold-title-medium-font-style)] text-base sm:text-lg">
                  {product.price}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
