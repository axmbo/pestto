
## [0.2.5](https://github.com/axmbo/pestto/compare/v0.2.4...v0.2.5) (2026-03-14)


### Bug Fixes

* Restrict markdown conversion to single lines, adjust nested formatting output, and include additional icons in the build. ([abfa04e](https://github.com/axmbo/pestto/commit/abfa04ec631144ed8bf81fe5d3a2d0147184fd49))

## [0.2.4](https://github.com/axmbo/pestto/compare/v0.2.3...v0.2.4) (2026-03-14)

## [0.2.3](https://github.com/axmbo/pestto/compare/v0.2.2...v0.2.3) (2026-03-14)

## [0.2.2](https://github.com/axmbo/pestto/compare/v0.2.1...v0.2.2) (2026-03-14)

## [0.2.1](https://github.com/axmbo/pestto/compare/v0.2.0...v0.2.1) (2026-03-14)

# [0.2.0](https://github.com/axmbo/pestto/compare/v0.1.2...v0.2.0) (2026-03-14)


### Bug Fixes

* Update manifest icon paths for 16px and 48px sizes. ([9a747f7](https://github.com/axmbo/pestto/commit/9a747f7e7f012f42c5c7242ccabf3a3c983d12f9))


### Features

* Add 16x16 and 48x48 application icons. ([969b8f2](https://github.com/axmbo/pestto/commit/969b8f2dba91faf8af196ca077fd079bbd04deaa))
* Refactor markdown conversion logic for robust handling of nested and multiline formatting, adding new validation tests. ([862e3f3](https://github.com/axmbo/pestto/commit/862e3f30a38127c0e04806f06f7c2ddb0471dbb2))

## [0.1.2](https://github.com/axmbo/pestto/compare/v0.1.1...v0.1.2) (2026-03-14)


### Bug Fixes

* Downgrade project version from 0.1.2 to 0.1.1 in manifest and package files. ([42ecf0e](https://github.com/axmbo/pestto/commit/42ecf0eeec91392f96efd4b784a3ff0c9e71cb14))


### Features

* Centralize `version.js` generation into a new script with CI/local parameterization and add tests. ([b14374f](https://github.com/axmbo/pestto/commit/b14374ffe8f8d6dc7af7c36f1d3b9006363b4bdf))

## [0.1.1](https://github.com/axmbo/pestto/compare/v0.1.0...v0.1.1) (2026-03-08)


### Bug Fixes

* gerar version.js no workflow de release ([7b088ca](https://github.com/axmbo/pestto/commit/7b088ca2f30f07ce41dfb95447d84ce1e1b9d9b4))

# [0.1.0](https://github.com/axmbo/pestto/compare/1f4389e9427d80b774b76be568999ad7f3487979...v0.1.0) (2026-03-08)


### Bug Fixes

* adiciona regra para ignorar artefatos de build no .gitignore ([8bd4349](https://github.com/axmbo/pestto/commit/8bd434996e491f58ecdb52756547be2e3a78c731))
* arquivo version.js não estava sendo gerado no pipeline ([d352a61](https://github.com/axmbo/pestto/commit/d352a61a6ad8f665b890a24f8f128f317a23af0b))
* colar texto com mais de 1 linha ([da6efb3](https://github.com/axmbo/pestto/commit/da6efb3ec0b35217fba1d15c63a11baa088ab9bd))
* conversão correta de código em linha e em bloco ([aad5c8c](https://github.com/axmbo/pestto/commit/aad5c8c9e0660a0bde978818ae16100dc770afb1))
* corrige estilo de log e formatação da versão beta na conversão de Markdown ([6100688](https://github.com/axmbo/pestto/commit/610068857c1048223eaf0f940b0fd2b3ed052750))
* corrige nome do arquivo zip no script de build ([934c5c8](https://github.com/axmbo/pestto/commit/934c5c8d25a849e3ecfec287c882b2603deae982))
* corrige script de build para usar variável de configuração zipName ([6047837](https://github.com/axmbo/pestto/commit/6047837cb08929a6a8448c47da5d26bbf06763c8))
* Havia faltado o conteúdo do README.md ([399549b](https://github.com/axmbo/pestto/commit/399549b6f3536c8af4191514d59b8bebd080bad9))
* não converte texto vindo do WhatsApp ([70859ee](https://github.com/axmbo/pestto/commit/70859ee3cdc4842384fcbe97e98b1b2d22876772))
* remove export da função convertMarkdown ([505f626](https://github.com/axmbo/pestto/commit/505f62664c24aa62965214d64ba2a36b0467bf47))


### Features

* add MIT License file ([3481646](https://github.com/axmbo/pestto/commit/348164690e4b59af798b7fb1c465a7f3c28d889c))
* adiciona geração de informações de build no script de build ([7c91b98](https://github.com/axmbo/pestto/commit/7c91b9839b958bbc23c0c931eefd640df4d2da86))
* adiciona ícone ao repositório ([c08fe87](https://github.com/axmbo/pestto/commit/c08fe87286da14159cbff0f9c2e1172a33e2e4ed))
* adiciona lógica para obter nome do arquivo zip a partir da configuração do npm ([543c9cf](https://github.com/axmbo/pestto/commit/543c9cf44174233698c166a324f888e327ec245a))
* adiciona script de build e corrige versão no package.json ([660a9fb](https://github.com/axmbo/pestto/commit/660a9fbc4258c85180d3de9d4ee199e584649f6e))
* adiciona script para sincronizar versão do package.json no manifest.json ([71c8abd](https://github.com/axmbo/pestto/commit/71c8abd4e932beef985f464942391c3d7f06f54b))
* adiciona script undo-version ao package.json ([97b021c](https://github.com/axmbo/pestto/commit/97b021c4d93f11654daa1c569e63461804c24072))
* adiciona workflow de CI para testes e build, removendo o antigo workflow de testes ([fa87905](https://github.com/axmbo/pestto/commit/fa87905e235315dd8bc69c08168e5f6d199e0b29))
* adiciona workflow de release e atualiza workflow de testes com geração de artefato ([ee4e6cb](https://github.com/axmbo/pestto/commit/ee4e6cb070dca1ed517285ac6a57d2d5e45eaa26))
* atualiza lógica de conversão de Markdown para incluir informações de versão beta ([c8b80fe](https://github.com/axmbo/pestto/commit/c8b80fec6726c1ffad0203ff8bc432490f305391))
* atualiza scripts de build e manifest para incluir version.js e exibir informações de build ([75bf5b6](https://github.com/axmbo/pestto/commit/75bf5b611e22df23282e4d7203f0f334443280d6))
* renomeia função de conversão de Markdown e atualiza lógica de inserção no evento de colar ([3ad2ad2](https://github.com/axmbo/pestto/commit/3ad2ad2dde792078bc9ca0e7cbeebe193c2bafca))
* versão inicial da extensão Pestto com conversão básica de Markdown ([1f4389e](https://github.com/axmbo/pestto/commit/1f4389e9427d80b774b76be568999ad7f3487979))
