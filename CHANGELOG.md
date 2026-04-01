# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Nao Lancado]

### Adicionado

- Atualizar Ação De Criação De Pr Para Versão 8 E Ajustar Token.
- Add Release Issue Template With A Comprehensive Checklist For New Versions.
- Isola Lógica De Criação Do Evento Customizado De Colar.
- Add Ci Workflow Badge To Readme.md.
- Add New Vs Code Task For Pushing Git Changes With Tags..
- Add Vs Code Tasks For Linting, Formatting, And Version Management, And Update The Build Task Label..
- Add Vs Code Launch And Task Configurations For Building And Testing..
- Add A Guide For Automating Chrome Web Store Publication Using Github Actions..
- Add 640x400 Promotional Image..

### Alterado

- Aprimorar Regras De Saída E Validação De Texto Em Português.
- Adicionar Suporte Para Normalização De Dados Em Português E Verificação De Marcadores Em Inglês.
- Adicionar Workflow Para Gerar Rascunho De Changelog E Notas De Release.
- Adicionar Arquivo Release_notes.md E Atualizar Checklist De Lançamento.
- Bump Brace-expansion And Yaml Versions To 5.0.5 And 2.8.3 Respectively.
- Bump Handlebars From 4.7.8 To 4.7.9.
- Bump Version To 0.4.2 For Release Test.
- Integrar Deploy Na Chrome Store Com Aprovação Manual Em Releases.
- Automação De Deploy Na Chrome Web Store Finalizada E Validada.
- Bump Version To 0.4.1 To Avoid Transition Conflict.
- Bump Version To 0.4.0 And Test With Real Extension Id.
- Usar Action Mnao305/chrome-extension-upload@v5.0.0.
- Substituir Action De Deploy Pela Mobilefirstllc/chrome-extension-upload@v5.
- Update Release Checklist To Reflect Automated Chrome Web Store Deployment Via Github Actions..
- Adicionar Workflow De Deploy Automático Para Chrome Web Store.
- Update Tests/generate-version.test.js With New Test Cases.
- Bump Picomatch From 4.0.3 To 4.0.4.
- Restore Manifest.json After Ci Test To Isolate Test State.
- Initial Plan.
- Permite Colar Nativamente Na Pesquisa E Ignora Textos Puros.
- Adiciona Entropia Aos Tokens De Proteção De Código.
- Preserva Arquivos Copiados E Valida O Elemento Alvo.
- Trigger Ci Workflow On Pull Requests To The Main Branch..
- 0.3.0-rc.5.
- Update Project Summary, Detail New Versioning System, And Enhance Development Workflow Documentation..
- 0.3.0-rc.4.
- 0.3.0-rc.3.
- Separate Test Execution Into Run-once (`npm Test`) And Watch Mode (`npm Run Test:watch`), Updating Vs Code Tasks And Documentation..
- 0.3.0-rc.2.
- Prevent `generate-version.sh` From Modifying `manifest.json` During Local Builds, Updating It Only For Ci Builds, And Adjust Tests Accordingly..
- 0.3.0-rc.1.
- Update Manifest Version To 0.3.0.0..
- 0.3.0-rc.0.
- Relocate Source Files To `src/`, Scripts To `scripts/`, And Tests To `tests/`..
- Update Project Summary And Readme With New Version, Architecture, Conversion Type, Ci/cd, Code Quality Tools, And Installation Instructions..
- Format Unstaged Files On Pre-commit Failure.
- Set Up Husky Pre-commit Hooks To Run Lint-staged For Formatting And Linting, And Vitest For Testing..
- Improve Formatting And Correct Markdown Emphasis In Chrome Web Store Automation Guide..

### Corrigido

- Improved Curl Debug For Token And Upload.
- Add Curl Upload Step To See Error Body.
- Corrigir Versão Da Action De Deploy Para V1.
- Corrige A Atualização Do Manifest.json Para Manter A Formatação.
- Potential Fix For Code Scanning Alert No. 3: Incomplete String Escaping Or Encoding.
- Implement Manifest.json Versioning With A 4th Digit Build Number And Remove Pre-release Suffixes From The Base Version..
- Remove Pre-release Suffixes From Manifest Version To Comply With Chrome Web Store Format..
- Change Lint-staged To Check Mode Instead Of Auto-fix.

### Seguranca

- Potential Fix For Code Scanning Alert No. 5: Workflow Does Not Contain Permissions.
- Add Actions: Write Permission To Build Job For Artifact Upload.
- Potential Fix For Code Scanning Alert No. 2: Workflow Does Not Contain Permissions.
- Corrige Vulnerabilidade De Prototype Pollution No Pacote Flatted.

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
