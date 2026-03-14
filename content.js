console.log(
  `%c🍝 ${BUILD_INFO} carregado!`,
  'color: green; font-weight: bold;'
);

/**
 * Intercepta o evento de colar (paste) na FASE DE CAPTURA.
 * O 'true' no final do addEventListener é o que ativa essa fase.
 */
document.addEventListener(
  'paste',
  (event) => {
    // 1. Se o evento já for o nosso "Cavalo de Tróia", deixamos o WhatsApp agir livremente!
    if (event.isPesttoEvent) return;

    const clipboard = event.clipboardData || window.clipboardData;
    const types = Array.from(clipboard.types);

    // 2. A MÁGICA DA EXCEÇÃO: Se a cópia veio do próprio WhatsApp, não fazemos NADA!
    if (types.includes('application/whatsapp')) {
      console.log('Cópia interna do WhatsApp detectada. Abortando Pestto.');
      return;
    }

    const rawText = clipboard.getData('text/plain');

    if (!rawText) return;

    // 3. Matamos o evento original para que o WhatsApp nem veja o texto puro
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    // 4. Convertemos o texto (quebras de linha originais \n são mantidas)
    const converted = markdownToWhatsApp(rawText);
    console.log('Texto convertido:', converted);

    // 5. Criamos a nossa maleta de dados "falsa"
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('text/plain', converted);

    // 6. Criamos o evento de colar falso
    const fakePasteEvent = new ClipboardEvent('paste', {
      clipboardData: dataTransfer,
      bubbles: true,
      cancelable: true,
    });

    // Marcamos o evento para não entrarmos em um loop infinito no Passo 1
    fakePasteEvent.isPesttoEvent = true;

    // 7. Injetamos o Cavalo de Tróia no exato elemento onde o usuário estava digitando!
    event.target.dispatchEvent(fakePasteEvent);
  },
  true
);
