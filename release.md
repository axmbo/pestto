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
- Para gerar RC/Beta com npm, sempre informe `--preid` (ex.: `--preid=rc`), para evitar versoes no formato `-0`.

## Fluxo Oficial (Fim a Fim)

### 1. Criar a Issue de Release

1. Abra uma issue a partir do template de release em `.github/ISSUE_TEMPLATE/release.md`.
2. Use a issue como checklist e trilha de auditoria da liberacao.

### 2. Preparar Documentacao da Versao

1. Atualize `CHANGELOG.md` (historico tecnico).
2. Atualize `RELEASE_NOTES.md` (historico para usuarios finais).
3. Opcional: use o workflow "Gerar Docs de Release (PR)" para abrir a PR automatica de docs.

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
npm version prerelease --preid=rc
```

Para rodar homologacao Beta, use:

```bash
npm version prerelease --preid=beta
```

2. Envie commit/tag.
3. Publique no GitHub como pre-release.
4. Distribua o ZIP da release RC/Beta para homologadores.

Instalacao para homologacao (usuarios tecnicos):

1. Baixar o ZIP da release RC/Beta.
2. Remover outras versoes da extensao no navegador.
3. Abrir `chrome://extensions/`.
4. Arrastar o ZIP para a pagina de extensoes.

Observacao: homologacao nao deve usar Chrome Web Store.

### 5. Release Oficial de Producao

Somente apos aprovacao da homologacao:

1. Bump oficial (patch/minor/major):

```bash
npm version patch
```

2. Push de branch e tags:

```bash
git push origin main --tags
```

3. Validar workflow "Publicar Release Oficial".
4. Executar manualmente o workflow "Deploy na Chrome Web Store" com confirmacao explicita.
5. Validar conclusao do deploy na loja.

## Guard Rail Obrigatorio no Deploy da Loja

O workflow `.github/workflows/deploy-chrome.yml` bloqueia deploy de versoes pre-release (`-rc`/`-beta`) com erro explicito.

Regra:

- O deploy e 100% manual (`workflow_dispatch`) e exige confirmacao explicita com o valor `SIM_DEPLOY_LOJA`.
- O job le `package.json` e falha caso a versao seja pre-release.

## Teste Seguro do Bloqueio (Sem Caminho Feliz)

Para validar a protecao sem risco de publicacao:

1. Execute apenas cenarios RC/Beta.
2. Confirme falha do job antes do passo de upload.
3. Confirme no log que `Upload pra Loja da Google` nao foi executado.

Nao execute testes de caminho feliz nesse contexto.

### Roteiro recomendado (2 testes de falha)

Teste 1: gatilho por release pre-release (seguro)

1. Em uma branch temporaria de teste, ajuste `package.json` para uma versao com sufixo pre-release (ex.: `0.4.3-rc.99`).
2. Abra o workflow `Deploy na Chrome Web Store` e execute via `workflow_dispatch` nessa branch com confirmacao valida `SIM_DEPLOY_LOJA`.
3. Resultado esperado: falha no passo `Bloquear deploy de pre-release (RC/Beta)`.
4. Evidencia esperada: logs com `versao do package.json e pre-release` e ausencia da execucao de `Upload pra Loja da Google`.

Teste 2: gatilho manual com confirmacao invalida (seguro)

1. Em qualquer branch de teste, execute `workflow_dispatch` sem informar exatamente `SIM_DEPLOY_LOJA`.
2. Resultado esperado: falha no passo `Confirmacao explicita obrigatoria`.
3. Evidencia esperada: log com `Deploy cancelado` e resumo no `GITHUB_STEP_SUMMARY`.

Observacao operacional:

- Nao rode `workflow_dispatch` em branch/tag estavel durante os testes de bloqueio.
