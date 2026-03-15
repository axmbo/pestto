#!/bin/bash
set -e

# 1. Gera o version.js (script centralizado)
./scripts/generate-version.sh

# 2. Roda o comando de build do package.json (que agora inclui o version.js no zip)
npm run build

# Pegamos o valor da config diretamente do npm e guardamos numa variável local do script
ZIP_NAME=$(npm pkg get config.zipName | tr -d '"')

# Agora sim o comando tem o arquivo correto
sha256sum "$ZIP_NAME"

echo
echo "✅ Build finalizado!"