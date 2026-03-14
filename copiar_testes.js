const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const filePath = path.join(__dirname, 'casos_de_teste.md');

try {
  const content = fs.readFileSync(filePath, 'utf8');

  // Adiciona múltiplas tentativas dependendo do SO/Gerenciador de Janelas
  const commands = [
    { cmd: 'xclip -selection clipboard', name: 'xclip (Linux/X11)' },
    { cmd: 'wl-copy', name: 'wl-copy (Linux/Wayland)' },
    { cmd: 'pbcopy', name: 'pbcopy (macOS)' },
    { cmd: 'clip', name: 'clip (Windows)' },
  ];

  let success = false;

  for (const { cmd, name } of commands) {
    try {
      execSync(cmd, { input: content, stdio: 'pipe' });
      console.log(
        `\x1b[32m✔ Conteúdo copiado com sucesso usando ${name}!\x1b[0m`
      );
      success = true;
      break;
    } catch (e) {
      // Ignora erro e tenta o próximo comando
    }
  }

  if (!success) {
    console.error(
      '\x1b[31m✖ Não foi possível copiar para a área de transferência.\x1b[0m'
    );
    console.error(
      'Certifique-se de ter um utilitário de clipboard instalado (ex: xclip, wl-clipboard).'
    );
  }
} catch (err) {
  console.error(`\x1b[31m✖ Erro ao ler o arquivo:\x1b[0m`, err.message);
}
