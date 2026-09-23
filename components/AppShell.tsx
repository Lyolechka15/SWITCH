"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CalendarDays, ChevronDown, LogOut, Menu, Search, Settings, UserRound, Wallet, X } from "lucide-react";
import { useState } from "react";

const nav = [
  ["Главная", "/"], ["Каталог", "/catalog"], ["Преподаватели", "/teachers"], ["Древо знаний", "/knowledge-tree"], ["Рейтинг", "/ratings"], ["Мессенджер", "/messages"],
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  return <><header className="app-header"><Link href="/" className="brand"><span className="brand-mark">S</span><span>SWITCH</span></Link><nav className={menu ? "app-nav show" : "app-nav"}>{nav.map(([label, href])=><Link key={href} href={href} className={pathname===href ? "active" : ""} onClick={()=>setMenu(false)}>{label}</Link>)}</nav><div className="app-tools"><label className="app-search"><Search size={16}/><input placeholder="Поиск" aria-label="Поиск"/></label><Link href="/wallet" className="hours-pill"><Wallet size={15}/><b>8.5</b><span>Hours</span></Link><button className="bell" aria-label="Уведомления"><Bell size={18}/><i/></button><div className="user-menu"><button onClick={()=>setOpen(!open)} className="user-trigger"><span className="avatar avatar-olga">О</span><span className="user-name">Ольга</span><ChevronDown size={15}/></button>{open&&<div className="dropdown"><Link href="/profile" onClick={()=>setOpen(false)}><UserRound size={16}/>Мой профиль</Link><Link href="/wallet" onClick={()=>setOpen(false)}><Wallet size={16}/>SWITCH Hours</Link><Link href="/calendar" onClick={()=>setOpen(false)}><CalendarDays size={16}/>Календарь</Link><Link href="/settings" onClick={()=>setOpen(false)}><Settings size={16}/>Настройки</Link><button onClick={()=>setOpen(false)}><LogOut size={16}/>Выйти</button></div>}</div><button className="mobile-toggle" onClick={()=>setMenu(!menu)} aria-label="Меню">{menu?<X/>:<Menu/>}</button></div></header>{children}</>;
}
