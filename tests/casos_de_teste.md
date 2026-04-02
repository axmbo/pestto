# Casos de Teste Manual - Pestto

Este roteiro foi organizado para ser executado do início ao fim com o mínimo de trocas de contexto.
Prioridade: impacto no usuário primeiro, risco técnico em seguida.

## Como executar com menos passos

1. Abra o WhatsApp Web e selecione qualquer conversa.
2. Cole os blocos na ordem abaixo.
3. Compare com o resultado esperado de cada etapa.

## Roteiro oficial atual

Os fluxos desta seção já fazem parte do roteiro principal e devem ser executados do início ao fim.

## Fluxo 1 - Essencial (Smoke Test)

Objetivo: validar o núcleo da feature em uma única colagem.

### Entrada

```md
Mensagem: **negrito**, *itálico*, ~~tachado~~ e ***aninhado***.
```

### Esperado

```txt
Mensagem: *negrito*, _itálico_, ~tachado~ e _*aninhado*_.
```

Observação: o resultado esperado para o trecho aninhado é _*aninhado*_.

Checkpoint: se este bloco passar, a conversão principal está funcional.

## Fluxo 2 - Segurança da Conversão

Objetivo: garantir que código não seja alterado, mantendo o mesmo setup do Fluxo 1.

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

1. `**Conversão obrigatória fora dos blocos**` foi convertido para `*Conversão obrigatória fora dos blocos*`.
2. O código em linha (`npm install`) permanece exatamente igual.
3. O bloco de código permanece exatamente igual.

Checkpoint: fim dos fluxos principais. Prossiga obrigatoriamente para o Fluxo 3.

## Fluxo 3 - Não Regressão (Guard Rails)

Objetivo: validar cenários que devem ser mantidos sem conversão indevida.

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

1. Asteriscos matemáticos continuam iguais.
2. Marcações dentro de código inline continuam iguais.
3. Formatação incompleta não é convertida.
4. Texto sem markdown não é alterado.
5. Formatação que cruza quebra de linha não é convertida.

## Fluxo 4 - Interceptação Segura

Objetivo: validar que o Pestto só intervém quando deve, sem quebrar o fluxo nativo.

### 4.1 - Alvo não editável (barra lateral)

- Copiar `**negrito**`.
- Colar no campo de busca da barra lateral do WhatsApp.

Esperado:
- O texto aparece como `**negrito**`, sem conversão.
- Bypass acionado pela proteção da barra lateral.

### 4.2 - Cópia interna do WhatsApp

- Copiar uma mensagem de uma bolha de conversa dentro do próprio WhatsApp.
- Colar no composer.

Esperado:
- O conteúdo é preservado exatamente como copiado, sem reconversão.
- Bypass acionado por tipo MIME `application/whatsapp`.

### 4.3 - Passthrough para texto sem markdown

- Copiar `texto completamente normal 123`.
- Colar no composer.

Esperado:
- O conteúdo final permanece `texto completamente normal 123`.
- Não há diferença observável entre colar com ou sem Pestto ativo.
- Nenhum evento sintético é disparado quando não há conversão.

Checkpoint: se os três casos passarem, as regras de bypass estão funcionais.

## Testes candidatos para promoção

Os itens abaixo ainda não fazem parte do fluxo principal. Eles estão organizados por prioridade para validação e futura promoção ao roteiro oficial.

### P0 - Alta prioridade

1. Alvo não editável deve ser ignorado.

    Exemplo de execução:
    - Copiar `**negrito**`.
    - Colar no campo de busca da barra lateral do WhatsApp.

    Esperado:
    - O Pestto não intercepta a cola.
    - O texto aparece como `**negrito**`, sem conversão.

2. Cópia interna do WhatsApp deve ser ignorada.

    Exemplo de execução:
    - Copiar uma mensagem já existente dentro do próprio WhatsApp.
    - Colar no composer.

    Esperado:
    - O Pestto não reconverte o conteúdo.
    - A mensagem colada preserva exatamente o conteúdo copiado.

3. Texto sem alteração deve seguir o fluxo nativo de colar.

    Exemplo de execução:
    - Copiar `texto completamente normal 123`.
    - Colar no composer.

    Esperado:
    - O conteúdo final permanece `texto completamente normal 123`.
    - Não há diferença observável entre colar com ou sem Pestto ativo.

### P1 - Média prioridade

1. Espaços nas bordas da marcação:
    - Entrada: `** texto** e **texto ** e * itálico* e *itálico *`
    - Esperado: o texto permanece exatamente igual, sem conversão, pois o Markdown não considera a marcação válida quando há espaço logo após o marcador de abertura ou logo antes do marcador de fechamento.
2. Múltiplos blocos de código no mesmo texto.

    Entrada:

    ````md
    Antes do código **negrito**.

    ```js
    const a = "**não converter**";
    ```

    Entre blocos com *itálico*.

    ```bash
    echo "*também não converter*"
    ```

    Depois dos blocos com ~~tachado~~.
    ````

    Esperado:
    - `**negrito**` fora do código converte para `*negrito*`.
    - `*itálico*` fora do código converte para `_itálico_`.
    - `~~tachado~~` fora do código converte para `~tachado~`.
    - O conteúdo dos dois blocos de código permanece exatamente igual.

3. Mistura intensa de formatos na mesma mensagem longa.

    Entrada:

    ```md
    Resumo da entrega: **pronto**, com *ajustes finos*, custo 2 * 3 = 6, comando `npm test`, bloco ~~estável~~ e ***prioridade alta***.
    Segunda linha com **outro negrito** e texto normal.
    ```

    Esperado:
    - `**pronto**` vira `*pronto*`.
    - `*ajustes finos*` vira `_ajustes finos_`.
    - `2 * 3 = 6` permanece igual.
    - `` `npm test` `` permanece igual.
    - `~~estável~~` vira `~estável~`.
    - `***prioridade alta***` vira `_*prioridade alta*_`.
    - A segunda linha também converte apenas as marcações válidas.

### P2 - Baixa prioridade

1. Caracteres especiais, acentuação e emoji em mensagens promocionais.

    Entrada:

    ```md
    Produto: **São Paulo** em promoção e *açúcar* orgânico.
    Status: **aprovado** para João, Maria e Ana 😊.
    Preço: 10% de desconto e ação em São Paulo.
    ```

    Esperado:
    - `**São Paulo**` vira `*São Paulo*`.
    - `*açúcar*` vira `_açúcar_`.
    - `**aprovado**` vira `*aprovado*`.
    - Acentos, cedilha (`ç`), `%` e emoji permanecem intactos.
2. Casos com listas e markdown misto para diferenciar de formatação inline.

    Entrada:

    ```md
    - Item com **negrito**
    - Item com *itálico*
    - Item com `npm install`
    - Item com 2 * 3 = 6
    ```

    Esperado:
    - Os marcadores da lista permanecem iguais.
    - `**negrito**` vira `*negrito*`.
    - `*itálico*` vira `_itálico_`.
    - `` `npm install` `` permanece igual.
    - `2 * 3 = 6` permanece igual.

## Status do roteiro

### Oficial hoje

1. Negrito, itálico, tachado e aninhado.
2. Código inline e bloco de código protegidos.
3. Matemática com asteriscos, incompleto aberto e texto sem markdown.

### Candidatos prontos para validação

1. Regras de interceptação de paste do content script.
2. Casos de borda com espaços na marcação.
3. Cenários longos com mistura de formatos, listas, caracteres especiais e múltiplos blocos de código.
