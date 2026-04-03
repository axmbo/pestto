# Regras de Git para Agentes

Estas regras se aplicam a qualquer agente de IA operando neste repositorio, incluindo IDEs diferentes.

## Regras de branch (obrigatorias)

- Nunca fazer commit diretamente na branch main.
- Antes de qualquer commit, verificar a branch atual com git branch --show-current.
- Se a branch atual for main, interromper e criar uma branch de trabalho.
- Nunca criar branch a partir de outra branch sem confirmacao explicita do usuario.

## Fluxo esperado

1. Garantir que a branch atual nao e main.
2. Se estiver em main, criar branch descritiva (ex.: chore/..., feat/..., fix/...).
3. Implementar mudancas na branch de trabalho.
4. Somente commitar e abrir PR a partir da branch de trabalho.

## Seguranca operacional

- Se houver qualquer duvida sobre branch de destino, interromper e perguntar ao usuario antes de commitar.
- Nunca usar comandos destrutivos de git sem solicitacao explicita do usuario.
