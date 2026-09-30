"use client";

import { GitBranch, Sparkles, UsersRound } from "lucide-react";
import { useState } from "react";
import { knowledgeLinks, knowledgePeople } from "../data/knowledgeTree";

export function KnowledgeTree() {
  const [selected, setSelected] = useState("anna");
  const [empty, setEmpty] = useState(false);
  const selectedPerson = knowledgePeople.find(person => person.id === selected) ?? knowledgePeople[0];
  const visiblePeople = empty ? knowledgePeople.filter(person => person.isYou) : knowledgePeople;
  const branches: Record<string, number[]> = { olga:[0,1,2,3,4,5,6,7], anna:[0,3,4,7], maxim:[1,5,6], ilya:[2], sofia:[0,3,7], alexey:[0,4], daniil:[1,5], katya:[1,6], maria:[0,3,7] };
  return <main className="knowledge-page"><section className="knowledge-heading"><div><p className="switch-kicker">ЦЕПОЧКА ПЕРЕДАЧИ ЗНАНИЙ</p><h1>Ваше древо знаний</h1><p>Наблюдайте, как опыт растёт дальше — от вас к ученикам и следующим поколениям.</p></div><button className="tree-state-toggle" onClick={() => { setEmpty(!empty); setSelected("olga"); }}>{empty ? "Показать моё древо" : "Новое дерево"}</button></section>
    <section className="knowledge-summary"><div><b>{empty ? "1" : "9"}</b><span>человек в цепочке</span></div><div><b>{empty ? "0" : "3"}</b><span>поколения знаний</span></div><div><b>{empty ? "0" : "3"}</b><span>направления</span></div></section>
    {empty ? <section className="tree-empty"><span className="tree-avatar root">О</span><div><p className="switch-kicker">ВАШ ПЕРВЫЙ УЗЕЛ</p><h2>Ваше древо знаний начинается здесь.</h2><p>Передавайте знания другим — и наблюдайте, как растёт ваше древо.</p></div></section> : <section className="tree-layout"><div className="tree-canvas-wrap"><div className="tree-canvas"><svg className="tree-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{knowledgeLinks.map(([x1,y1,x2,y2], index) => <path key={index} d={`M ${x1} ${y1} C ${x1} ${(y1+y2)/2}, ${x2} ${(y1+y2)/2}, ${x2} ${y2}`} className={branches[selectedPerson.id].includes(index) ? "active" : ""}/>)}</svg>{visiblePeople.map(person => <button key={person.id} className={`person-node ${person.id === selected ? "selected" : ""}`} style={{ left: `${person.x}%`, top: `${person.y}%` }} onMouseEnter={() => setSelected(person.id)} onFocus={() => setSelected(person.id)} onClick={() => setSelected(person.id)}><span className={`tree-avatar ${person.tone}`}>{person.initials}</span><b>{person.name}</b><small>{person.isYou ? "Вы" : person.skill}</small></button>)}</div></div>
      <aside className="tree-inspector"><span className={`tree-avatar ${selectedPerson.tone}`}>{selectedPerson.initials}</span><p className="switch-kicker">{selectedPerson.isYou ? "ВАШ ПРОФИЛЬ" : "УЗЕЛ ДРЕВА"}</p><h2>{selectedPerson.name}{selectedPerson.isYou && <em> · Вы</em>}</h2><dl><div><dt>Получил(а)</dt><dd>{selectedPerson.skill}</dd></div><div><dt>Наставник</dt><dd>{selectedPerson.mentor}</dd></div><div><dt>Передал(а) знания</dt><dd>{selectedPerson.taught} {selectedPerson.taught === 1 ? "человеку" : "людям"}</dd></div></dl><p className="tree-note"><GitBranch size={16}/> Выберите другой узел, чтобы проследить следующую ветвь.</p></aside></section>}
    <section className="tree-explanation"><Sparkles size={21}/><div><h2>Знания продолжаются дальше</h2><p>Каждая ветвь показывает, кому передали навык ваши ученики. Так SWITCH помогает видеть реальное влияние знаний.</p></div><UsersRound size={29}/></section>
  </main>;
}
