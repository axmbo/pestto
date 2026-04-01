# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Nao Lancado]

### Adicionado

- Atualizar Ação De Criação De Pr Para Versão 8 E Ajustar Token.
- Adicionar modelo de *issue* de lançamento com checklist abrangente para novas versões.
- Isola Lógica De Criação Do Evento Customizado De Colar.
- Adicionar badge de fluxo de *CI* ao `README.md`.
- Adicionar nova tarefa do *VS Code* para fazer push de mudanças do *Git* com tags.
- Adicionar tarefas do *VS Code* para *linting*, formatação e gerenciamento de versão, e atualizar o rótulo da tarefa de build.
- Adicionar configurações de inicialização e tarefa do *VS Code* para compilação e testes.
- Adicionar guia para automatizar publicação na *Chrome Web Store* usando *GitHub Actions*.
- Adicionar imagem promocional 640x400.

### Alterado

- Aprimorar Regras De Saída E Validação De Texto Em Português.
- Adicionar Suporte Para Normalização De Dados Em Português E Verificação De Marcadores Em Inglês.
- Adicionar Workflow Para Gerar Rascunho De Changelog E Notas De Release.
- Adicionar Arquivo Release_notes.md E Atualizar Checklist De Lançamento.
- Atualizar versões de `brace-expansion` e `yaml` para 5.0.5 e 2.8.3, respectivamente.
- Atualizar `handlebars` de 4.7.8 para 4.7.9.
- Atualizar versão para 0.4.2 para teste de lançamento.
- Integrar Deploy Na Chrome Store Com Aprovação Manual Em Releases.
- Automação De Deploy Na Chrome Web Store Finalizada E Validada.
- Atualizar versão para 0.4.1 para evitar conflito de transição.
- Atualizar versão para 0.4.0 e testar com *Extension ID* real.
- Usar Action Mnao305/chrome-extension-upload@v5.0.0.
- Substituir Action De Deploy Pela Mobilefirstllc/chrome-extension-upload@v5.
- Atualizar checklist de lançamento para refletir deploy automático da *Chrome Web Store* via *GitHub Actions*.
- Adicionar Workflow De Deploy Automático Para Chrome Web Store.
- Atualizar `tests/generate-version.test.js` com novos casos de teste.
- Atualizar `picomatch` de 4.0.3 para 4.0.4.
- Restaurar `manifest.json` após teste de *CI* para isolar estado de teste.
- Plano inicial.
- Permite Colar Nativamente Na Pesquisa E Ignora Textos Puros.
- Adiciona Entropia Aos Tokens De Proteção De Código.
- Preserva Arquivos Copiados E Valida O Elemento Alvo.
- Acionar fluxo de trabalho de *CI* em *Pull Requests* para a branch principal.
- 0.3.0-rc.5.
- Atualizar resumo do projeto, detalhar novo sistema de versionamento e melhorar a documentação do fluxo de trabalho de desenvolvimento.
- 0.3.0-rc.4.
- 0.3.0-rc.3.
- Separar execução de testes em execução única (`npm test`) e modo observação (`npm run test:watch`), atualizando tarefas do *VS Code* e documentação.
- 0.3.0-rc.2.
- Impedir que `generate-version.sh` modifique `manifest.json` durante compilações locais, atualizando-o apenas em compilações de *CI*, e ajustar testes de acordo.
- 0.3.0-rc.1.
- Atualizar versão do manifesto para 0.3.0.0.
- 0.3.0-rc.0.
- Mover arquivos de código-fonte para `src/`, scripts para `scripts/` e testes para `tests/`.
- Atualizar resumo do projeto e `README` com nova versão, arquitetura, tipo de conversão, *CI/CD*, ferramentas de qualidade de código e instruções de instalação.
- Formatar arquivos não selecionados em caso de falha de *pre-commit*.
- Configurar ganchos de *pre-commit* do *Husky* para executar `lint-staged` para formatação e *linting*, e *Vitest* para testes.
- Melhorar formatação e corrigir ênfase *Markdown* no guia de automação da *Chrome Web Store*.

### Corrigido

- Melhorado debug de *curl* para token e upload.
- Adicionar etapa de upload *curl* para ver corpo do erro.
- Corrigir Versão Da Action De Deploy Para V1.
- Corrige A Atualização Do Manifest.json Para Manter A Formatação.
- Potencial correção para alerta de *Code Scanning* nº 3: escape ou codificação incompleta de string.
- Implementar versionamento de `manifest.json` com número de build de 4º dígito e remover sufixos de pré-lançamento da versão base.
- Remover sufixos de pré-lançamento da versão do manifesto para estar em conformidade com o formato da *Chrome Web Store*.
- Alterar `lint-staged` para modo verificação em vez de auto-correção.

### Seguranca

- Potencial correção para alerta de *Code Scanning* nº 5: fluxo de trabalho não contém permissões.
- Adicionar *Actions*: permissão de escrita ao trabalho de build para upload de artefato.
- Potencial correção para alerta de *Code Scanning* nº 2: fluxo de trabalho não contém permissões.
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
