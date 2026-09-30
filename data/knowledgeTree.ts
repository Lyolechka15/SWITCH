export type KnowledgePerson = {
  id: string; name: string; skill: string; mentor: string; taught: number; initials: string; tone: string;
  x: number; y: number; isYou?: boolean;
};

export const knowledgePeople: KnowledgePerson[] = [
  { id: "olga", name: "Ольга", skill: "Python", mentor: "Первый узел", taught: 3, initials: "О", tone: "root", x: 50, y: 82, isYou: true },
  { id: "anna", name: "Анна", skill: "Английский язык", mentor: "Ольга", taught: 2, initials: "А", tone: "lilac", x: 20, y: 57 },
  { id: "maxim", name: "Максим", skill: "Python", mentor: "Ольга", taught: 2, initials: "М", tone: "blue", x: 50, y: 57 },
  { id: "ilya", name: "Илья", skill: "Веб-разработка", mentor: "Ольга", taught: 0, initials: "И", tone: "peach", x: 80, y: 57 },
  { id: "sofia", name: "София", skill: "Английский язык", mentor: "Анна", taught: 1, initials: "С", tone: "pink", x: 10, y: 31 },
  { id: "alexey", name: "Алексей", skill: "Английский язык", mentor: "Анна", taught: 0, initials: "А", tone: "mint", x: 30, y: 31 },
  { id: "daniil", name: "Даниил", skill: "Python", mentor: "Максим", taught: 0, initials: "Д", tone: "yellow", x: 43, y: 31 },
  { id: "katya", name: "Катя", skill: "Python", mentor: "Максим", taught: 0, initials: "К", tone: "rose", x: 60, y: 31 },
  { id: "maria", name: "Мария", skill: "Английский язык", mentor: "София", taught: 0, initials: "М", tone: "violet", x: 10, y: 10 },
];

export const knowledgeLinks = [
  [50, 78, 20, 61], [50, 78, 50, 61], [50, 78, 80, 61], [20, 53, 10, 35], [20, 53, 30, 35],
  [50, 53, 43, 35], [50, 53, 60, 35], [10, 27, 10, 14],
];
