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

### 4.1 - Bypass da barra lateral

- Abrir o DevTools do navegador (Console) e executar:

    ```js
    window.__pesttoObs = { synthetic: 0, sideBypass: 0, whatsappBypass: 0 };
    document.addEventListener(
        'paste',
        (e) => {
            if (e.isPesttoEvent) {
                window.__pesttoObs.synthetic += 1;
                return;
            }

            const target = e.target;
            if (target?.closest && target.closest('#side')) {
                window.__pesttoObs.sideBypass += 1;
            }

            const types = Array.from(e.clipboardData?.types || []);
            if (types.includes('application/whatsapp')) {
                window.__pesttoObs.whatsappBypass += 1;
            }
        },
        true
    );
    ```
- Copiar `**negrito**`.
- Colar no campo de busca da barra lateral do WhatsApp.

Esperado:
- O texto aparece como `**negrito**`, sem conversão.
- `window.__pesttoObs.sideBypass` aumenta após a cola.
- `window.__pesttoObs.synthetic` não aumenta nesse passo.

### 4.2 - Cópia interna do WhatsApp

- Copiar uma mensagem de uma bolha de conversa dentro do próprio WhatsApp.
- Colar no composer.

Esperado:
- O conteúdo é preservado exatamente como copiado, sem reconversão.
- `window.__pesttoObs.whatsappBypass` aumenta após a cola.
- `window.__pesttoObs.synthetic` não aumenta nesse passo.

### 4.3 - Passthrough para texto sem markdown

- Abrir o DevTools do navegador (Console) e executar:

    ```js
    window.__pesttoSyntheticPasteCount = 0;
    document.addEventListener(
        'paste',
        (e) => {
            if (e.isPesttoEvent) window.__pesttoSyntheticPasteCount += 1;
        },
        true
    );
    ```
- Copiar `texto completamente normal 123`.
- Colar no composer.
- Em seguida, ainda no composer, copiar e colar `**controle de evento sintético**`.

Esperado:
- O conteúdo final permanece `texto completamente normal 123`.
- Não há diferença observável entre colar com ou sem Pestto ativo.
- `window.__pesttoSyntheticPasteCount` permanece `0` após a cola.
- Após a cola de `**controle de evento sintético**`, o contador fica maior que `0`.
- O trecho `**controle de evento sintético**` é convertido para `*controle de evento sintético*`.

Checkpoint: se os três casos passarem, as regras de bypass estão funcionais.

## Fluxo 5 - Estresse Consolidado

Objetivo: validar casos de borda em um único cenário, sem troca de contexto.

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

1. `**negrito**` fora dos blocos vira `*negrito*`.
2. `*itálico*` fora dos blocos vira `_itálico_`.
3. `~~tachado~~` vira `~tachado~`.
4. `***prioridade alta***` vira `_*prioridade alta*_`.
5. `** inválido**` e `*também inválido *` permanecem iguais (espaço na borda invalida a marcação).
6. `2 * 3 = 6` permanece igual (asterisco solto não forma par válido).
7. `` `npm test` `` e `` `código inline` `` permanecem iguais.
8. Blocos `js` e `bash` permanecem exatamente iguais.
9. `**São Paulo**` vira `*São Paulo*` e `*açúcar*` vira `_açúcar_`.
10. Emoji (`😊`) e acentos permanecem intactos.
11. Marcador de lista (`-`) permanece igual.
12. Formatação multilinha não é convertida.

## Status do roteiro

### Fluxos oficiais

1. **Fluxo 1** - Negrito, itálico, tachado e aninhado (smoke test).
2. **Fluxo 2** - Proteção de código inline e bloco; conversão seletiva fora do código.
3. **Fluxo 3** - Guard rails: asteriscos matemáticos, formatação incompleta, multilinha e texto sem markdown.
4. **Fluxo 4** - Interceptação segura: alvo não editável, barra lateral, cópia interna e passthrough nativo.
5. **Fluxo 5** - Estresse consolidado: múltiplos blocos, espaços inválidos, caracteres especiais, emoji, listas e multilinha.
