# 🍝 Pestto

Uma extensão de navegador minimalista que converte automaticamente a formatação Markdown ao colar textos no WhatsApp Web.

*(O nome é uma brincadeira com "paste + to" e um trocadilho com o famoso molho pesto).*

## 🎯 Objetivo

O Pestto foi criado para resolver um problema recorrente: copiar respostas geradas por IA (que geralmente usam Markdown) e colá-las no WhatsApp Web perdendo toda a formatação original.

Este é um projeto **open-source**, focado em simplicidade extrema, elegância e segurança. Não há coleta de dados, nem comunicação externa.

## 🚀 Como instalar (Modo Desenvolvedor)

Como o projeto está em sua versão inicial (v0.1), a instalação é feita localmente:

1. Faça o download ou clone este repositório.
2. Abra o seu navegador (Chrome, Edge, Brave, etc.) e acesse a página de extensões (`chrome://extensions/`).
3. Ative o **"Modo do desenvolvedor"** no canto superior direito.
4. Clique em **"Carregar sem compactação"** (Load unpacked) e selecione a pasta do Pestto.
5. Abra o [WhatsApp Web](https://web.whatsapp.com/) e faça um teste colando um texto com `**negrito**` ou `*itálico*`.

## 🏗️ Como funciona (Arquitetura)

A extensão intercepta o evento global de `paste` no navegador, rodando exclusivamente no domínio `https://web.whatsapp.com/*`.

* Verifica se o usuário está em um campo `contenteditable` (a caixa de mensagem).
* Lê o texto puro da área de transferência (`text/plain`).
* Converte a sintaxe Markdown para a sintaxe do WhatsApp em memória.
* Previne o comportamento padrão e insere o texto já formatado.

### O que a extensão NÃO FAZ:
Seguindo princípios estritos de segurança e privacidade:
- Não lê suas mensagens enviadas ou recebidas.
- Não percorre o DOM da página.
- Não usa `MutationObserver`.
- Não possui UI, configurações ou armazenamento de dados (Storage).
- Não faz requisições a servidores externos (Zero rede).
- Não rastreia seu uso (Zero analytics).

## 🧪 Testes

A lógica de conversão é isolada do navegador e coberta por testes automatizados utilizando [Vitest](https://vitest.dev/).

Para rodar os testes localmente:

```bash
npm install
npx vitest run
```

## 🤝 Contribuição

Contribuições são bem-vindas! O foco atual é manter a extensão pequena, clara e com as permissões mínimas possíveis. Se você encontrar casos onde a conversão falha (edge cases do Regex), sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request*.