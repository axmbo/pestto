# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Nao Lancado]

### Adicionado

- Atualizar Ação De Criação De Pr Para Versão 8 E Ajustar Token.
- Adicionar modelo de *issue* de lançamento com checklist abrangente para novas versões.
- Isola Lógica De Criação Do Evento Customizado De Colar.
- Adicionar badge de fluxo de *CI* ao `README.md`.

### Alterado

- Aprimorar Regras De Saída E Validação De Texto Em Português.
- Adicionar Suporte Para Normalização De Dados Em Português E Verificação De Marcadores Em Inglês.
- Adicionar Workflow Para Gerar Rascunho De Changelog E Notas De Release.
- Adicionar Arquivo `RELEASE_NOTES.md` E Atualizar Checklist De Lançamento.
- Atualizar versões de `brace-expansion` e `yaml` para 5.0.5 e 2.8.3, respectivamente.
- Atualizar `handlebars` de 4.7.8 para 4.7.9.

## [0.4.2] - 2026-03-26

### Alterado

- Versao atualizada para `0.4.2` para validar o fluxo de release oficial.

## [0.3.0-rc.5] - 2026-03-15

### Adicionado

- Nova task no VS Code para push do Git com tags.
- Tasks de lint, formatacao e versionamento no VS Code, com ajuste do rotulo de build.

## [0.3.0-rc.4] - 2026-03-15

### Alterado

- Sem alteracoes funcionais registradas no historico legado.

## [0.3.0-rc.3] - 2026-03-15

### Adicionado

- Configuracoes de launch e task no VS Code para build e testes.
- Separacao de testes em execucao unica (`npm test`) e watch mode (`npm run test:watch`).

## [0.3.0-rc.2] - 2026-03-15

### Corrigido

- `generate-version.sh` deixou de alterar `manifest.json` em build local, mantendo a alteracao apenas no CI.

## [0.3.0-rc.1] - 2026-03-15

### Adicionado

- Versionamento de `manifest.json` com quarto digito de build para compatibilidade com a Chrome Web Store.

### Corrigido

- Remocao de sufixos pre-release na versao do manifesto para atender ao formato aceito na loja.

## [0.3.0-rc.0] - 2026-03-15

### Adicionado

- Imagem promocional `640x400`.
- Guia de automacao da publicacao na Chrome Web Store via GitHub Actions.

## [0.2.6] - 2026-03-14

### Alterado

- Sem alteracoes detalhadas no historico legado.

## [0.2.5] - 2026-03-14

### Corrigido

- Conversao Markdown restrita a linha unica, ajustes de formatacao aninhada e inclusao de icones adicionais no build.

## [0.2.4] - 2026-03-14

### Alterado

- Sem alteracoes detalhadas no historico legado.

## [0.2.3] - 2026-03-14

### Alterado

- Sem alteracoes detalhadas no historico legado.

## [0.2.2] - 2026-03-14

### Alterado

- Sem alteracoes detalhadas no historico legado.

## [0.2.1] - 2026-03-14

### Alterado

- Sem alteracoes detalhadas no historico legado.

## [0.2.0] - 2026-03-14

### Adicionado

- Icones da extensao em `16x16` e `48x48`.
- Refactor da conversao Markdown para casos aninhados e multiline, com novos testes.

### Corrigido

- Caminhos dos icones no `manifest.json` para os tamanhos `16px` e `48px`.

## [0.1.2] - 2026-03-14

### Adicionado

- Script centralizado para gerar `version.js` com parametrizacao para CI e build local.

### Corrigido

- Ajuste de versao em `manifest.json` e `package.json`.

## [0.1.1] - 2026-03-08

### Corrigido

- Geracao de `version.js` no workflow de release.

## [0.1.0] - 2026-03-08

### Adicionado

- Versao inicial da extensao Pestto com conversao basica de Markdown.
- Script de build e sincronizacao de versao (`package.json` -> `manifest.json`).
- Workflows de CI e release com artefato ZIP.
- Arquivo de licenca MIT.

### Corrigido

- Conversao de texto multiline e de conteudo vindo do WhatsApp.
- Conversao correta de codigo inline e em bloco.
- Nome do ZIP e fluxo de build.
- Geracao de `version.js` no pipeline.

[Nao Lancado]: https://github.com/axmbo/pestto/compare/v0.4.2...HEAD
[0.4.2]: https://github.com/axmbo/pestto/compare/v0.3.0-rc.5...v0.4.2
[0.3.0-rc.5]: https://github.com/axmbo/pestto/compare/v0.3.0-rc.4...v0.3.0-rc.5
[0.3.0-rc.4]: https://github.com/axmbo/pestto/compare/v0.3.0-rc.3...v0.3.0-rc.4
[0.3.0-rc.3]: https://github.com/axmbo/pestto/compare/v0.3.0-rc.2...v0.3.0-rc.3
[0.3.0-rc.2]: https://github.com/axmbo/pestto/compare/v0.3.0-rc.1...v0.3.0-rc.2
[0.3.0-rc.1]: https://github.com/axmbo/pestto/compare/v0.3.0-rc.0...v0.3.0-rc.1
[0.3.0-rc.0]: https://github.com/axmbo/pestto/compare/v0.2.6...v0.3.0-rc.0
[0.2.6]: https://github.com/axmbo/pestto/compare/v0.2.5...v0.2.6
[0.2.5]: https://github.com/axmbo/pestto/compare/v0.2.4...v0.2.5
[0.2.4]: https://github.com/axmbo/pestto/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/axmbo/pestto/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/axmbo/pestto/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/axmbo/pestto/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/axmbo/pestto/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/axmbo/pestto/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/axmbo/pestto/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/axmbo/pestto/compare/1f4389e9427d80b774b76be568999ad7f3487979...v0.1.0
