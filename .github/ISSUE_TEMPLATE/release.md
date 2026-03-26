---
name: Lançamento de Versão
about: Checklist para liberação de uma nova versão do Pestto.
title: 'release: v'
labels: release
assignees: ''
---

## 🚀 Checklist de Lançamento

### 🛡️ Segurança e Qualidade

- [ ] Verificar alertas do **GitHub Copilot Autofix** e **Dependabot**.
- [ ] Aguardar 3 dias (conforme planejado) para novas detecções de vulnerabilidades.
- [ ] Executar testes locais: `npm test`.
- [ ] Executar linting: `npm run lint`.

### 📦 Preparação do Pacote

- [ ] Atualizar versão no `package.json` e `manifest.json`: `npm version [patch|minor|major]`.
- [ ] Gerar CHANGELOG: o script de versionamento já cuida disso (`npm run version`).
- [ ] Gerar build final: `npm run build`.
- [ ] Testar o arquivo ZIP gerado (`pestto-latest.zip`) instalando manualmente no Chrome.

### 🌐 Publicação

- [ ] Fazer push das tags para o GitHub: `git push origin main --tags`.
- [ ] Verificar se o workflow de release no GitHub Actions terminou com sucesso.
- [ ] Fazer upload do novo ZIP no [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/).
- [ ] Atualizar notas de versão na loja.

### 🏁 Finalização

- [ ] Validar a publicação na Chrome Web Store após aprovação.
- [ ] Fechar esta issue.
