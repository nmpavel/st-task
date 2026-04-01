import type { ProductCardProps } from "../types/product-card";
import { formatPrice } from "../utils/format-price";

const ProductCard = ({
  imageUrl,
  title,
  price,
  category,
  currencySymbol = "৳",
}: ProductCardProps) => {
  return (
    <article
      role="listitem"
      tabIndex={0}
      aria-label={`${category} product: ${title}. Price ${currencySymbol} ${formatPrice(price)}`}
      className="group min-w-0 w-full justify-self-stretch rounded-none hover:cursor-pointer py-6 px-4 shadow-[0_8px_26px_-22px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:bg-[linear-gradient(155deg,#f8fafc_0%,#eef4ff_100%)] hover:shadow-[0_24px_40px_-24px_rgba(37,99,235,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
    >
      <div className="mb-4 h-[260px] w-full overflow-hidden rounded-xl bg-transparent">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:saturate-105"
          loading="lazy"
        />
      </div>

      <p className="mb-2 text-sm leading-none text-[#6b7280]">{category}</p>

      <h3
        className="mb-2 overflow-hidden text-[16px] leading-[22px] text-[#1f2d3d]"
        style={{ fontWeight: 525 }}
        title={title}
      >
        <span
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </span>
      </h3>

      <p className="text-[20px] leading-[22px] text-[#1882ff]" style={{ fontWeight: 475 }}>
        {currencySymbol} {formatPrice(price)}
      </p>
    </article>
  );
};

export default ProductCard;
