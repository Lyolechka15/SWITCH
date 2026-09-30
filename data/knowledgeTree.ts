export type KnowledgePerson = {
  id: string; name: string; skill: string; mentor: string; taught: number; initials: string; tone: string;
  x: number; y: number; generation: number; parentId?: string; isYou?: boolean;
};

export type KnowledgeLink = { parentId: string; childId: string };

export const knowledgePeople: KnowledgePerson[] = [
  { id: "olga", name: "Ольга", skill: "Python", mentor: "Вы — начало дерева", taught: 3, initials: "О", tone: "root", x: 50, y: 12, generation: 0, isYou: true },
  { id: "anna", name: "Анна", skill: "Python", mentor: "Ольга", taught: 2, initials: "А", tone: "lilac", x: 21, y: 35, generation: 1, parentId: "olga" },
  { id: "maxim", name: "Максим", skill: "Python", mentor: "Ольга", taught: 1, initials: "М", tone: "blue", x: 50, y: 35, generation: 1, parentId: "olga" },
  { id: "lena", name: "Лена", skill: "Python", mentor: "Ольга", taught: 0, initials: "Л", tone: "peach", x: 79, y: 35, generation: 1, parentId: "olga" },
  { id: "sofia", name: "София", skill: "Python", mentor: "Анна", taught: 1, initials: "С", tone: "pink", x: 12, y: 59, generation: 2, parentId: "anna" },
  { id: "alexey", name: "Алексей", skill: "Python", mentor: "Анна", taught: 0, initials: "А", tone: "mint", x: 31, y: 59, generation: 2, parentId: "anna" },
  { id: "daniil", name: "Даниил", skill: "Python", mentor: "Максим", taught: 0, initials: "Д", tone: "yellow", x: 50, y: 59, generation: 2, parentId: "maxim" },
  { id: "maria", name: "Мария", skill: "Python", mentor: "София", taught: 0, initials: "М", tone: "violet", x: 12, y: 82, generation: 3, parentId: "sofia" },
];

export const knowledgeLinks: KnowledgeLink[] = [
  { parentId: "olga", childId: "anna" }, { parentId: "olga", childId: "maxim" }, { parentId: "olga", childId: "lena" },
  { parentId: "anna", childId: "sofia" }, { parentId: "anna", childId: "alexey" }, { parentId: "maxim", childId: "daniil" },
  { parentId: "sofia", childId: "maria" },
];
