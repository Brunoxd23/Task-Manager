# ESLint

- Ferramenta para padronizar escrita de código
- Definir padrões de código, escrita, estilo etc.
- Evita erros

# Prettier

- Ferramenta para padronizar formatação do código
- Comando para formatar todos os arquivos: `npx prettier --write .`
- Comando para formatar apenas a pasta src: `npx prettier --write src`
- Arquivo de configuração: `.prettierrc`

# lint-staged

- Executa comandos em arquivos staged no git antes do commit
- Exemplo de configuração no arquivo `.lintstagedrc`:

```
{
  "*.{js,jsx,ts,tsx}": ["prettier --write"]
}
```

- Comando para rodar manualmente: `npx lint-staged`

# Husky

- Gerencia hooks do git para automatizar tarefas
- Exemplo de hook pre-commit em `.husky/pre-commit`:

```
#!/bin/sh
npx lint-staged
```

# Commit message

- Para validar mensagens de commit, pode-se usar o commitlint (opcional)
- Exemplo de hook vazio em `.husky/commit-msg` (sem validação):

```
#!/bin/sh
# Sem validação configurada
```

# Padronizar o Código entre vários membros da equipe

- Instalar dependências:
  - `npm install --save-dev prettier lint-staged husky`
- Inicializar husky: `npx husky install`
- Adicionar hooks: `npx husky add .husky/pre-commit "npx lint-staged"`
- Configurar scripts no `package.json` se desejar:
  - "prepare": "husky install"
