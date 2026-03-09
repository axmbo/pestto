# Pestto — Resumo do Projeto

## Visão Geral

**Pestto** é uma extensão de navegador (Chrome/Chromium) minimalista que converte automaticamente a formatação Markdown para a sintaxe nativa do WhatsApp ao colar texto no [WhatsApp Web](https://web.whatsapp.com). O nome é um trocadilho com "paste + to" e o molho pesto 🍝.

- **Versão atual:** 0.1.1
- **Licença:** MIT
- **Repositório:** [github.com/axmbo/pestto](https://github.com/axmbo/pestto)

---

## Problema Resolvido

Textos gerados por IA (ChatGPT, Gemini, etc.) usam Markdown (`**negrito**`, `*itálico*`), mas o WhatsApp usa uma sintaxe própria (`*negrito*`, `_itálico_`). O Pestto faz essa tradução automaticamente no ato de colar.

---

## Arquitetura

| Arquivo | Responsabilidade |
|---|---|
| `manifest.json` | Manifest V3 — declara a extensão, permissões e content scripts |
| `content.js` | Intercepta o evento `paste` no WhatsApp Web (fase de captura) |
| `converter.js` | Lógica pura de conversão Markdown → WhatsApp (sem dependência do DOM) |
| `version.js` | Gerado pelo CI/CD — contém `BUILD_INFO` com versão, build e commit hash |
| `sync-version.js` | Script npm `version` — sincroniza a versão do `package.json` no `manifest.json` |
| `converter.test.js` | Testes unitários com Vitest |
| `build.sh` | Script auxiliar de build (zip) |

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

| Markdown | WhatsApp | Tipo |
|---|---|---|
| `**texto**` | `*texto*` | Negrito |
| `*texto*` | `_texto_` | Itálico |
| `~~texto~~` | `~texto~` | Tachado |

> **Proteção de código:** texto dentro de código inline (`` `...` ``) e blocos de código (` ```...``` `) **não é convertido**. O conversor protege esses trechos antes de aplicar as regras de formatação e os restaura intactos ao final, garantindo que marcações Markdown dentro de código sejam preservadas literalmente.

---

## CI/CD (GitHub Actions)

### `ci.yml` — Push na `main`
1. **test** — Instala dependências e roda `npm test` (Vitest)
2. **build** — Gera `version.js`, cria o zip e salva como artefato

### `release.yml` — Push de tag `v*`
1. Gera `version.js` com info da release
2. Cria o zip renomeado (`pestto-v0.x.x.zip`)
3. Publica na aba **Releases** do GitHub

---

## Stack Técnica

| Componente | Tecnologia |
|---|---|
| Linguagem | JavaScript (vanilla, sem frameworks) |
| Manifest | Chrome Extensions Manifest V3 |
| Testes | Vitest |
| CI/CD | GitHub Actions |
| Build | npm scripts + zip |

---

## Princípios de Design

- **Zero UI** — sem popup, sem configurações, sem ícone na toolbar
- **Zero rede** — nenhuma requisição externa
- **Zero storage** — não usa `chrome.storage` nem `localStorage`
- **Zero tracking** — sem analytics ou coleta de dados
- **Mínimas permissões** — apenas `https://web.whatsapp.com/*`
