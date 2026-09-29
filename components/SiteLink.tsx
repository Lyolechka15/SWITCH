import type { AnchorHTMLAttributes, ReactNode } from "react";

export const GITHUB_PAGES_BASE = "/SWITCH";

export function siteHref(path: string) {
  if (/^(?:[a-z]+:|#)/i.test(path)) return path;
  const route = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;
  return route === "/" ? `${GITHUB_PAGES_BASE}/` : `${GITHUB_PAGES_BASE}${route}`;
}

export function siteRoute(path: string) {
  const route = path.replace(new RegExp(`^${GITHUB_PAGES_BASE}(?=/|$)`), "");
  return route || "/";
}

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function SiteLink({ href, children, ...props }: SiteLinkProps) {
  return <a href={siteHref(href)} {...props}>{children}</a>;
}
