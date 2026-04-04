# Casos de Teste Manual - Pestto

Prioridade: impacto no usuário primeiro, risco técnico em seguida.

## Índice

1. [Fluxo 1 - Essencial (Smoke Test)](#fluxo-1---essencial-smoke-test)
2. [Fluxo 2 - Segurança da Conversão](#fluxo-2---segurança-da-conversão)
3. [Fluxo 3 - Não Regressão (Guard Rails)](#fluxo-3---não-regressão-guard-rails)
4. [Fluxo 4 - Interceptação Segura](#fluxo-4---interceptação-segura)
5. [Fluxo 5 - Estresse Consolidado](#fluxo-5---estresse-consolidado)

## Como executar

1. Abra o WhatsApp Web e selecione qualquer conversa.
2. Cole os blocos na ordem abaixo.
3. Compare com o resultado esperado de cada etapa.

<details>
<summary>Legenda visual</summary>

Os blocos "Aparência no WhatsApp" usam Markdown padrão para aproximar o visual do que o WhatsApp renderiza após o envio.

| Token na saída da extensão | Markdown usado neste documento | Aparência | Fallback textual |
|---|---|---|---|
| `*texto*` | `**texto**` | **texto** | negrito |
| `_texto_` | `_texto_` | _texto_ | itálico |
| `~texto~` | `~~texto~~` | ~~texto~~ | tachado |
| `_*texto*_` | `***texto***` | ***texto*** | negrito+itálico |

</details>

## Fluxo 1 - Essencial (Smoke Test)

Objetivo: validar o núcleo da feature em uma única colagem.

### Entrada

```md
Mensagem: **negrito**, *itálico*, ~~tachado~~ e ***aninhado***.
```

### Esperado

**Saída da extensão:**

```txt
Mensagem: *negrito*, _itálico_, ~tachado~ e _*aninhado*_.
```

**Aparência no WhatsApp:** Mensagem: **negrito**, _itálico_, ~~tachado~~ e ***aninhado***.

Checkpoint: se este bloco passar, a conversão principal está funcional.

[↑ Índice](#índice)

## Fluxo 2 - Segurança da Conversão

Objetivo: garantir que código não seja alterado.

### Entrada

````md
**Conversão obrigatória fora dos blocos** — `npm install` antes de rodar.

```javascript
// O conteúdo dentro do bloco deve ser ignorado pela conversão
const text = "**negrito** e *itálico* falsos";
console.log(text);
```
````

### Esperado

| # | O que verificar | Resultado esperado |
|---|---|---|
| 1 | Texto fora do bloco | `*Conversão obrigatória fora dos blocos*` → **Conversão obrigatória fora dos blocos** |
| 2 | Código inline `` `npm install` `` | inalterado |
| 3 | Bloco `javascript` | inalterado |

Checkpoint: fim da etapa de conversão/segurança.

[↑ Índice](#índice)

## Fluxo 3 - Não Regressão (Guard Rails)

Objetivo: validar que nenhuma linha abaixo é alterada pela extensão.

### Entrada

```md
Matemática: 2 * 3 = 6 e 4 * 5 = 20.
Inline com marcador falso: `código com **negrito** falso`.
Formatação incompleta: aqui vai um **negrito sem fechamento.
Sem formatação: texto completamente normal.
Multilinha: **primeira linha
e segunda linha**.
```

### Esperado

A saída deve ser **idêntica** à entrada — nenhuma linha é convertida.

| # | Linha | Saída esperada |
|---|---|---|
| 1 | `Matemática: 2 * 3 = 6 e 4 * 5 = 20.` | idêntica |
| 2 | `` Inline com marcador falso: `código com **negrito** falso`. `` | idêntica |
| 3 | `Formatação incompleta: aqui vai um **negrito sem fechamento.` | idêntica |
| 4 | `Sem formatação: texto completamente normal.` | idêntica |
| 5 | `Multilinha: **primeira linha` / `e segunda linha**.` | idênticas |

[↑ Índice](#índice)

## Fluxo 4 - Interceptação Segura

Objetivo: validar que o Pestto só intervém quando deve, sem quebrar o fluxo nativo.

> **Regra:** caixa-preta — validar apenas o comportamento visível no WhatsApp Web, sem abrir DevTools.

### 4.1 - Bypass da barra lateral

1. Copiar `**negrito**`.
2. Colar no campo de busca da barra lateral do WhatsApp.

**Esperado:**
- O texto aparece como `**negrito**`, sem conversão.
- A busca funciona normalmente.

### 4.2 - Cópia interna do WhatsApp

1. Copiar uma mensagem de uma bolha de conversa dentro do próprio WhatsApp.
2. Colar no composer.

**Esperado:**
- O conteúdo é preservado exatamente como copiado, sem reconversão, duplicação ou travamento.

### 4.3 - Passthrough para texto sem markdown

1. Copiar `texto completamente normal 123`.
2. Colar no composer.
3. Ainda no composer, copiar e colar `**controle de evento sintético**`.

**Esperado:**

| Passo | Verificação | Resultado |
|---|---|---|
| 2 | Texto colado no composer | `texto completamente normal 123` — inalterado |
| 3 | Conversão aplicada | `*controle de evento sintético*` → **controle de evento sintético** |

Checkpoint: se os três casos passarem, as regras de bypass estão funcionais.

[↑ Índice](#índice)

## Fluxo 5 - Estresse Consolidado

Objetivo: validar casos de borda em um único cenário.

### Entrada

````md
Antes do código **negrito**.

```js
const a = "**não converter**";
```

Entre blocos com *itálico* e `código inline`.

```bash
echo "*também não converter*"
```

Depois com ~~tachado~~, `npm test`, 2 * 3 = 6 e ***prioridade alta***.
Espaços inválidos: ** inválido** e *também inválido *.
Produto: **São Paulo** e *açúcar* 😊.
- Item com **negrito** na lista.
Multilinha **linha 1
e linha 2** não converte.
````

### Esperado

| Entrada | Saída esperada |
|---|---|
| `**negrito**` (fora de bloco) | `*negrito*` |
| `*itálico*` (fora de bloco) | `_itálico_` |
| `~~tachado~~` | `~tachado~` |
| `***prioridade alta***` | `_*prioridade alta*_` |
| `** inválido**` / `*também inválido *` | inalterados (espaço na borda invalida) |
| `2 * 3 = 6` | inalterado (asterisco solto) |
| Código inline e blocos `js`/`bash` | inalterados |
| `**São Paulo**` / `*açúcar*` | `*São Paulo*` / `_açúcar_` |
| Emoji `😊`, acentos, marcador `-`, multilinha | inalterados |

**Aparência no WhatsApp (linhas convertidas):**

Antes do código **negrito**.

Entre blocos com _itálico_ e `código inline`.

Depois com ~~tachado~~, `npm test`, 2 * 3 = 6 e ***prioridade alta***.

Produto: **São Paulo** e _açúcar_ 😊.

- Item com **negrito** na lista.

> Blocos `js`/`bash`, espaços inválidos (`** inválido**`, `*também inválido *`) e multilinha: inalterados.

[↑ Índice](#índice)
