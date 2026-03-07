/**
 * Função responsável por converter a sintaxe Markdown para a sintaxe do WhatsApp.
 * @param {string} text - O texto original em Markdown.
 * @returns {string} - O texto formatado para o WhatsApp.
 */
function convertMarkdown(text) {
    let convertedText = text;

    // 1. Itálico (*texto*): Converte para _texto_
    // Usamos (?<!\*) e (?!\*) para garantir que é apenas UM asterisco isolado.
    // Isso impede que ele capture os dois asteriscos do negrito (**)
    convertedText = convertedText.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '_$1_');

    // 2. Negrito (**texto**): Converte para *texto*
    // Agora podemos converter o negrito com segurança, pois a regra do itálico já rodou
    convertedText = convertedText.replace(/\*\*(.+?)\*\*/g, '*$1*');

    // 3. Tachado (~~texto~~): Converte para ~texto~
    convertedText = convertedText.replace(/~~(.+?)~~/g, '~$1~');

    // 4. Código em linha (`texto`): Converte para ```texto```
    convertedText = convertedText.replace(/(?<!`)`(?!`)(.+?)(?<!`)`(?!`)/g, '```$1```');

    return convertedText;
}

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

    const convertedText = convertMarkdown(pastedText);

    if (convertedText !== pastedText) {
        console.log("[Pestto] Markdown detectado! Convertendo e inserindo..."); // Debug 4

        // Impede o comportamento padrão e impede que o WhatsApp receba o evento original
        event.preventDefault();
        event.stopPropagation();

        // Insere o texto convertido
        document.execCommand('insertText', false, convertedText);
    } else {
        console.log("[Pestto] Nenhum Markdown encontrado no texto colado."); // Debug 5
    }
}, true); // <--- ESTE 'true' É A CHAVE PARA O SUCESSO AQUI