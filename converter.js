/**
 * Função responsável por converter a sintaxe Markdown para a sintaxe do WhatsApp.
 * @param {string} text - O texto original em Markdown.
 * @returns {string} - O texto formatado para o WhatsApp.
 */
function markdownToWhatsApp(text) {
  // Cofres para guardar nossos códigos originais
  const codeBlocks = [];
  const inlineCodes = [];

  // 1. PROTEGER BLOCOS DE CÓDIGO (```texto```)
  // O [\s\S]*? pega tudo, inclusive múltiplas quebras de linha
  let processedText = text.replace(/```([\s\S]*?)```/g, (match) => {
    codeBlocks.push(match);
    return `__BLOCK_${codeBlocks.length - 1}__`;
  });

  // 2. PROTEGER CÓDIGO INLINE (`texto`)
  processedText = processedText.replace(/`([^`]+)`/g, (match) => {
    inlineCodes.push(match);
    return `__INLINE_${inlineCodes.length - 1}__`;
  });

  // 3. APLICAR SUAS REGRAS DE CONVERSÃO AQUI
  // Converte a formatação para tokens temporários para evitar interferência entre expressões regulares
  processedText = processedText.replace(
    /(?<!\*)\*\*\*([\s\S]+?)\*\*\*(?!\*)/g,
    '\x01\x03$1\x04\x02'
  );
  processedText = processedText.replace(
    /(?<!\*)\*\*(?!\s)([\s\S]+?)(?<!\s)\*\*(?!\*)/g,
    '\x01$1\x02'
  );
  processedText = processedText.replace(
    /(?<!\*)\*(?!\s)([\s\S]+?)(?<!\s)\*(?!\*)/g,
    '\x03$1\x04'
  );
  processedText = processedText.replace(
    /~~(?!\s)([\s\S]+?)(?<!\s)~~/g,
    '\x05$1\x06'
  );

  // Restaura os tokens para as marcações definitivas reconhecidas pelo WhatsApp
  processedText = processedText.replace(/\x01/g, '*').replace(/\x02/g, '*');
  processedText = processedText.replace(/\x03/g, '_').replace(/\x04/g, '_');
  processedText = processedText.replace(/\x05/g, '~').replace(/\x06/g, '~');

  // 4. RESTAURAR CÓDIGO INLINE
  processedText = processedText.replace(/__INLINE_(\d+)__/g, (match, id) => {
    return inlineCodes[id];
  });

  // 5. RESTAURAR BLOCOS DE CÓDIGO
  processedText = processedText.replace(/__BLOCK_(\d+)__/g, (match, id) => {
    return codeBlocks[id];
  });

  return processedText;
}

// Compatibilidade "Zero Build" para testes no Node.js.
// Se estamos rodando fora do navegador (ex: Vitest), anexamos a função ao objeto global.
if (typeof process !== 'undefined' && process.release.name === 'node') {
  globalThis.markdownToWhatsApp = markdownToWhatsApp;
}
