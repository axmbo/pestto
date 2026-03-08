#!/bin/bash

# 1. Coleta as informações de metadados
# Pega as infos: Versão, Data/Hora e os 7 primeiros caracteres do Hash do Git
VERSION=$(npm pkg get version | tr -d '"')
DATETIME=$(date +'%Y-%m-%d %H:%M')
GIT_HASH=$(git rev-parse --short HEAD)

INFO="Pestto v$VERSION ($DATETIME) [$GIT_HASH]"

# 2. Cria o arquivo version.js (que o manifest agora espera)
echo "const BUILD_INFO = '$INFO';" > version.js
echo "🏗️  Arquivo version.js gerado com sucesso."

# 3. Roda o comando de build do package.json (que agora inclui o version.js no zip)
npm run build

# Pegamos o valor da config diretamente do npm e guardamos numa variável local do script
ZIP_NAME=$(npm pkg get config.zipName | tr -d '"')

# Agora sim o comando tem o arquivo correto
sha256sum "$ZIP_NAME"

echo
echo "✅ Build finalizado!"