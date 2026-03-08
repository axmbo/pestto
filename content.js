console.log(`%c🍝 ${BUILD_INFO} carregado!`, "color: green; font-weight: bold;");

/**
 * Intercepta o evento de colar (paste) na FASE DE CAPTURA.
 * O 'true' no final do addEventListener é o que ativa essa fase.
 */
document.addEventListener('paste', function(event) {
    console.log("[Pestto] Evento paste detectado na fase de captura!"); // Debug 1

    const activeElement = document.activeElement;

    // O WhatsApp usa divs onde a propriedade isContentEditable é verdadeira
    const isEditable = activeElement && (activeElement.isContentEditable || activeElement.getAttribute('contenteditable') === 'true');

    if (!isEditable) {
        console.log("[Pestto] Elemento não é editável. Ignorando."); // Debug 2
        return;
    }

    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text/plain');

    if (!pastedText) {
        console.log("[Pestto] Nenhum texto puro encontrado na área de transferência."); // Debug 3
        return;
    }

    const converted = markdownToWhatsApp(pastedText);

    const isBeta = BUILD_INFO.includes("v0.");
    const finalVersion = isBeta ? `${converted}\n \n_Convertido por *${BUILD_INFO}*_` : converted;

    if (finalVersion !== pastedText) {
        console.log("[Pestto] Markdown detectado! Convertendo e inserindo..."); // Debug 4

        // Impede o comportamento padrão e impede que o WhatsApp receba o evento original
        event.preventDefault();
        event.stopPropagation();

        // Insere o texto convertido
        document.execCommand('insertText', false, finalVersion);
    } else {
        console.log("[Pestto] Nenhum Markdown encontrado no texto colado."); // Debug 5
    }
}, true);