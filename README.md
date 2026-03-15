# 🍝 Pestto

Uma extensão de navegador minimalista que converte automaticamente a formatação Markdown ao colar textos no WhatsApp Web.

_(O nome é uma brincadeira com "paste + to" e um trocadilho com o famoso molho pesto)._

## 🎯 Objetivo

O Pestto foi criado para resolver um problema recorrente: copiar respostas geradas por IA (que geralmente usam Markdown) e colá-las no WhatsApp Web perdendo toda a formatação original.

Este é um projeto **open-source**, focado em simplicidade extrema, elegância e segurança. Não há coleta de dados, nem comunicação externa.

## 🚀 Como instalar

**Opção 1 — Chrome Web Store (recomendado):**

Instale diretamente pela [Chrome Web Store](https://chromewebstore.google.com/detail/gkgbejhaebncdjjkmejinkdmnomcijgi).

**Opção 2 — Modo Desenvolvedor (instalação local):**

1. Faça o download ou clone este repositório.
2. Abra o seu navegador (Chrome, Edge, Brave, etc.) e acesse a página de extensões (`chrome://extensions/`).
3. Ative o **"Modo do desenvolvedor"** no canto superior direito.
4. Clique em **"Carregar sem compactação"** (Load unpacked) e selecione a pasta do Pestto.
5. Abra o [WhatsApp Web](https://web.whatsapp.com/) e faça um teste colando um texto com `**negrito**` ou `*itálico*`.

## 🏗️ Como funciona (Arquitetura)

A extensão intercepta o evento global de `paste` no navegador, rodando exclusivamente no domínio `https://web.whatsapp.com/*`.

- Verifica se o usuário está em um campo `contenteditable` (a caixa de mensagem).
- Lê o texto puro da área de transferência (`text/plain`).
- Converte a sintaxe Markdown para a sintaxe do WhatsApp em memória.
- Previne o comportamento padrão e insere o texto já formatado.

### O que a extensão NÃO FAZ:

Seguindo princípios estritos de segurança e privacidade:

- Não lê suas mensagens enviadas ou recebidas.
- Não percorre o DOM da página.
- Não usa `MutationObserver`.
- Não possui UI, configurações ou armazenamento de dados (Storage).
- Não faz requisições a servidores externos (Zero rede).
- Não rastreia seu uso (Zero analytics).

## 🧪 Testes

A lógica de conversão é isolada do navegador e coberta por testes automatizados utilizando [Vitest](https://vitest.dev/). As suítes de teste estão localizadas na pasta `tests/`.

Para rodar os testes localmente:

```bash
npm install
npm test            # Executa os testes uma única vez e encerra
npm run test:watch  # Executa os testes e aguarda alterações (modo interativo)
```

## 🔍 Qualidade de Código

O projeto usa **ESLint** (com escopos distintos para browser, Node e Vitest) e **Prettier** para manter a consistência do código.

O **Husky** configura um hook `pre-commit` que, via **lint-staged**, roda ESLint + Prettier nos arquivos em staging antes de cada commit. Se houver problemas, o commit é abortado, as correções são aplicadas na _working tree_ para revisão, e os testes unitários só são executados se o lint passar.

```bash
npm run lint        # verifica todos os arquivos
npm run lint:fix    # corrige automaticamente
npm run format      # formata todos os arquivos
npm run format:check  # apenas verifica (sem alterar)
```

## 🤝 Contribuição

Contribuições são bem-vindas! O foco atual é manter a extensão pequena, clara e com as permissões mínimas possíveis. Se você encontrar casos onde a conversão falha (edge cases do Regex), sinta-se à vontade para abrir uma _Issue_ ou enviar um _Pull Request_.
