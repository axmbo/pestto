# Release Notes

Este arquivo consolida as notas de release publicas por versao.

Regra de uso:

- Atualize este arquivo a cada release oficial (`vX.Y.Z`).
- Mantenha o resumo executivo aqui e o historico tecnico no `CHANGELOG.md`.
- Sempre alinhe os itens com a secao da versao correspondente no `CHANGELOG.md`.

## Template

Copie o bloco abaixo para uma nova versao:

```md

## [0.4.3] - 2026-04-01 (Rascunho)

### Resumo

- Release preparada automaticamente a partir do historico de commits.
- Base de comparacao: v0.2.6..HEAD.

### Novidades

- Atualizar Ação De Criação De Pr Para Versão 8 E Ajustar Token.
- Add Release Issue Template With A Comprehensive Checklist For New Versions.
- Isola Lógica De Criação Do Evento Customizado De Colar.
- Add Ci Workflow Badge To Readme.md.
- Add New Vs Code Task For Pushing Git Changes With Tags..
- Add Vs Code Tasks For Linting, Formatting, And Version Management, And Update The Build Task Label..
- Add Vs Code Launch And Task Configurations For Building And Testing..
- Add A Guide For Automating Chrome Web Store Publication Using Github Actions..
- Add 640x400 Promotional Image..

### Correcoes

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

### Observacoes de Deploy

- Validar pipeline de release no GitHub e status do item na Chrome Web Store antes do upload final.

## [X.Y.Z] - YYYY-MM-DD

### Resumo

- _Resumo curto em 1 a 3 bullets._

### Novidades

- _Funcionalidades novas para usuarios._

### Correcoes

- _Bugs resolvidos e ajustes de comportamento._

### Seguranca

- _Atualizacoes de dependencia, hardening, mitigacoes._

### Observacoes de Deploy

- _Notas operacionais de release/rollout, se houver._
```

## [0.4.3] - 2026-03-31 (Planejada)

### Resumo

- Release de consolidacao das mudancas introduzidas desde a versao `0.2.6`.
- Foco em robustez operacional de CI/CD, deploy na Chrome Web Store e reducao de risco de seguranca.

### Novidades

- Automacao de deploy na Chrome Web Store integrada ao fluxo de release no GitHub Actions.
- Template de issue para checklist de release e padronizacao do processo de publicacao.
- Evolucao das tasks de desenvolvimento (testes, lint, formatacao e versao) no VS Code.

### Correcoes

- Correcoes no fluxo de versao do `manifest.json`, incluindo preservacao de formatacao e isolamento em testes de CI.
- Ajustes no pipeline de release/deploy para aumentar confiabilidade do empacotamento e envio.
- Melhorias no conteudo e no conversor para preservar arquivos copiados, validar alvo e tratar colagem/pesquisa de forma mais segura.

### Seguranca

- Harden de workflows com ajustes de permissoes em GitHub Actions (code scanning alerts).
- Atualizacoes de dependencias para mitigar vulnerabilidades conhecidas (`flatted`, `picomatch`, `handlebars`, `brace-expansion`, `yaml`).

### Observacoes de Deploy

- Base de comparacao desta release: `v0.2.6..HEAD`.
- A publicacao final na Chrome Web Store depende do estado do item no painel (ex.: `pending review` ou `ready to publish` podem bloquear upload via API).

## [0.4.2] - 2026-03-26

### Resumo

- Release oficial de validacao do pipeline de publicacao.

### Novidades

- Consolidacao da automacao de release e deploy para a Chrome Web Store.

### Correcoes

- Ajustes no fluxo operacional de empacotamento/publicacao.

### Seguranca

- Sem alteracoes de seguranca documentadas nesta release.

### Observacoes de Deploy

- Publicacao na loja depende do estado do item no painel da Chrome Web Store.
- Em estado `pending review` ou `ready to publish`, a API pode bloquear novo upload (`ITEM_NOT_UPDATABLE`).

