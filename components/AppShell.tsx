"use client";

import { usePathname } from "next/navigation";
import { Bell, CalendarDays, ChevronDown, LogOut, Menu, Search, Settings, UserRound, Wallet, X } from "lucide-react";
import { useState } from "react";
import { SiteLink, siteRoute } from "./SiteLink";

const nav = [
  ["Главная", "/"], ["Каталог", "/catalog"], ["Преподаватели", "/teachers"], ["Древо знаний", "/knowledge-tree"], ["Рейтинг", "/ratings"], ["Мессенджер", "/messages"],
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  return <><header className="app-header"><div className="brand" aria-label="SWITCH"><span className="brand-mark">S</span><span>SWITCH</span></div><nav className={menu ? "app-nav show" : "app-nav"}>{nav.map(([label, href])=><SiteLink key={href} href={href} className={siteRoute(pathname)===href ? "active" : ""} onClick={()=>setMenu(false)}>{label}</SiteLink>)}</nav><div className="app-tools"><label className="app-search"><Search size={16}/><input placeholder="Поиск" aria-label="Поиск"/></label><SiteLink href="/wallet" className="hours-pill"><Wallet size={15}/><b>8.5</b><span>Hours</span></SiteLink><button className="bell" aria-label="Уведомления"><Bell size={18}/><i/></button><div className="user-menu"><button onClick={()=>setOpen(!open)} className="user-trigger"><span className="avatar avatar-olga">О</span><span className="user-name">Ольга</span><ChevronDown size={15}/></button>{open&&<div className="dropdown"><SiteLink href="/profile" onClick={()=>setOpen(false)}><UserRound size={16}/>Мой профиль</SiteLink><SiteLink href="/wallet" onClick={()=>setOpen(false)}><Wallet size={16}/>SWITCH Hours</SiteLink><SiteLink href="/calendar" onClick={()=>setOpen(false)}><CalendarDays size={16}/>Календарь</SiteLink><SiteLink href="/settings" onClick={()=>setOpen(false)}><Settings size={16}/>Настройки</SiteLink><button onClick={()=>setOpen(false)}><LogOut size={16}/>Выйти</button></div>}</div><button className="mobile-toggle" onClick={()=>setMenu(!menu)} aria-label="Меню">{menu?<X/>:<Menu/>}</button></div></header>{children}</>;
}
