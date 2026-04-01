# Release Notes

Este arquivo consolida as notas de release publicas por versao.

Regra de uso:

- Atualize este arquivo a cada release oficial (`vX.Y.Z`).
- Mantenha o resumo executivo aqui e o historico tecnico no `CHANGELOG.md`.
- Sempre alinhe os itens com a secao da versao correspondente no `CHANGELOG.md`.

## Template

Copie o bloco abaixo para uma nova versao:

```md
## [X.Y.Z] - YYYY-MM-DD

### Resumo

- _Resumo curto em 1 a 3 bullets._

### Novidades

- _Funcionalidades novas para usuarios._

### Correções

- _Bugs resolvidos e ajustes de comportamento._

### Segurança

- _Atualizacoes de dependencia, hardening, mitigacoes._

### Observações de Deploy

- _Notas operacionais de release/rollout, se houver._
```

## [0.4.3] - 2026-03-31 (Planejada)

### Resumo

- Esta versão melhora a experiência de uso em ações de copiar e colar conteúdo.
- O foco foi tornar as interações mais confiáveis, com menos risco de perda de informação.

### Novidades

- Preservação aprimorada do conteúdo copiado, reduzindo falhas em cenários de conversão.
- Validação mais segura do destino da ação, evitando operações em contextos incorretos.
- Tratamento mais robusto de colagem e pesquisa, com comportamento mais estável no uso diário.

### Correções

- Correções no conteúdo e no conversor para evitar perda de dados em cópias e colagens.
- Ajustes de validação para reduzir ações inválidas e melhorar a previsibilidade do resultado.

### Segurança

- Reforços de segurança internos para tornar a extensão mais confiável durante o uso.
