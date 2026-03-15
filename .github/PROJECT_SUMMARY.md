# Pestto — Resumo do Projeto

## Visão Geral

**Pestto** é uma extensão de navegador (Chrome/Chromium) minimalista que converte automaticamente a formatação Markdown para a sintaxe nativa do WhatsApp ao colar texto no [WhatsApp Web](https://web.whatsapp.com). O nome é um trocadilho com "paste + to" e o molho pesto 🍝.

- **Versão atual:** 0.3.0-rc.4
- **Licença:** MIT
- **Repositório:** [github.com/axmbo/pestto](https://github.com/axmbo/pestto)
- **Chrome Web Store:** [Pestto](https://chromewebstore.google.com/detail/gkgbejhaebncdjjkmejinkdmnomcijgi)

---

## Problema Resolvido

Textos gerados por IA (ChatGPT, Gemini, etc.) usam Markdown (`**negrito**`, `*itálico*`), mas o WhatsApp usa uma sintaxe própria (`*negrito*`, `_itálico_`). O Pestto faz essa tradução automaticamente no ato de colar.

---

## Arquitetura

O projeto é organizado seguindo padrões modernos, separando código-fonte, scripts de build e testes.

| Arquivo/Pasta                 | Responsabilidade                                                                   |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| `manifest.json`               | Manifest V3 — declara a extensão, permissões e content scripts                     |
| `src/content.js`              | Intercepta o evento `paste` no WhatsApp Web (fase de captura)                      |
| `src/converter.js`            | Lógica pura de conversão Markdown → WhatsApp (sem dependência do DOM)              |
| `src/version.js`              | Gerado pelo build — contém `BUILD_INFO` com versão, data e commit hash             |
| `src/icons/`                  | Ícones da extensão em diversos tamanhos                                            |
| `scripts/generate-version.sh` | Gera `src/version.js` e injeta o 4º dígito da versão no `manifest.json` no CI      |
| `scripts/sync-version.js`     | Sincroniza a versão do `package.json` no `manifest.json` (usado no hook `version`) |
| `scripts/build.sh`            | Script auxiliar que gera o pacote ZIP para distribuição                            |
| `tests/`                      | Suítes de testes unitários e de integração (Vitest)                                |
| `docs/`                       | Documentação de suporte e manuais da Chrome Web Store                              |
| `assets/`                     | Imagens de divulgação e assets originais (SVG)                                     |

### Fluxo de Execução

```
Usuário cola texto (Ctrl+V)
        │
        ▼
  content.js intercepta o paste (fase de captura)
        │
        ├── Se é cópia interna do WhatsApp → ignora
        │
        ▼
  converter.js converte Markdown → WhatsApp
        │
        ▼
  content.js dispara um ClipboardEvent falso com o texto convertido
```

### Conversões Suportadas

| Markdown      | WhatsApp    | Tipo              |
| ------------- | ----------- | ----------------- |
| `**texto**`   | `*texto*`   | Negrito           |
| `*texto*`     | `_texto_`   | Itálico           |
| `~~texto~~`   | `~texto~`   | Tachado           |
| `***texto***` | `_*texto*_` | Negrito + Itálico |

> **Proteção de código:** texto dentro de código inline (`` `...` ``) e blocos de código (` ```...``` `) **não é convertido**. O conversor protege esses trechos antes de aplicar as regras de formatação e os restaura intactos ao final.

---

## Sistema de Versionamento

O Pestto utiliza um sistema de versionamento híbrido para conciliar o SemVer com as restrições da Chrome Web Store:

1.  **package.json:** Segue Semantic Versioning estrito (ex: `0.3.0-rc.4`).
2.  **manifest.json (Chrome):**
    - **Versão Base:** Sempre sanitizada (remove sufixos como `-rc.X`).
    - **4º Dígito (Build Number):** O Chrome permite até 4 números. Usamos o último dígito para identificar builds:
      - **Build Local:** `X.Y.Z`. O manifesto no repositório mantém a versão base.
      - **Build CI:** `X.Y.Z.RUN_NUMBER`. Injetado pelo script `generate-version.sh` apenas durante o pipeline.

---

## CI/CD (GitHub Actions)

O pipeline automatiza a garantia de qualidade e o processo de publicação.

### `ci.yml` — Push na `main` ou Pull Requests

1.  **test:** Roda os testes unitários (`npm test`).
2.  **build:** Gera a `version.js`, aplica o build number no manifesto e gera o ZIP como artefato.

### `release.yml` — Push de tag `v*`

1.  Extrai o número do build do `GITHUB_RUN_NUMBER`.
2.  Gera o `CHANGELOG.md` e o pacote ZIP renomeado.
3.  Cria a **Release** no GitHub com o ZIP anexado e o changelog automático.

---

## Qualidade de Código e Fluxo Local

| Ferramenta | Função                                                       |
| ---------- | ------------------------------------------------------------ |
| ESLint     | Linting de JS com escopos distintos: browser, Node e Vitest  |
| Prettier   | Formatação automática de código e Markdown                   |
| Husky      | Hooks de git para automação                                  |
| .vscode/   | Configurações de Tasks e Launch para facilitar o build local |

### Comportamento do `pre-commit` (Husky + lint-staged)

1.  Roda `lint-staged` (ESLint + Prettier check nos arquivos staged).
2.  Se houver erros, aplica `eslint --fix` e `prettier --write` na _working tree_ (versão não-staged) e **aborta o commit**.
3.  O desenvolvedor revisa as correções com `git diff`, faz `git add` e tenta o commit novamente.
4.  Se lint-staged passar, roda os **22 testes unitários** (`npm test`).

### Atalhos Úteis (VS Code)

- `Ctrl + Shift + B`: Gera o ZIP de build local.
- `Tasks: Run Task -> Run Tests (Once)`: Executa os testes e encerra.
- `Tasks: Run Task -> Run Tests (Watch)`: Modo de desenvolvimento (re-roda ao salvar).
- `Tasks: Run Task -> Version: Bump ...`: Atalhos para trocar de versão com segurança.
- `Tasks: Run Task -> Git: Push with Tags`: Envia commits e tags geradas.

---

## Stack Técnica

| Componente | Tecnologia                           |
| ---------- | ------------------------------------ |
| Linguagem  | JavaScript (vanilla, sem frameworks) |
| Manifest   | Chrome Extensions Manifest V3        |
| Testes     | Vitest                               |
| CI/CD      | GitHub Actions                       |
| Build      | npm scripts + bash (zip)             |

---

## Princípios de Design

- **Zero UI** — sem popup, sem ícone na toolbar.
- **Zero rede** — nenhuma requisição externa.
- **Zero storage** — não usa storage local.
- **Zero tracking** — sem analytics ou coleta de dados.
- **Mínimas permissões** — apenas o domínio do WhatsApp Web.
