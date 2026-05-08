"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/locations", label: "Locations" },
  { href: "/admin/segments", label: "Segments" },
] as const;

export function AdminSectionNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Admin sections"
      className="-mx-1 flex gap-2 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin]"
    >
      {links.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
              active
                ? "bg-slate-900 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-teal-300 hover:text-slate-900"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
