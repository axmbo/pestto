#!/bin/bash

# Pega as infos: Versão, Data/Hora e os 7 primeiros caracteres do Hash do Git
VERSION=$(npm pkg get version | tr -d '"')
DATETIME=$(date +'%Y-%m-%d %H:%M')
GIT_HASH=$(git rev-parse --short HEAD)

INFO="Pestto v$VERSION ($DATETIME) [$GIT_HASH]"

# Cria o arquivo version.js do zero
echo "const BUILD_INFO = '$INFO';" > version.js

# Gera o zip incluindo o novo arquivo
npm run build # O seu script de build no package.json deve incluir o version.js agora

# Pegamos o valor da config diretamente do npm e guardamos numa variável local do script
ZIP_NAME=$(npm pkg get config.zipName | tr -d '"')

# Agora sim o comando tem o arquivo correto
sha256sum "$ZIP_NAME"
