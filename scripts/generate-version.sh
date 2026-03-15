#!/bin/bash
set -e

# Gera o arquivo version.js com informações de build.
# Em builds de CI, também atualiza o 4º dígito da versão no manifest.json.
#
# Uso:
#   ./scripts/generate-version.sh                        → build local (manifest intocado)
#   ./scripts/generate-version.sh <build_id> <hash>     → CI (manifest: X.Y.Z.<build_id>)

VERSION=$(npm pkg get version | tr -d '"' | sed 's/-.*//')
BUILD_ID="${1:-$(date +'%Y-%m-%d %H:%M')}"
HASH="${2:-$(git rev-parse --short HEAD)}"

INFO="Pestto v$VERSION ($BUILD_ID) [$HASH]"

echo "const BUILD_INFO = '$INFO';" > src/version.js
echo "🏗️  version.js gerado: $INFO"

# Atualiza o 4º dígito da versão no manifest.json apenas em builds de CI
if [ -n "$1" ]; then
  CHROME_VERSION="$VERSION.$1"
  node -e "
const fs = require('fs');
const m = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
m.version = '$CHROME_VERSION';
fs.writeFileSync('manifest.json', JSON.stringify(m, null, 2) + '\n');
"
  echo "📦 manifest.json atualizado para versão $CHROME_VERSION"
fi
