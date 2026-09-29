"use client";

import { ArrowRight, Grid2X2, Heart, List, Search, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { catalogCategories, skills } from "../data/catalog";
import { AppShell } from "./AppShell";

const choices = {
  category: catalogCategories,
  level: ["Любой", "Для начинающих", "Средний", "Продвинутый"],
  format: ["Любой", "Онлайн", "Очно", "Гибридный"],
  time: ["Любое", "Будни", "Выходные", "Утро", "День", "Вечер"],
};

function FilterGroup({ title, items, value, onChange }: { title: string; items: string[]; value: string; onChange: (value: string) => void }) {
  return <fieldset className="catalog-filter-group"><legend>{title}</legend>{items.map(item => <label key={item}><input type="radio" name={title} checked={value === item} onChange={() => onChange(item)} /><span>{item}</span></label>)}</fieldset>;
}

export function CatalogView() {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("Все");
  const [level, setLevel] = useState("Любой"); const [format, setFormat] = useState("Любой"); const [time, setTime] = useState("Любое");
  const [sort, setSort] = useState("popular"); const [view, setView] = useState<"grid" | "list">("grid"); const [favourites, setFavourites] = useState<string[]>([]);
  const reset = () => { setQuery(""); setCategory("Все"); setLevel("Любой"); setFormat("Любой"); setTime("Любое"); };
  const shown = useMemo(() => skills.filter(skill => {
    const matchesQuery = `${skill.title} ${skill.category}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesQuery && (category === "Все" || skill.category === category) && (level === "Любой" || skill.level === level) && (format === "Любой" || skill.format === format) && (time === "Любое" || skill.time === time);
  }).sort((a,b) => sort === "rating" ? b.rating-a.rating : sort === "teachers" ? b.teachers-a.teachers : b.reviews-a.reviews), [query, category, level, format, time, sort]);
  return <AppShell><main className="catalog-page-v3">
    <section className="catalog-intro"><p className="switch-kicker">КАТАЛОГ НАВЫКОВ</p><h1>Найдите навык,<br/>который хотите <em>освоить</em></h1><p>Более 50 направлений и сотни преподавателей.<br/>Выбирайте, фильтруйте и начинайте учиться уже сегодня!</p>
      <label className="catalog-search"><Search size={21}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Например: Python, английский, дизайн..." /></label>
      <div className="category-chips">{catalogCategories.map(item => <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
    </section>
    <section className="catalog-layout"><aside className="filter-sidebar"><div className="filter-heading"><h2><SlidersHorizontal size={17}/>Фильтры</h2><button onClick={reset}>Сбросить все</button></div><FilterGroup title="Категория" items={choices.category} value={category} onChange={setCategory}/><FilterGroup title="Уровень" items={choices.level} value={level} onChange={setLevel}/><FilterGroup title="Формат занятий" items={choices.format} value={format} onChange={setFormat}/><FilterGroup title="Доступное время" items={choices.time} value={time} onChange={setTime}/></aside>
      <div className="catalog-results"><div className="catalog-toolbar"><b>Найдено {shown.length ? "50+" : "0"} навыков</b><div><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Сортировка"><option value="popular">Сначала популярные</option><option value="rating">По рейтингу</option><option value="teachers">По количеству преподавателей</option></select><span className="view-switch"><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="Сетка"><Grid2X2 size={17}/></button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="Список"><List size={18}/></button></span></div></div>
        <div className={`skills-v3 ${view}`}>{shown.map(skill => { const Icon = skill.icon; const favourite = favourites.includes(skill.id); return <article className="skill-card-v3" key={skill.id}><div className={`skill-illustration ${skill.tone}`}><Icon size={33}/><i/><i/><button className={favourite ? "favourite on" : "favourite"} onClick={() => setFavourites(favourite ? favourites.filter(id => id !== skill.id) : [...favourites, skill.id])} aria-label="Добавить в избранное"><Heart size={18} fill={favourite ? "currentColor" : "none"}/></button></div><div className="skill-card-content"><span className="skill-badge">{skill.category}</span><h3>{skill.title}</h3><p className="skill-rating"><Star size={14} fill="currentColor"/> {skill.rating} <span>({skill.reviews})</span></p><p className="skill-details">{skill.teachers} преподавателей</p><p className="skill-level">{skill.level}{skill.level === "Для начинающих" ? " — Продвинутый" : ""}</p><Link href="/teachers">Найти наставника <ArrowRight size={16}/></Link></div></article>})}</div>{shown.length === 0 && <div className="catalog-empty">По этим фильтрам пока нет навыков. Попробуйте сбросить часть условий.</div>}</div>
    </section>
  </main></AppShell>;
}
