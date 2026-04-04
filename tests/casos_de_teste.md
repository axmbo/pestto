# Casos de Teste Manual - Pestto

Prioridade: impacto no usuário primeiro, risco técnico em seguida.

## Índice

1. [Fluxo 1 - Essencial (Smoke Test)](#fluxo-1---essencial-smoke-test)
2. [Fluxo 2 - Segurança da Conversão](#fluxo-2---segurança-da-conversão)
3. [Fluxo 3 - Não Regressão (Guard Rails)](#fluxo-3---não-regressão-guard-rails)
4. [Fluxo 4 - Interceptação Segura](#fluxo-4---interceptação-segura)
5. [Fluxo 5 - Casos de Borda Consolidados](#fluxo-5---casos-de-borda-consolidados)

## Como executar

**Pré-condições:**
- Browser: Chrome 120 ou superior.
- Versão da extensão em teste: `x.y.z` _(preencha antes de iniciar)_.
- Extensão Pestto habilitada em `chrome://extensions`.
- Estado inicial: WhatsApp Web aberto, conversa selecionada, sem modais sobrepostas, janela em foco.

1. Abra o WhatsApp Web e selecione qualquer conversa.
2. Nos Fluxos 1–3 e 5, cole o bloco de entrada inteiro de uma só vez (Ctrl+V) — mesmo que o bloco contenha trechos de código internos (como no Fluxo 5). O Fluxo 4 tem passos próprios de interação.
3. Entre fluxos, limpe o campo de entrada do WhatsApp (Ctrl+A + Delete) antes de iniciar o próximo.
4. Compare com o resultado esperado de cada etapa.

> **Critério de falha:** se qualquer saída divergir do esperado, o teste falhou — anote o conteúdo colado, o resultado obtido e o número do fluxo. Abra uma issue com a tag `bug` se ainda não houver uma para o problema encontrado.

<details open>
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
**a** e **b**
```

### Esperado

**Saída da extensão:**

```txt
Mensagem: *negrito*, _itálico_, ~tachado~ e _*aninhado*_.
*a* e *b*
```

**Aparência no WhatsApp:**
- Mensagem: **negrito**, _itálico_, ~~tachado~~ e ***aninhado***.
- **a** e **b**

Checkpoint: se as duas linhas passarem, a conversão principal está funcional.

[↑ Índice](#índice)

## Fluxo 2 - Segurança da Conversão

Objetivo: garantir que (1) código não seja alterado pela conversão e (2) texto copiado de fonte renderizada não seja re-processado indevidamente.

### 2.1 - Proteção de Blocos de Código

#### Entrada

````md
**Conversão obrigatória fora dos blocos** — `npm install` antes de rodar.

```javascript
// O conteúdo dentro do bloco deve ser ignorado pela conversão
const text = "**negrito** e *itálico* falsos";
console.log(text);
```
````

#### Esperado

| # | O que verificar | Saída da extensão | Aparência no WhatsApp |
|---|---|---|---|
| 1 | Linha completa fora do bloco (inclui código inline preservado) | `` *Conversão obrigatória fora dos blocos* — `npm install` antes de rodar. `` | **Conversão obrigatória fora dos blocos** — `npm install` antes de rodar. |
| 2 | Bloco `javascript` | inalterado | inalterado |

Checkpoint: fim da etapa de conversão/segurança.

### 2.2 - Cola de texto renderizado (Markdown preview)

Objetivo: verificar que o Pestto não injeta tags HTML e que o texto plain do clipboard é usado corretamente.

> **Pré-condição:** este documento deve estar aberto em modo renderizado — preview do VS Code (`Ctrl+Shift+V`) ou aba do GitHub. Abri-lo no arquivo `.md` bruto fará o clipboard conter os asteriscos e o teste perderá o propósito.

> O trecho abaixo está **renderizado**. Selecione-o com o cursor e copie (Ctrl+C):

---

**negrito** e *itálico*

---

1. Selecionar e copiar o trecho renderizado acima.
2. Colar no composer do WhatsApp.

**Esperado:**
- O texto aparece como `negrito e itálico` — sem asteriscos e sem tags HTML (`<strong>`, `<b>`).
- Nenhuma conversão de Markdown é realizada (o clipboard `text/plain` não contém marcadores).

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
* Item de lista Markdown.
~~ espaço no tachado ~~
_texto com underscores_
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
| 6 | `* Item de lista Markdown.` | idêntica (asterisco seguido de espaço não é marcador de itálico) |
| 7 | `~~ espaço no tachado ~~` | idêntica (espaço na borda invalida o tachado) |
| 8 | `_texto com underscores_` | idêntica (já é sintaxe nativa do WhatsApp para itálico — não há conversão necessária) |

Checkpoint: se todas as linhas forem idênticas à entrada, os guard rails estão funcionais.

[↑ Índice](#índice)

## Fluxo 4 - Interceptação Segura

Objetivo: validar que o Pestto só intervém quando deve, sem quebrar o fluxo nativo.

> **Regra:** caixa-preta — validar apenas o comportamento visível no WhatsApp Web, sem abrir DevTools.

### 4.1 - Bypass da barra lateral[^1]

1. Copiar `**negrito**`.
2. Colar no campo de busca da barra lateral do WhatsApp.

**Esperado:**
- O texto aparece como `**negrito**`, sem conversão.
- A busca funciona normalmente.

### 4.2 - Cópia interna do WhatsApp[^2]

> **Pré-condição:** execute este caso em uma conversa consigo mesmo ("Eu") ou em um contato de teste dedicado — para não enviar mensagens em conversas reais.

**Setup:**

1. No campo de entrada do WhatsApp, **digite** (não copie): `olá *mundo*`
2. Envie a mensagem.
3. Na bolha enviada, selecione e copie o texto.

**Teste:**

4. Cole no campo de entrada do WhatsApp.

**Esperado:**
- O texto aparece no campo como `olá *mundo*` — com asteriscos, sem conversão para `olá _mundo_`.
- Nenhuma duplicação ou travamento.

### 4.3 - Passthrough para texto sem markdown

1. Copiar `texto completamente normal 123`.
2. Colar no composer.

**Esperado:**

| Passo | Verificação | Resultado |
|---|---|---|
| 2 | Texto colado no composer | `texto completamente normal 123` — inalterado |

### 4.4 - Cola de imagem

1. Copiar uma imagem de qualquer fonte externa (ex.: screenshot, imagem de um site).
2. Colar no composer do WhatsApp.

**Esperado:**
- A imagem é colada normalmente (preview aparece no composer).
- Nenhum travamento, artefato de texto ou mensagem de erro visível.

### 4.5 - Cola de imagem com texto simultâneos[^3]

> **Pré-condição:** abrir `tests/fixtures/test-page.html` no Chrome via `file:///` (ex.: `file:///home/<usuário>/Dev/pestto/tests/fixtures/test-page.html`). A página contém texto formatado e uma imagem prontos para seleção.

1. Na página `tests/fixtures/test-page.html`, selecionar com o cursor todo o conteúdo dentro da caixa azul tracejada (inclui o parágrafo com **negrito** e a imagem do ícone).
2. Copiar (Ctrl+C).
3. Colar no composer do WhatsApp.

**Esperado:**
- O preview da imagem aparece no composer.
- O texto da seleção aparece como `Texto com *negrito* e _itálico_ para conversão pelo Pestto.` — marcadores convertidos para sintaxe WhatsApp.
- Nenhum travamento, perda de dados ou mensagem de erro visível.

### 4.6 - Cola fora do composer (elemento não editável)

1. Copiar `**negrito**`.
2. Clicar em uma bolha de mensagem na área da conversa (fora do campo de entrada) para tirar o foco do composer.
3. Colar (Ctrl+V).

**Esperado:**
- Nada é inserido — o navegador não executa paste fora de campos editáveis.
- Nenhum erro visível, travamento ou artefato de texto.

Checkpoint: se os **seis** casos passarem, as regras de bypass estão funcionais.

[↑ Índice](#índice)

## Fluxo 5 - Casos de Borda Consolidados

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
2**3 + 4**2 (negrito sem espaço separador).
*entre blocos*
```js
bloco1();
```
**negrito duplo**
```bash
bloco2
```
fim.
````

### Esperado

| Entrada | Saída esperada | Saída futura |
|---|---|---|
| `Antes do código **negrito**.` | `Antes do código *negrito*.` | — |
| `Entre blocos com *itálico* e \`código inline\`.` | ``Entre blocos com _itálico_ e `código inline`.`` | — |
| `**negrito**` (fora de bloco) | `*negrito*` | — |
| `*itálico*` (fora de bloco) | `_itálico_` | — |
| `~~tachado~~` | `~tachado~` | — |
| `***prioridade alta***` | `_*prioridade alta*_` | — |
| `** inválido**` / `*também inválido *` | inalterados (espaço na borda invalida) | — |
| `2 * 3 = 6` | inalterado (asterisco solto) | — |
| Código inline e blocos `js`/`bash` | inalterados | — |
| `**São Paulo**` / `*açúcar*` | `*São Paulo*` / `_açúcar_` | — |
| `- Item com **negrito** na lista.` | `- Item com *negrito* na lista.` | — |
| Emoji `😊`, acentos, multilinha | inalterados | — |
| `2**3 + 4**2` | `2*3 + 4*2` | ⚠️ não implementado[^4] |
| `*entre blocos*` (fora dos blocos) | `_entre blocos_` | — |
| `**negrito duplo**` (fora dos blocos) | `*negrito duplo*` | — |
| Bloco `js` (`bloco1()`) | inalterado | — |
| Bloco `bash` (`bloco2`) | inalterado | — |

**Aparência no WhatsApp (linhas convertidas):**

Antes do código **negrito**.

Entre blocos com _itálico_ e `código inline`.

Depois com ~~tachado~~, `npm test`, 2 * 3 = 6 e ***prioridade alta***.

Produto: **São Paulo** e _açúcar_ 😊.

- Item com **negrito** na lista.

> Blocos `js`/`bash`, espaços inválidos (`** inválido**`, `*também inválido *`) e multilinha: inalterados.

[↑ Índice](#índice)

---

[^1]: O Pestto encerra a execução ao detectar que o alvo do evento está dentro do seletor `#side` (barra lateral), antes de criar qualquer evento sintético. O campo de busca recebe o paste nativo normalmente.

[^2]: Ao copiar uma bolha de conversa, o WhatsApp adiciona o tipo MIME `application/whatsapp` ao clipboard. O Pestto detecta esse tipo e aborta a conversão, devolvendo o controle ao WhatsApp. Sem essa proteção, `*mundo*` (negrito nativo do WhatsApp) seria convertido para `_mundo_` (itálico Markdown), alterando o significado da formatação.

[^3]: Ao selecionar conteúdo rico em uma página, o clipboard recebe simultaneamente um item `file` (imagem) e itens `text/plain`/`text/html`. O `content.js` deve preservar ambos no evento sintético — o arquivo via `dataTransfer.items.add(file)` e o texto convertido via `setData`.

[^4]: Caso não implementado — ver [issue #18](https://github.com/axmbo/pestto/issues/18). No estado atual, `*3 + 4*` é renderizado pelo WhatsApp como itálico, deixando o texto visível incorreto após o envio.
