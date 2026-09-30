"use client";

import { ChevronDown, GitBranch, Sparkles, UserRound, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { knowledgeLinks, knowledgePeople } from "../data/knowledgeTree";

export function KnowledgeTree() {
  const [selected, setSelected] = useState("olga");
  const [empty, setEmpty] = useState(false);
  const selectedPerson = knowledgePeople.find(person => person.id === selected) ?? knowledgePeople[0];
  const activeLinks = useMemo(() => {
    const route = new Set<number>(); let cursor = selectedPerson;
    while (cursor.parentId) { const index = knowledgeLinks.findIndex(link => link.childId === cursor.id); if (index >= 0) route.add(index); cursor = knowledgePeople.find(person => person.id === cursor.parentId) ?? knowledgePeople[0]; }
    return route;
  }, [selectedPerson]);
  const chain = useMemo(() => { const result = [selectedPerson.name]; let cursor = selectedPerson; while (cursor.parentId) { cursor = knowledgePeople.find(person => person.id === cursor.parentId) ?? knowledgePeople[0]; result.unshift(cursor.name); } return result.join(" → "); }, [selectedPerson]);
  return <main className="knowledge-page"><section className="knowledge-heading"><div><p className="switch-kicker">ВЛИЯНИЕ, КОТОРОЕ РАСТЁТ</p><h1>Древо знаний</h1><p>Как знания передаются от человека к человеку.</p></div><div className="tree-controls"><label>Навык:<span><select aria-label="Выбранный навык" defaultValue="python"><option value="python">Python</option></select><ChevronDown size={14}/></span></label><button className="tree-state-toggle" onClick={() => { setEmpty(!empty); setSelected("olga"); }}>{empty ? "Показать дерево" : "Новое дерево"}</button></div></section>
    {empty ? <section className="tree-empty"><span className="tree-avatar root"><UserRound size={30}/></span><div><p className="switch-kicker">ВАШ ПЕРВЫЙ УЗЕЛ</p><h2>Ваше древо начинается здесь</h2><p>Обучайте других, и наблюдайте, как знания продолжают жить и передаваться дальше.</p></div></section> : <><section className="knowledge-summary"><div><b>8</b><span>человек в цепочке</span></div><div><b>3</b><span>поколения учеников</span></div><div><b>1</b><span>направление знаний</span></div></section><section className="tree-layout"><div className="tree-canvas-wrap"><div className="tree-canvas"><svg className="tree-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{knowledgeLinks.map((link, index) => { const parent = knowledgePeople.find(person => person.id === link.parentId)!; const child = knowledgePeople.find(person => person.id === link.childId)!; return <path key={`${link.parentId}-${link.childId}`} d={`M ${parent.x} ${parent.y + 4} C ${parent.x} ${(parent.y + child.y) / 2}, ${child.x} ${(parent.y + child.y) / 2}, ${child.x} ${child.y - 4}`} className={activeLinks.has(index) ? "active" : ""}/>; })}</svg>{knowledgePeople.map(person => <button key={person.id} className={`person-node ${person.id === selected ? "selected" : ""} ${person.isYou ? "root-node" : ""}`} style={{ left: `${person.x}%`, top: `${person.y}%` }} onMouseEnter={() => setSelected(person.id)} onFocus={() => setSelected(person.id)} onClick={() => setSelected(person.id)}><span className={`tree-avatar ${person.tone}`}><UserRound size={person.isYou ? 25 : 19}/></span><b>{person.name}{person.isYou && " · Вы"}</b><small>{person.skill}</small></button>)}</div></div>
      <aside className="tree-inspector"><span className={`tree-avatar ${selectedPerson.tone}`}><UserRound size={24}/></span><p className="switch-kicker">{selectedPerson.isYou ? "КОРЕНЬ ДРЕВА" : `${selectedPerson.generation} ПОКОЛЕНИЕ`}</p><h2>{selectedPerson.name}{selectedPerson.isYou && <em> · Вы</em>}</h2><dl><div><dt>Получил(а)</dt><dd>{selectedPerson.skill}</dd></div><div><dt>У кого обучался(ась)</dt><dd>{selectedPerson.mentor}</dd></div><div><dt>Собственных учеников</dt><dd>{selectedPerson.taught}</dd></div><div><dt>Цепочка знаний</dt><dd>{chain}</dd></div></dl><p className="tree-note"><GitBranch size={16}/> Наведите на человека, чтобы увидеть путь от Ольги.</p></aside></section></>}
    <section className="tree-explanation"><Sparkles size={21}/><div><h2>Знания продолжаются дальше</h2><p>Каждая ветвь показывает, кому передали навык ваши ученики. Так SWITCH помогает видеть реальное влияние знаний.</p></div><UsersRound size={29}/></section>
  </main>;
}
