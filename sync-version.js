const fs = require('fs');
const packageJson = require('./package.json');
const manifestJson = require('./manifest.json');

// Copia a versão do package.json (o Chefe) para o manifest.json
manifestJson.version = packageJson.version;

// Salva o manifest.json atualizado
fs.writeFileSync(
  './manifest.json',
  JSON.stringify(manifestJson, null, 2) + '\n'
);

console.log(
  `✅ manifest.json sincronizado para a versão ${packageJson.version}`
);
