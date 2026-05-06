# Task Manager

> Aplicação web para organizar tarefas diárias por período (Manhã, Tarde, Noite) com filtros, prioridades e persistência local.

---

## Sobre

Task Manager é uma SPA (Single Page Application) construída com React + Vite que permite criar, editar, filtrar e acompanhar tarefas do dia a dia. As tarefas são organizadas por período (Manhã / Tarde / Noite) e persistidas no `localStorage` do navegador — sem necessidade de backend.

---

## Tecnologias

| Tecnologia            | Versão | Uso                             |
| --------------------- | ------ | ------------------------------- |
| React                 | 18     | UI e gerenciamento de estado    |
| Vite                  | 5      | Bundler e dev server            |
| Tailwind CSS          | 3      | Estilização utilitária          |
| React Router DOM      | 7      | Navegação entre páginas         |
| Sonner                | 1.5    | Notificações toast              |
| Prettier              | 3      | Formatação de código            |
| ESLint                | 8      | Análise estática                |
| Husky                 | 9      | Git hooks                       |
| lint-staged           | —      | Lint apenas nos arquivos staged |
| git-commit-msg-linter | 5      | Validação da mensagem de commit |

---

## Pré-requisitos

- **Node.js** >= 18 (recomendado v20 LTS)
- **npm** >= 9
- **Git** instalado e configurado

Verifique sua versão:

```bash
node -v
npm -v
```

---

## Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/Brunoxd23/Task-Manager.git
cd task-manager

# 2. Instale as dependências
npm install
```

O `npm install` já executa `husky` automaticamente via script `prepare`, configurando os git hooks.

---

## Como rodar

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build de produção
npm run build

# Preview do build gerado
npm run preview

# Rodar o lint manualmente
npm run lint
```

O dev server sobe em `http://localhost:5173` por padrão.

---

## Estrutura de pastas

```
task-manager/
├── public/
│   └── favicon.svg          # Ícone da aplicação
├── src/
│   ├── assets/              # Ícones SVG e fontes (Poppins)
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/          # Todos os componentes React
│   │   ├── Task.jsx         # Página principal de tarefas
│   │   ├── FilterBar.jsx    # Filtros de status, prioridade e período
│   │   ├── TasksItem.jsx    # Card individual de tarefa
│   │   ├── AddTaskModal.jsx # Modal para criar tarefa
│   │   ├── EditTaskModal.jsx# Modal para editar tarefa
│   │   ├── DaySummary.jsx   # Barra de progresso do dia
│   │   ├── ToastContent.jsx # Toast customizado com animação
│   │   ├── Header.jsx
│   │   ├── Home.jsx         # Página inicial com estatísticas
│   │   ├── sidebar.jsx
│   │   └── TopBar.jsx
│   ├── constants/
│   │   └── tasks.js         # Tarefas iniciais de exemplo
│   ├── hooks/
│   │   ├── usePersistedTasks.js  # Persiste tarefas no localStorage
│   │   └── useDarkMode.js        # Gerencia tema claro/escuro
│   ├── App.jsx              # Rotas e layout principal
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globais + animações
├── .eslintrc.cjs            # Configuração do ESLint
├── .prettierrc              # Configuração do Prettier
├── .lintstagedrc            # Configuração do lint-staged
├── .husky/                  # Git hooks
│   ├── pre-commit           # Roda lint-staged antes do commit
│   └── commit-msg           # Valida mensagem de commit
├── tailwind.config.js
├── vite.config.js
├── vercel.json              # Rewrite para React Router na Vercel
└── package.json
```

---

## Funcionalidades

- **Criar / Editar / Excluir** tarefas com título, descrição, prioridade, período e data limite
- **Status** por tarefa: Pendente → Em andamento → Concluída (via checkbox)
- **Filtros** por status, prioridade e período do dia
- **Busca** por título em tempo real
- **Desfazer** exclusão com toast de ação
- **Progresso do dia** com barra e mensagem motivacional
- **Tema claro/escuro** persistido no `localStorage`
- **Persistência** completa via `localStorage` — os dados sobrevivem ao recarregamento

---

## Configuração do Prettier

O arquivo `.prettierrc` já está no projeto com as regras definidas:

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

| Regra           | Valor                         | O que faz                                    |
| --------------- | ----------------------------- | -------------------------------------------- |
| `trailingComma` | `"es5"`                       | Vírgula no final de objetos/arrays multiline |
| `tabWidth`      | `2`                           | Indentação com 2 espaços                     |
| `semi`          | `false`                       | Sem ponto-e-vírgula no final das linhas      |
| `singleQuote`   | `false`                       | Usa aspas duplas                             |
| `plugins`       | `prettier-plugin-tailwindcss` | Ordena classes Tailwind automaticamente      |

**Formatar tudo manualmente:**

```bash
npx prettier --write .
```

**Formatar só a pasta `src`:**

```bash
npx prettier --write src
```

**Recomendado para VS Code** — instale a extensão [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) e adicione ao `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

---

## Configuração do Husky e lint-staged

O Husky executa verificações automáticas antes de cada commit. Ao rodar `npm install`, os hooks são instalados automaticamente.

### Hook `pre-commit`

Localização: `.husky/pre-commit`

```sh
npx lint-staged
```

Antes de todo commit, o `lint-staged` roda Prettier e ESLint **apenas nos arquivos que estão no stage** (mais rápido que rodar em todo o projeto).

### Hook `commit-msg`

Localização: `.husky/commit-msg`

```sh
.git/hooks/commit-msg $1
```

Valida o formato da mensagem de commit via `git-commit-msg-linter`.

### Arquivo `.lintstagedrc`

```json
{
  "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix --max-warnings=0"]
}
```

Para cada arquivo JS/JSX staged: formata com Prettier e corrige com ESLint. Se houver warning não corrigível, **o commit é bloqueado**.

---

## Padrão de mensagens de commit

O projeto usa o padrão **Conventional Commits** validado pelo `git-commit-msg-linter`.

### Formato

```
<tipo>: <descrição curta em minúsculas>
```

### Tipos aceitos

| Tipo       | Quando usar                          |
| ---------- | ------------------------------------ |
| `feat`     | Nova funcionalidade                  |
| `fix`      | Correção de bug                      |
| `style`    | Mudanças visuais/CSS sem lógica      |
| `refactor` | Refatoração sem nova feature ou fix  |
| `chore`    | Tarefas de manutenção, configs, deps |
| `docs`     | Apenas documentação                  |
| `test`     | Adição ou correção de testes         |
| `perf`     | Melhoria de performance              |
| `ci`       | Mudanças em pipelines CI/CD          |

### Exemplos válidos

```bash
git commit -m "feat: add period filter to task list"
git commit -m "fix: toast not appearing on bottom-right"
git commit -m "style: adjust sidebar spacing on mobile"
git commit -m "chore: update prettier to 3.x"
git commit -m "docs: update README with husky setup"
```

### Exemplos inválidos (bloqueados pelo hook)

```bash
git commit -m "ajustes"          # sem tipo
git commit -m "Feat: algo"       # tipo com letra maiúscula
git commit -m "feat(scope: x"    # parêntese não fechado
```

---

## Deploy na Vercel

O arquivo `vercel.json` garante que o React Router funcione corretamente (sem 404 ao acessar rotas diretamente):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Para fazer deploy:**

1. Acesse [vercel.com](https://vercel.com) e conecte o repositório GitHub
2. A Vercel detecta o Vite automaticamente — sem configuração extra
3. Build command: `npm run build` | Output directory: `dist`

---

## Contribuindo

```bash
# 1. Crie uma branch a partir da main
git checkout -b feat/nome-da-feature

# 2. Faça as alterações e stage os arquivos
git add .

# 3. Commit seguindo o padrão Conventional Commits
git commit -m "feat: descrição da mudança"

# 4. Suba a branch
git push origin feat/nome-da-feature

# 5. Abra um Pull Request para a branch main
```

**Regras:**

- Nunca commite direto na `main`
- PRs precisam passar pelo lint (o hook garante isso localmente)
- Mensagens de commit fora do padrão são bloqueadas automaticamente

---

## Licença

Projeto privado — todos os direitos reservados.
