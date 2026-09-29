import { BookOpen, Braces, Camera, Languages, LayoutPanelTop, Palette, PenTool, Sigma, Sparkles } from "lucide-react";

export const catalogCategories = ["Все", "Языки", "Программирование", "Дизайн", "Учёба", "Творчество", "Бизнес", "Другое"];

export type Skill = {
  id: string; title: string; category: string; rating: number; reviews: number; teachers: number;
  level: string; format: "Онлайн" | "Очно" | "Гибридный"; time: "Будни" | "Выходные" | "Утро" | "День" | "Вечер";
  icon: typeof BookOpen; tone: string;
};

export const skills: Skill[] = [
  { id:"english", title:"Английский язык", category:"Языки", rating:4.9, reviews:124, teachers:34, level:"Средний", format:"Гибридный", time:"Вечер", icon:Languages, tone:"lavender" },
  { id:"python", title:"Python", category:"Программирование", rating:4.8, reviews:96, teachers:28, level:"Для начинающих", format:"Онлайн", time:"Будни", icon:Braces, tone:"blue" },
  { id:"chinese", title:"Китайский язык", category:"Языки", rating:4.9, reviews:58, teachers:16, level:"Для начинающих", format:"Онлайн", time:"Выходные", icon:Languages, tone:"peach" },
  { id:"web", title:"Веб-разработка", category:"Программирование", rating:4.7, reviews:82, teachers:24, level:"Средний", format:"Онлайн", time:"Вечер", icon:LayoutPanelTop, tone:"mint" },
  { id:"graphic", title:"Графический дизайн", category:"Дизайн", rating:4.8, reviews:71, teachers:19, level:"Для начинающих", format:"Гибридный", time:"День", icon:Palette, tone:"pink" },
  { id:"math", title:"Математика", category:"Учёба", rating:4.9, reviews:111, teachers:31, level:"Продвинутый", format:"Онлайн", time:"Будни", icon:Sigma, tone:"yellow" },
  { id:"ege", title:"Подготовка к ЕГЭ", category:"Учёба", rating:4.8, reviews:103, teachers:27, level:"Средний", format:"Очно", time:"Выходные", icon:BookOpen, tone:"coral" },
  { id:"photo", title:"Фотография", category:"Творчество", rating:4.7, reviews:45, teachers:12, level:"Для начинающих", format:"Очно", time:"Утро", icon:Camera, tone:"sky" },
  { id:"ux", title:"UI/UX дизайн", category:"Дизайн", rating:4.9, reviews:88, teachers:22, level:"Средний", format:"Онлайн", time:"Вечер", icon:PenTool, tone:"violet" },
  { id:"marketing", title:"Основы маркетинга", category:"Бизнес", rating:4.7, reviews:39, teachers:11, level:"Для начинающих", format:"Гибридный", time:"День", icon:Sparkles, tone:"sand" },
  { id:"music", title:"Музыкальная теория", category:"Творчество", rating:4.6, reviews:26, teachers:8, level:"Для начинающих", format:"Очно", time:"Выходные", icon:Sparkles, tone:"lilac" },
  { id:"other", title:"Публичные выступления", category:"Другое", rating:4.8, reviews:51, teachers:14, level:"Средний", format:"Гибридный", time:"Вечер", icon:BookOpen, tone:"rose" },
];
