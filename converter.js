/**
 * Função responsável por converter a sintaxe Markdown para a sintaxe do WhatsApp.
 * @param {string} text - O texto original em Markdown.
 * @returns {string} - O texto formatado para o WhatsApp.
 */
export function convertMarkdown(text) {
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

// Compatibilidade "Zero Build" para testes no Node.js.
// Se estamos rodando fora do navegador (ex: Vitest), anexamos a função ao objeto global.
if (typeof process !== 'undefined' && process.release.name === 'node') {
    globalThis.convertMarkdown = convertMarkdown;
}