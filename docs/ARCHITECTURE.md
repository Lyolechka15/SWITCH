# SWITCH — Архитектура проекта

## 1. Назначение документа

Этот документ фиксирует контрольную точку **v0.2**: модули, зависимости, хранение данных и рассмотренные архитектурные альтернативы SWITCH. Он описывает фактическое состояние репозитория на момент подготовки документа и целевую архитектуру MVP.

- ✅ **Реализовано** — находится в коде и работает как часть текущего проекта.
- 🟡 **Частично реализовано** — есть интерфейс или техническая основа, но нет полной бизнес-логики/постоянных данных.
- ⏳ **Запланировано** — целевая часть MVP, которой пока нет в репозитории или production.

## 2. Общая архитектура SWITCH

Сейчас в production опубликован только статический frontend. Fastify API существует в репозитории и может запускаться локально, но не опубликован; Supabase и PostgreSQL пока не подключены.

```mermaid
flowchart TD
  user[Пользователь] --> frontend[✅ SWITCH frontend\nReact + Vinext/Vite]
  frontend --> pages[✅ Статические страницы\nGitHub Pages /SWITCH/]
  frontend -. будущие HTTPS/JSON запросы .-> api[🟡 Fastify REST API\nлокальный server/]
  api -. планируется .-> auth[⏳ Supabase Auth]
  api -. планируется .-> db[⏳ Supabase PostgreSQL]
```

Текущий frontend deployment отделён от будущего backend runtime:

```mermaid
flowchart LR
  repo[GitHub repository] --> actions[✅ GitHub Actions]
  actions --> build[✅ pnpm build\nVinext/Vite]
  build --> artifact[✅ dist/client]
  artifact --> pages[✅ GitHub Pages\n/SWITCH/]
  api[🟡 server/ Fastify] -. отдельный hosting в будущем .-> runtime[⏳ Hosted API runtime]
  runtime -.-> supabase[⏳ Supabase]
```

## 3. Frontend

### Технологии и структура

✅ Frontend написан на **TypeScript** и **React 19**. Сборку выполняют **Vinext** как Next-совместимый слой и **Vite**. `vite.config.ts` устанавливает `base: "/SWITCH/"`; `next.config.ts` задаёт `output: "export"`. Это статический export, а не запущенный Next.js server.

✅ `app/` содержит файловые маршруты, `components/` — переиспользуемые UI-компоненты, `data/` — локальные mock data, CSS находится в `app/globals.css`, `app/v02.css`, `app/v03.css` и `app/v04.css`.

✅ `SiteLink` формирует href с `/SWITCH/`. Он нужен, потому что GitHub Pages публикует проект не в корне домена, а по пути `https://lyolechka15.github.io/SWITCH/`.

Ответственность frontend: показывать интерфейс, принимать пользовательские действия, отображать статические и будущие API-данные, формировать навигацию и будущие формы. Проверка прав, хранение секретов и изменение persistent-данных не должны выполняться только в браузере.

### Существующие маршруты

✅ `/`, `/catalog`, `/teachers`, `/profile`, `/messages`, `/calendar`, `/wallet`, `/ratings`, `/achievements`, `/knowledge-tree`, `/settings`.

⏳ `/login` и `/register` сейчас отсутствуют и являются частью следующего вертикального сценария MVP.

## 4. Backend

🟡 В `server/` уже создан отдельный TypeScript + Fastify service:

| Файл | Назначение |
|---|---|
| `server/src/index.ts` | Загружает config, создаёт сервер и запускает listener. |
| `server/src/app.ts` | Создаёт Fastify application, CORS, health route и единый JSON error format. |
| `server/src/config.ts` | Проверяет `PORT`, `NODE_ENV`, `CORS_ORIGINS` через Zod и завершает запуск при некорректной конфигурации. |
| `server/tsconfig.json` | Изолированная TypeScript-конфигурация backend. |
| `server/.env.example` | Пример несекретных server settings. |

✅ Единственный реализованный endpoint: `GET /v1/health`, возвращающий статус API.

Fastify выбран как компактный HTTP-framework: он маршрутизирует запросы, использует Pino logging и создаёт основу для будущих защищённых API. API отделён от frontend, потому что GitHub Pages отдаёт только статические файлы и не может исполнять server-side код, хранить секреты или безопасно работать с БД.

✅ CORS проверяет allowlist origins. ✅ Zod валидирует окружение до старта. ✅ Fastify/Pino логирует запуск и запросы. ✅ Ошибки и 404 возвращаются в едином JSON-виде.

🟡 Fastify foundation существует, но пока не задеплоен и не подключён к persistent database.

## 5. Модули системы

| Модуль | Назначение | Текущее состояние |
|---|---|---|
| Frontend UI | Страницы и визуальный интерфейс | ✅ |
| Navigation | Header, `SiteLink`, GitHub Pages base path | ✅ |
| Catalog | Интерфейс каталога навыков | 🟡 mock data |
| Teachers | Интерфейс списка наставников | 🟡 mock data |
| Profile | Экран профиля | 🟡 mock data, без сохранения |
| Authentication | Регистрация, login, сессия | ⏳ |
| Skills | Реальные навыки и связи пользователя | ⏳ |
| Wallet / SWITCH Hours | Экран баланса и концепция времени | 🟡 UI mock |
| Transactions | Журнал операций Hours | ⏳ |
| Teaching / Lessons | Запросы и завершённые занятия | ⏳ |
| Knowledge Tree | Визуализация дерева | 🟡 mock relations |
| Ratings | Интерфейс рейтинга | 🟡 mock data |
| Achievements | Интерфейс достижений | 🟡 mock data |
| Messages | UI мессенджера | 🟡 локальное state |
| Calendar | UI календаря | 🟡 mock data |
| Notifications | Уведомления | ⏳ |
| Backend API | Fastify + health/CORS/config | 🟡 |
| Database | Persistent storage | ⏳ |

## 6. Основные компоненты и классы/сущности

Проект использует функциональные React-компоненты и TypeScript-модули, а не классическую class-based архитектуру. Поэтому не следует приписывать ему несуществующие классы.

### UI-компоненты

- ✅ `AppShell` — общий header, меню и навигация.
- ✅ `SiteLink` — безопасно добавляет GitHub Pages prefix к внутренним ссылкам.
- ✅ `CatalogView` — фильтрация и отображение каталога на mock data.
- ✅ `KnowledgeTree` — интерактивная визуализация древа на локальных данных.
- ✅ `PrototypePages` — набор текущих прототипных страниц, включая profile, ratings, messages и calendar.

### Backend modules/functions

- ✅ `buildServer(config)` в `app.ts` собирает HTTP application.
- ✅ `loadConfig(env)` в `config.ts` превращает проверенные environment variables в `ApiConfig`.
- ✅ `start()` в `index.ts` запускает API.

### Domain entities

⏳ Следующие сущности — архитектурная модель будущего backend, а не реализованные таблицы: `User`, `Profile`, `Skill`, `UserSkill`, `Wallet`, `HourTransaction`, `TeachingRequest`, `Lesson`, `KnowledgeConnection`, `Conversation`, `Message`, `RatingEvent`, `Achievement`, `UserAchievement`, `Notification`.

## 7. Зависимости между модулями

```mermaid
flowchart TD
  ui[Frontend UI] --> nav[AppShell / SiteLink]
  ui -. будущий API client .-> api[Fastify API]
  catalog[Catalog] -.-> skills[Skill / UserSkill]
  profile[Profile] -.-> user[User / Profile]
  wallet[Wallet] -.-> ledger[Wallet / HourTransaction]
  tree[Knowledge Tree] -.-> lessons[Completed teaching relations]
  ratings[Ratings] -.-> ratingEvents[RatingEvent]
  messages[Messages] -.-> conversations[Conversation / Message]
  api -.-> auth[Supabase Auth]
  api -.-> database[PostgreSQL]
```

Стрелки с пунктиром показывают планируемые зависимости. Текущий UI напрямую импортирует локальные mock data и не вызывает API.

## 8. Хранение данных

### Сейчас

🟡 Данные находятся в исходном коде и React state:

- `data/catalog.ts` — категории и навыки каталога;
- `data/home.ts` — часть домашнего контента;
- `data/knowledgeTree.ts` — узлы и связи визуального дерева;
- `components/PrototypePages.tsx` — mock-профиль, преподаватели, рейтинг, операции, сообщения, календарь и другие страницы;
- `components/AppShell.tsx` — mock-пользователь и баланс;
- `components/CatalogView.tsx` и `components/KnowledgeTree.tsx` — локальные интерактивные состояния.

### MVP

⏳ В PostgreSQL должны перейти users/profiles, skills/user_skills, teaching requests/lessons, wallets/hour transactions, knowledge connections, conversations/messages, rating events, achievements и notifications.

React state и localStorage не подходят как единственный источник истины: они принадлежат одному браузеру, очищаются/расходятся между устройствами и не дают server-side проверки прав или корректных финансовоподобных проводок времени.

## 9. PostgreSQL / Supabase

⏳ Целевая архитектура MVP предполагает Supabase для PostgreSQL, Supabase Auth и, возможно, Storage для avatar. Supabase удобен для учебного MVP, потому что сочетает managed PostgreSQL и готовый provider authentication; Fastify при этом сохраняется отдельным business/API layer.

Supabase credentials, schema и connection сейчас отсутствуют. Поэтому нельзя утверждать, что проект уже подключён к Supabase.

## 10. Модель данных

Это концептуальная ER-схема целевого MVP, не текущая миграция или база данных.

```mermaid
erDiagram
  USER ||--|| PROFILE : has
  PROFILE ||--o{ USER_SKILL : declares
  SKILL ||--o{ USER_SKILL : classifies
  USER ||--|| WALLET : owns
  WALLET ||--o{ HOUR_TRANSACTION : records
  USER ||--o{ TEACHING_REQUEST : creates
  TEACHING_REQUEST ||--o{ LESSON : results_in
  LESSON ||--o{ KNOWLEDGE_CONNECTION : confirms
  CONVERSATION ||--o{ MESSAGE : contains
  USER ||--o{ RATING_EVENT : earns
  USER ||--o{ USER_ACHIEVEMENT : receives
  ACHIEVEMENT ||--o{ USER_ACHIEVEMENT : defines
  USER ||--o{ NOTIFICATION : receives
```

## 11. SWITCH Hours

⏳ SWITCH Hours — не криптовалюта и не реальные деньги, а внутренняя единица времени и обмена знаниями. Для backend нужна модель **Wallet + immutable HourTransaction ledger**.

Баланс нельзя менять отдельным произвольным update: каждая корректировка должна иметь проводку `HourTransaction`. Рекомендуемые требования:

- сумма хранится точно, например в минутах: `8.5 Hours = 510 minutes`;
- защита от двойного начисления через idempotency key и уникальную связь с исходным событием;
- запрет отрицательного баланса при списании;
- неизменяемая история операций;
- связь операции с lesson и/или пользователем;
- атомарная PostgreSQL transaction при изменении баланса и создании проводки.

Текущий экран wallet демонстрационный и не имеет ledger.

## 12. Knowledge Tree

🟡 Текущий `KnowledgeTree` показывает будущую визуализацию на mock data. ⏳ В backend дерево не должно храниться как вручную редактируемая структура.

Источником истины должны быть факты завершённого обучения. Если Ольга обучила Анну, а Анна обучила Марию, дерево по этим событиям строится как:

```text
Ольга
└── Анна
    └── Мария
```

Так нет дублирования данных; дерево можно пересчитать, отфильтровать по skill и показать по поколениям. Основанием связи служит `KnowledgeConnection`, созданный из завершённого teaching/lesson event.

## 13. Authentication

⏳ Целевая схема: **Supabase Auth → access token → frontend → Authorization header → Fastify → token verification → current user**.

Пароль не хранится в `Profile`. Frontend получает только публичную конфигурацию и пользовательский access token, но никогда не secret/service key. Backend не доверяет `userId`, присланному браузером: current user определяется только из проверенного token. Authentication пока не реализована.

## 14. API

### Уже реализовано

- ✅ `GET /v1/health`

### Планируемый API MVP

- ⏳ current user/profile: `GET /v1/me`, `GET/PATCH /v1/me/profile`;
- ⏳ skills: `GET /v1/me/skills`, `PUT /v1/me/skills`, `GET /v1/skills`, `GET /v1/teachers`;
- ⏳ wallet: `GET /v1/wallet`, `GET /v1/wallet/transactions`;
- ⏳ teaching: `POST /v1/teaching-requests` и минимальные lesson endpoints.

Полный API намеренно не фиксируется до появления первого вертикального сценария.

## 15. CORS и безопасность

✅ Backend allowlist включает `http://localhost:5173` и `https://lyolechka15.github.io`; wildcard `*` не используется. Это особенно важно для будущих authenticated requests: API должен разрешать только известные frontend origins.

⏳ Разделение environment variables:

- frontend: только `VITE_*` public values;
- backend: server configuration, database URL и secret keys.

Секреты нельзя commit, передавать frontend или логировать. Это относится к database credentials и Supabase service/secret keys.

## 16. Deployment

### Текущая реальность

✅ Frontend: `GitHub → GitHub Actions → pnpm build → dist/client → GitHub Pages → /SWITCH/`.

🟡 Backend находится в `server/`, но не опубликован. ⏳ Database не подключена.

### Целевая MVP deployment architecture

```text
GitHub Pages frontend
      → HTTPS/JSON
hosted Fastify API
      → Supabase PostgreSQL / Auth
```

## 17. Рассмотренные альтернативы

| Вариант | Плюсы | Минусы | Решение |
|---|---|---|---|
| Backend внутри frontend/API routes | Один проект | GitHub Pages не исполняет server code | Не выбран для static hosting |
| Отдельный Fastify backend | Чёткая граница, TypeScript, API можно deploy отдельно | Нужен отдельный runtime | Выбран как foundation |
| Своя PostgreSQL + свой auth | Полный контроль | Сложнее и рискованнее для учебного MVP | Не выбран на первом этапе |
| Supabase PostgreSQL + Auth | Managed DB, готовая auth, быстрый MVP | Внешняя конфигурация и credentials | Планируется |
| localStorage как основное хранилище | Быстро для прототипа | Не multi-user, нет защиты и общих данных | Только UI-state, не источник истины |
| Prisma | Зрелый ORM и migrations | Дополнительный слой/настройка | Рассматривается |
| Drizzle / SQL migrations | Типизация или прозрачный SQL | Решение ещё не зафиксировано | Рассматривается |

## 18. Почему выбрана текущая архитектура

Frontend уже удобно публикуется статически, поэтому GitHub Pages остаётся его hosting. Backend требует server runtime для проверки прав, работы с секретами и business logic. Database должна быть persistent, а authentication не стоит писать с нуля для учебного MVP.

Разделение frontend, API и database позволяет постепенно заменять mock data реальными запросами, не переписывая UI и не ломая GitHub Pages deployment.

## 19. Ограничения v0.2

- 🟡 большая часть экранов использует mock data;
- 🟡 Fastify пока не deployed;
- ⏳ database не подключена;
- ⏳ authentication не реализована;
- 🟡 API содержит только health endpoint;
- 🟡 SWITCH Hours пока mock;
- 🟡 Knowledge Tree визуализирует mock relations.

## 20. План перехода к v0.3

Следующая контрольная точка должна дать один вертикальный рабочий сценарий:

```text
Registration → Login → authenticated user → editable Profile
→ persistent PostgreSQL data → reload → data preserved
```

Это соединит все слои: `UI → Auth → API → Database → API → UI`.

## 21. Краткая памятка для защиты

«Я разделила SWITCH на frontend и backend. Frontend уже опубликован на GitHub Pages и отвечает за интерфейс, навигацию и отображение данных. GitHub Pages статичен, поэтому business logic, секреты и БД нельзя размещать там. Для этого создан отдельный Fastify API. Сейчас он реализован как foundation с health endpoint, CORS и проверкой конфигурации. Следующим шагом я подключу Supabase Auth и PostgreSQL, чтобы profile и навыки сохранялись между перезагрузками. Mock data затем будут постепенно заменяться API-данными, без переписывания существующего UI».
