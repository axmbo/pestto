#!/bin/bash

npm run build

# Pegamos o valor da config diretamente do npm e guardamos numa variável local do script
ZIP_NAME=$(npm pkg get config.zipName | tr -d '"')

# Agora sim o comando tem o arquivo correto
sha256sum "$ZIP_NAME"
