# Guia de Release e Deploy

Este arquivo centraliza o processo de liberação do Pestto.

Objetivos do processo:

- Simplicidade operacional para quem esta chegando no projeto.
- Automacao onde for segura.
- Qualidade garantida por gates tecnicos.
- Evitar publicacao acidental de versoes de homologacao na Chrome Web Store.

## Politica de Versoes (Simples)

- Producao: `X.Y.Z` (ex.: `0.4.3`).
- Homologacao distribuida: `X.Y.Z-rc.N` ou `X.Y.Z-beta.N` (ex.: `0.4.3-rc.1`).
- RC/Beta nunca vai para a loja.
- RC/Beta e distribuida por ZIP via GitHub Release para usuarios tecnicos.
- Para gerar RC/Beta com npm, use `npm run version:rc` ou `npm run version:beta` (nunca `npm version prerelease` sem `--preid`, pois gera versoes no formato `-0`).

## Fluxo Oficial (Fim a Fim)

### 1. Criar a Issue de Release

1. Abra uma issue a partir do template de release em `.github/ISSUE_TEMPLATE/release.md`.
2. Use a issue como checklist e trilha de auditoria da liberacao.

### 2. Preparar Documentacao da Versao

1. Atualize `CHANGELOG.md` (historico tecnico).
2. Atualize `RELEASE_NOTES.md` (historico para usuarios finais).
3. Opcional: use o workflow "Gerar Docs de Release (PR)" para abrir a PR automatica de docs.
4. Se a release incluir feature importante, atualize também o roteiro `tests/casos_de_teste.md`.

Observacao: o rascunho gerado em `RELEASE_NOTES.md` passa a incluir a secao "Teste Manual" com link para `tests/casos_de_teste.md`.

### 3. Rodar Gates de Qualidade (Obrigatorio)

Execute localmente:

```bash
npm run lint
npm run format:check
npm test
```

Se houver falhas, corrija e rode novamente antes de avancar.

### 4. Homologacao por RC/Beta (Sem Loja)

Use quando houver validacao manual por POs/usuarios-chave tecnicos.

1. Gere versao de homologacao:

```bash
npm run version:rc
```

Para rodar homologacao Beta, use:

```bash
npm run version:beta
```

2. Envie commit/tag.
3. O workflow `Publicar Release Oficial` marca automaticamente como pre-release quando a tag contem `-beta.N` ou `-rc.N`.
4. Distribua o ZIP da release RC/Beta para homologadores.
5. Execute o roteiro de testes manuais em `tests/casos_de_teste.md` na versão de homologação e registre os resultados na issue de release.

Observação: as notas da release passam a incluir um bloco padrão de instalação e um link para `docs/INSTALACAO.md`.

Instalação para homologação (usuários técnicos):

1. Baixar o ZIP da release RC/Beta.
2. Remover outras versoes da extensão no navegador.
3. Abrir `chrome://extensions/`.
4. Arrastar o ZIP para a pagina de extensões.

Observação: homologação não deve usar Chrome Web Store.

### 5. Release Oficial de Produção

Somente após aprovação da homologação:

1. Bump oficial (patch/minor/major):

```bash
npm version patch
```

2. Push de branch e tags:

```bash
git push origin main --tags
```

3. Validar workflow "Publicar Release Oficial".
4. Executar manualmente o workflow "Deploy na Chrome Web Store" com confirmação explícita.
5. Validar conclusão do deploy na loja.

## Guard Rail Obrigatório no Deploy da Loja

O workflow `.github/workflows/deploy-chrome.yml` bloqueia deploy de versoes pre-release (`-rc`/`-beta`) com erro explicito.

Regra:

- O deploy e 100% manual (`workflow_dispatch`) e exige confirmação explícita com o valor `SIM_DEPLOY_LOJA`.
- O job lê `package.json` e falha caso a versão seja pré-release.

## Teste Seguro do Bloqueio (Sem Caminho Feliz)

Para validar a proteção sem risco de publicação:

1. Execute apenas cenários RC/Beta.
2. Confirme falha do job antes do passo de upload.
3. Confirme no log que `Upload pra Loja da Google` não foi executado.

Não execute testes de caminho feliz nesse contexto.

### Roteiro recomendado (2 testes de falha)

Teste 1: gatilho por release pré-release (seguro)

1. Em uma branch temporária de teste, ajuste `package.json` para uma versao com sufixo pré-release (ex.: `0.4.3-rc.99`).
2. Abra o workflow `Deploy na Chrome Web Store` e execute via `workflow_dispatch` nessa branch com confirmação válida `SIM_DEPLOY_LOJA`.
3. Resultado esperado: falha no passo `Bloquear deploy de pré-release (RC/Beta)`.
4. Evidência esperada: logs com `versao do package.json e pré-release` e ausencia da execução de `Upload pra Loja da Google`.

Teste 2: gatilho manual com confirmação inválida (seguro)

1. Em qualquer branch de teste, execute `workflow_dispatch` sem informar exatamente `SIM_DEPLOY_LOJA`.
2. Resultado esperado: falha no passo `Confirmação explícita obrigatória`.
3. Evidência esperada: log com `Deploy cancelado` e resumo no `GITHUB_STEP_SUMMARY`.

Observação operacional:

- Não rode `workflow_dispatch` em branch/tag estável durante os testes de bloqueio.
