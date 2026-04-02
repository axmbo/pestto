---
name: Lançamento de Versão
about: Checklist para liberação de uma nova versão do Pestto.
title: 'release: v'
labels: release
assignees: ''
---

## 🚀 Checklist de Lançamento

Referencia oficial do processo: `release.md`.

### 🛡️ Segurança e Qualidade

- [ ] Verificar alertas do **GitHub Copilot Autofix** e **Dependabot**.
- [ ] Aguardar 3 dias (conforme planejado) para novas detecções de vulnerabilidades.
- [ ] Executar testes locais: `npm test`.
- [ ] Executar linting: `npm run lint`.
- [ ] Executar verificação de formatação: `npm run format:check`.
- [ ] Revisar e atualizar o roteiro de testes manuais em `tests/casos_de_teste.md` quando houver feature importante na release.

### 📦 Preparação do Pacote

- [ ] Executar o workflow **Gerar Docs de Release (PR)** e revisar a PR automática de documentação.
- [ ] Fazer merge da PR de docs antes do bump de versão.
- [ ] Se houver homologação distribuída, gerar e validar versão `rc/beta` via ZIP (sem loja), usando `npm run version:rc` ou `npm run version:beta`, conforme `release.md`.
- [ ] Em homologação RC/Beta, executar o roteiro manual de `tests/casos_de_teste.md` e registrar evidências na issue.
- [ ] Atualizar versão no `package.json` e `manifest.json`: `npm version [patch|minor|major]`.
- [ ] Gerar build final: `npm run build`.
- [ ] Testar o arquivo ZIP gerado (`pestto-latest.zip`) instalando manualmente no Chrome.

### 🌐 Publicação

- [ ] Fazer push das tags para o GitHub: `git push origin main --tags`.
- [ ] Verificar se o workflow **Publicar Release Oficial** terminou com sucesso.
- [ ] Verificar se o workflow **Deploy na Chrome Web Store** terminou com sucesso.
- [ ] Confirmar que nenhum release `rc/beta` chegou ao passo de upload da loja (guard rail ativo).

### 🏁 Finalização

- [ ] Validar a publicação na Chrome Web Store após aprovação.
- [ ] Fechar esta issue.
