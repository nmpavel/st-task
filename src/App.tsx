import { ChevronDown, Search } from "lucide-react";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import ProductCard from "./components/ProductCard";
import { useProducts } from "./hooks/useProducts";

const App = () => {
  const {
    products,
    loading,
    isFetching,
    error,
    page,
    limit,
    totalPages,
    category,
    search,
    setCategory,
    setSearch,
    nextPage,
    prevPage,
    retry,
  } = useProducts({ initialLimit: 8 });

  const canGoPrev = page > 1 && !loading;
  const canGoNext = page < totalPages && !loading;

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8 rounded-2xl border border-[var(--border)] bg-white/80 p-8 shadow-[0_4px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl">
        <h1 className="mb-2 text-[2rem] font-semibold">
          Premium Products
        </h1>
        <p className="text-[var(--text-muted)]">
          Browse our collection. Handling the flaky API gracefully is part of the challenge.
        </p>
      </header>

      <section
        aria-label="Product controls"
        className="mb-8 flex flex-col md:flex-row gap-4"
      >
        <div
          className="flex max-w-[400px] flex-1 items-center rounded-2xl border border-[var(--border)] bg-white/80 px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
        >
          <Search size={20} color="var(--text-muted)" className="mr-3" />
          <input
            type="text"
            value={search ?? ""}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full border-none bg-transparent text-base text-[var(--text-main)] outline-none focus-visible:outline-none"
          />
        </div>

        <div className="relative flex min-w-[220px] items-center rounded-2xl border border-[var(--border)] bg-white/80 shadow-[0_4px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl">
          <select
            className="peer w-full appearance-none rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(248,250,252,0.96))] py-3 pl-4 pr-10 text-base text-[var(--text-main)] outline-none transition focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-200"
            value={category ?? ""}
            onChange={(event) => setCategory(event.target.value || undefined)}
            aria-label="Filter products by category"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
            <option value="outdoors">Outdoors</option>
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 text-[var(--text-muted)] transition peer-focus-visible:text-[var(--primary)]"
            aria-hidden="true"
          />
        </div>
      </section>

      <main>
        {isFetching && !loading && (
          <div
            className="mb-4 rounded-2xl border border-blue-200 bg-[linear-gradient(120deg,rgba(219,234,254,0.62),rgba(255,255,255,0.85))] px-4 py-3"
            role="status"
            aria-live="polite"
          >
            Updating products...
          </div>
        )}

        {error && (
          <div
            className="mb-4 rounded-2xl border border-red-200 bg-[linear-gradient(120deg,rgba(254,226,226,0.6),rgba(255,255,255,0.86))] p-4 shadow-[0_10px_30px_-20px_rgba(239,68,68,0.7)]"
            role="alert"
            aria-live="assertive"
          >
            <p className="mb-3 text-[var(--error)]">{error}</p>
            <button
              className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-[0.95rem] font-medium text-white transition hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={retry}
              aria-label="Retry loading"
            >
              Try again
            </button>
          </div>
        )}

        <section
          role="list"
          aria-label="Product results"
          aria-busy={loading}
          className="mb-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-3 md:gap-4"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.name}
              price={product.price}
              category={product.category}
            />
          ))}
          {loading &&
            Array.from({ length: limit }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
        </section>

        {!loading && !error && products.length === 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-4 text-center shadow-[0_4px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl">
            No products found.
          </div>
        )}

        <nav
          aria-label="Pagination"
          className="mt-4 flex items-center justify-center gap-3"
        >
          <button
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-[0.95rem] font-medium text-white transition hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={prevPage}
            disabled={!canGoPrev}
            aria-label="Go to previous page"
          >
            Previous
          </button>
          <p aria-live="polite" className="min-w-[120px] text-center">
            Page {page} of {Math.max(totalPages, 1)}
          </p>
          <button
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-[0.95rem] font-medium text-white transition hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={nextPage}
            disabled={!canGoNext}
            aria-label="Go to next page"
          >
            Next
          </button>
        </nav>
      </main>

    </div>
  );
};

export default App;
