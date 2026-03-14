#!/bin/bash
set -e

# Gera o arquivo version.js com informações de build.
#
# Uso:
#   ./generate-version.sh                       → build local (usa data/hora e git hash)
#   ./generate-version.sh <build_id> <hash>     → CI (recebe run_number e SHA)

VERSION=$(npm pkg get version | tr -d '"')
BUILD_ID="${1:-$(date +'%Y-%m-%d %H:%M')}"
HASH="${2:-$(git rev-parse --short HEAD)}"

INFO="Pestto v$VERSION ($BUILD_ID) [$HASH]"

echo "const BUILD_INFO = '$INFO';" > version.js
echo "🏗️  version.js gerado: $INFO"
