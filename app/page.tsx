import Link from "next/link";
import { ArrowRight, BookOpen, Braces, CheckCircle2, Languages, Palette, Sparkles, UsersRound } from "lucide-react";
import { AppShell } from "../components/AppShell";

export const dynamic = "force-static";

const directions = [
  ["Языки", "Английский, китайский и др.", Languages, "lavender"], ["Программирование", "Python, Java, веб-разработка", Braces, "blue"],
  ["Дизайн", "Графический, UI/UX и др.", Palette, "pink"], ["Учёба", "Школьные предметы, подготовка к экзаменам", BookOpen, "yellow"],
  ["Творчество", "Рисование, фото, музыка и др.", Sparkles, "peach"], ["Бизнес", "Маркетинг, менеджмент и др.", UsersRound, "mint"],
] as const;
const steps = [["01", "Создайте профиль", "Расскажите о своих навыках и интересах"], ["02", "Найдите наставника", "Или станьте им сами"], ["03", "Обменивайтесь знаниями", "Проводите занятия в удобном формате"], ["04", "Получайте SWITCH Hours", "За преподавание и развивайтесь дальше"]];

function Orb() { return <div className="switch-orb" aria-hidden="true"><div className="orb-shape"/><div className="orb-ring ring-one"/><div className="orb-ring ring-two"/><div className="orb-spark spark-one">✦</div><div className="orb-spark spark-two">✦</div><div className="hero-float balance-card"><strong>+ 8.5 <small>Hours</small></strong><span>Ваш баланс</span></div><div className="hero-float float-directions"><b>Развивайтесь</b><span>в любимых направлениях</span></div><div className="hero-float float-people"><b>Встречайте</b><span>интересных людей</span></div><div className="hero-float float-knowledge"><b>Делитесь знаниями</b><span>и получайте новый опыт</span></div></div> }

export default function Home() { return <AppShell><main className="home-v3">
  <section className="v3-hero"><div className="v3-hero-copy"><p className="switch-kicker">ОБМЕН ЗНАНИЯМИ · РАЗВИТИЕ · НОВЫЕ ВОЗМОЖНОСТИ</p><h1>Обменивайтесь<br/><em>навыками</em><br/>и развивайтесь вместе</h1><p>SWITCH — платформа, где каждый может учить<br/>и учиться, делясь своими знаниями и временем.<br/>Без денег. Только знания, люди и возможности.</p><div className="hero-cta"><Link href="/catalog" className="dark-cta">Найти навык <ArrowRight size={18}/></Link><Link href="/teachers" className="quiet-cta">Стать преподавателем</Link></div></div><Orb/></section>
  <section className="home-stats">{[["1000+", "активных пользователей"], ["50+", "направлений"], ["4.9", "средний рейтинг"], ["Реальное", "сообщество единомышленников"]].map(([value,label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</section>
  <section className="home-section directions-section"><div className="section-v3-heading"><div><p className="switch-kicker">ИССЛЕДУЙТЕ ВОЗМОЖНОСТИ</p><h2>Популярные направления</h2></div><Link href="/catalog">Смотреть все <ArrowRight size={16}/></Link></div><div className="directions-grid">{directions.map(([name, text, Icon, tone]) => <Link href="/catalog" className="direction-card" key={name}><span className={`direction-icon ${tone}`}><Icon size={22}/></span><h3>{name}</h3><p>{text}</p><ArrowRight size={17}/></Link>)}</div></section>
  <section className="how-section"><div className="home-section"><div className="section-v3-heading centered"><div><p className="switch-kicker">ПРОСТОЙ ПУТЬ К НОВОМУ</p><h2>Как это работает?</h2></div></div><div className="how-grid">{steps.map(([number,title,text]) => <article key={number}><span>{number}</span><i/><CheckCircle2 size={22}/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  <section className="bottom-cta"><div><p className="switch-kicker">SWITCH — ЭТО БОЛЬШЕ, ЧЕМ ОБУЧЕНИЕ</p><h2>Знания меняют людей.<br/><em>Люди меняют мир.</em></h2></div><div><p>Присоединяйтесь к сообществу SWITCH<br/>и станьте частью чего-то большего.</p><Link href="/catalog">Начать сейчас <ArrowRight size={18}/></Link></div></section>
</main></AppShell>; }
