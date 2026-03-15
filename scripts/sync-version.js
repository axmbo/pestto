const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const packageJson = require(path.join(root, 'package.json'));
const manifestPath = path.join(root, 'manifest.json');
const manifestJson = require(manifestPath);

// Copia a versão do package.json (o Chefe) para o manifest.json
manifestJson.version = packageJson.version;

// Salva o manifest.json atualizado
fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2) + '\n');

// Formata o manifest.json com o prettier para o CI não quebrar
execSync(`npx prettier --write "${manifestPath}"`, { stdio: 'inherit' });

console.log(
  `✅ manifest.json sincronizado e formatado para a versão ${packageJson.version}`
);
