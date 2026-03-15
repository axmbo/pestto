const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const packageJson = require(path.join(root, 'package.json'));
const manifestPath = path.join(root, 'manifest.json');
const manifestJson = require(manifestPath);

// O Chrome só aceita versões no formato N.N.N.N (sem sufixos como -rc.0, -beta.1).
// Sanitizamos aqui antes de escrever no manifest.json.
const chromeVersion = packageJson.version.replace(/-.*$/, '');
manifestJson.version = chromeVersion;

// Salva o manifest.json atualizado
fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2) + '\n');

// Formata o manifest.json com o prettier para o CI não quebrar
execSync(`npx prettier --write "${manifestPath}"`, { stdio: 'inherit' });

console.log(
  `✅ manifest.json sincronizado e formatado para a versão ${packageJson.version}`
);
