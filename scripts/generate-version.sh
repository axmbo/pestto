#!/bin/bash
set -e

# Gera o arquivo version.js com informações de build.
# Também atualiza o 4º dígito da versão no manifest.json para o Chrome.
#
# Uso:
#   ./scripts/generate-version.sh                        → build local (4º dígito = 0)
#   ./scripts/generate-version.sh <build_id> <hash>     → CI (4º dígito = run_number)

VERSION=$(npm pkg get version | tr -d '"' | sed 's/-.*//')
BUILD_NUMBER="${1:-0}"
BUILD_ID="${1:-$(date +'%Y-%m-%d %H:%M')}"
HASH="${2:-$(git rev-parse --short HEAD)}"

INFO="Pestto v$VERSION ($BUILD_ID) [$HASH]"

echo "const BUILD_INFO = '$INFO';" > src/version.js
echo "🏗️  version.js gerado: $INFO"

# Atualiza o 4º dígito da versão no manifest.json
CHROME_VERSION="$VERSION.$BUILD_NUMBER"
node -e "
const fs = require('fs');
const m = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
m.version = '$CHROME_VERSION';
fs.writeFileSync('manifest.json', JSON.stringify(m, null, 2) + '\n');
"
echo "📦 manifest.json atualizado para versão $CHROME_VERSION"
