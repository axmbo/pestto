# Regras de Git para Agentes

Estas regras se aplicam a qualquer agente de IA operando neste repositório, incluindo IDEs diferentes.

## Regras de branch (obrigatórias)

- Nunca fazer commit diretamente na branch main.
- Antes de qualquer commit, verificar a branch atual com git branch --show-current.
- Se a branch atual for main, interromper e criar uma branch de trabalho.
- Nunca criar branch a partir de outra branch sem confirmação explícita do usuário.

## Fluxo esperado

1. Garantir que a branch atual não é main.
2. Se estiver em main, criar branch descritiva (ex.: chore/..., feat/..., fix/...).
3. Implementar mudanças na branch de trabalho.
4. Somente commitar e abrir PR a partir da branch de trabalho.

## Segurança operacional

- Se houver qualquer dúvida sobre branch de destino, interromper e perguntar ao usuário antes de commitar.
- Nunca usar comandos destrutivos de git sem solicitação explícita do usuário.
