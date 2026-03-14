const fs = require('fs');
const { execSync } = require('child_process');
const packageJson = require('./package.json');
const manifestJson = require('./manifest.json');

// Copia a versão do package.json (o Chefe) para o manifest.json
manifestJson.version = packageJson.version;

// Salva o manifest.json atualizado
fs.writeFileSync(
  './manifest.json',
  JSON.stringify(manifestJson, null, 2) + '\n'
);

// Formata o manifest.json com o prettier para o CI não quebrar
execSync('npx prettier --write manifest.json', { stdio: 'inherit' });

console.log(
  `✅ manifest.json sincronizado e formatado para a versão ${packageJson.version}`
);
