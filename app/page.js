import Product from "@/components/Product";
import { Button } from "@/components/ui/button";

const Products = [
  {
    id: 1,
    name: "HEADPHONES",
    image: "/HEADPHONES.png",
  },
  {
    id: 2,
    name: "SPEAKERS",
    image: "/SPEAKERS.png",
  },
  {
    id: 3,
    name: "EARPHONES",
    image: "/EARPHONES.png",
  },
];

export default function Home() {
  return (
    <>
      <header className="bg-[#0F0F0F] font-light hidden md:block text-white px-6">
        <div className="max-w-[1110px] m-auto py-30 bg-[url('../public/hero-image.png')] bg-no-repeat bg-size-[650px] bg-position-[right_0_bottom_-150px]">
          <p className="text-white/40 text-[14px] tracking-[10px]">
            NEW PRODUCT
          </p>
          <h1 className="text-[56px] max-w-[393px] leading-14 my-6 tracking-[2px]">
            XX99 Mark II Headphones
          </h1>
          <p className="max-w-[40ch] text-white/70 mb-10  font-light text-[15px]">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Button className="bg-orange-400 cursor-pointer tracking-[1px] text-[13px] px-7 py-5 font-light hover:bg-orange-300">
            See Product
          </Button>
        </div>
      </header>
      <main className="max-w-[1110px] m-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-25 pt-30 md:pt-50 pb-30">
          {Products.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              image={product.image}
            />
          ))}
        </div>
      </main>
    </>
  );
}
