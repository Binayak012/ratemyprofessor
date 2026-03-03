import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      className="col-span-12 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500 mb-2"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-gray-600">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-400">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
