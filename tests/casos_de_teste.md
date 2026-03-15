# Casos de Teste Manual - Pestto

Este arquivo contém exemplos dos principais cenários de conversão cobertos pelo Pestto (Markdown -> WhatsApp).
Copie o conteúdo abaixo (ou partes dele) para testar a conversão manualmente.

## 1. Formatações Básicas
- **Negrito**: Isso é um texto em **negrito**.
- *Itálico*: Isso é um texto em *itálico*.
- ~~Tachado~~: Isso é um texto ~~tachado~~.

## 2. Código e Blocos Protegidos
- **Código em linha**: O comando `npm install` não deve ser formatado.
- **Bloco de código**:
```javascript
// O conteúdo dentro do bloco deve ser ignorado pela conversão
const text = "**negrito** e *itálico* falsos";
console.log(text);
```

## 3. Casos Aninhados e Compostos
- **Múltiplos formatos na mesma linha**: Um texto com **negrito** e também com *itálico*.
- **Negrito e Itálico simultâneos**: Esse é um teste ***aninhado*** com os dois formatos.

## 4. Casos Extremos (Devem ser ignorados / mantidos)
- **Matemática (asteriscos soltos)**: A conta de 2 * 3 = 6 e de 4 * 5 = 20.
- **Código inline contendo marcações**: Cuidado com o `código com **negrito** falso` no meio.
- **Formatação incompleta aberta**: Aqui vai um **negrito sem fechamento.
- **Sem formatação**: Um texto completamente normal e sem nenhum caractere especial.
