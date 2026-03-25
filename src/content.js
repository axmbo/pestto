console.log(
  `%c🍝 ${BUILD_INFO} carregado!`,
  'color: green; font-weight: bold;'
);

/**
 * Constrói um evento de colar (ClipboardEvent) customizado.
 * Função isolada para facilitar testes (via jsdom) e reduzir o acoplamento do DOM.
 *
 * @param {DataTransfer} originalClipboard - A área de transferência original.
 * @param {string} convertedText - O texto já convertido para WhatsApp.
 * @returns {ClipboardEvent} Novo evento de paste.
 */
function createPesttoPasteEvent(originalClipboard, convertedText) {
  const dataTransfer = new DataTransfer();

  for (const item of originalClipboard.items) {
    if (item.type === 'text/plain') {
      dataTransfer.setData('text/plain', convertedText);
    } else if (item.kind === 'file') {
      const file = item.getAsFile();
      if (file) dataTransfer.items.add(file);
    } else if (item.kind === 'string') {
      dataTransfer.setData(item.type, originalClipboard.getData(item.type));
    }
  }

  const fakePasteEvent = new ClipboardEvent('paste', {
    clipboardData: dataTransfer,
    bubbles: true,
    cancelable: true,
  });

  fakePasteEvent.isPesttoEvent = true;
  return fakePasteEvent;
}

/**
 * Intercepta o evento de colar (paste) na FASE DE CAPTURA.
 * O 'true' no final do addEventListener é o que ativa essa fase.
 */
document.addEventListener(
  'paste',
  (event) => {
    // 1. Se o evento já for o nosso "Cavalo de Tróia", deixamos o WhatsApp agir livremente!
    if (event.isPesttoEvent) return;

    // 1.5. Validação de Alvo: Só atua se o usuário estiver focado num campo de texto (WhatsApp input)
    const target = event.target;
    const isEditable =
      target.isContentEditable ||
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA';
    if (!isEditable) return;

    // Proteção Extra 1: Ignora a barra lateral (onde fica a pesquisa de conversas).
    // O campo de pesquisa ignora eventos sintéticos e precisa do fluxo nativo do navegador.
    if (target.closest && target.closest('#side')) {
      return;
    }

    const clipboard = event.clipboardData || window.clipboardData;
    const types = Array.from(clipboard.types);

    // 2. A MÁGICA DA EXCEÇÃO: Se a cópia veio do próprio WhatsApp, não fazemos NADA!
    if (types.includes('application/whatsapp')) {
      console.log('Cópia interna do WhatsApp detectada. Abortando Pestto.');
      return;
    }

    const rawText = clipboard.getData('text/plain');

    if (!rawText) return;

    // Fazemos a conversão antes de decidir se vamos interceptar
    const converted = markdownToWhatsApp(rawText);

    // Proteção Extra 2: Se o texto não sofrer alteração (não tem Markdown),
    // abortamos a intervenção e deixamos o navegador colar o texto naturalmente.
    if (converted === rawText) return;

    // 3. Matamos o evento original para que o WhatsApp nem veja o texto puro
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    console.log('Texto convertido:', converted);

    // 5 e 6. Criamos a maleta de dados e o evento falso usando a função extraída
    const fakePasteEvent = createPesttoPasteEvent(clipboard, converted);

    // 7. Injetamos o Cavalo de Tróia no exato elemento onde o usuário estava digitando!
    event.target.dispatchEvent(fakePasteEvent);
  },
  true
);

// Compatibilidade "Zero Build" para testes no Node.js/Vitest.
if (typeof process !== 'undefined' && process.release.name === 'node') {
  globalThis.createPesttoPasteEvent = createPesttoPasteEvent;
}
