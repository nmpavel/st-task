const ProductCardSkeleton = () => {
  return (
    <article
      aria-hidden="true"
      className="min-w-0 w-full justify-self-stretch rounded-none py-6 px-4 shadow-[0_8px_26px_-22px_rgba(15,23,42,0.45)]"
    >
      <div className="mb-4 h-[260px] w-full animate-pulse rounded-xl bg-slate-200/80" />
      <div className="mb-2 h-3.5 w-20 animate-pulse rounded bg-slate-200/80" />
      <div className="mb-2 h-[22px] w-[92%] animate-pulse rounded bg-slate-300/80" />
      <div className="h-[22px] w-28 animate-pulse rounded bg-blue-200/80" />
    </article>
  );
};

export default ProductCardSkeleton;
