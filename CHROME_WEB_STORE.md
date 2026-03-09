# Chrome Web Store — Textos de Submissão

Este arquivo documenta todos os textos utilizados na submissão da extensão Pestto à
[Chrome Web Store](https://chromewebstore.google.com/), facilitando futuras atualizações e revisões.

---

## Título

Pestto

## Resumo do Pacote

Converte Markdown automaticamente ao colar texto no WhatsApp Web.

## Categoria

Ferramentas

## URL da Página Inicial

https://github.com/axmbo/pestto

## URL de Suporte

https://github.com/axmbo/pestto/issues

---

## Descrição

```text
Pestto — Cole textos com Markdown no WhatsApp Web e veja a formatação funcionar automaticamente. 🍝

Você usa ChatGPT, Gemini, Copilot ou outra IA no dia a dia? Então já deve ter passado por isso: você copia uma resposta bem formatada, cola no WhatsApp Web e… o texto chega cru, sem negrito, sem itálico, sem nada. Toda aquela estrutura bonita se perde. Ou, pior, a formatação do MarkDown é interpretada de forma diversa da pretendida.

O Pestto resolve exatamente esse problema.

Como funciona?

Basta instalar a extensão e usar o WhatsApp Web normalmente. Quando você colar (Ctrl+V) um texto que contenha formatação Markdown, o Pestto intercepta a colagem e converte automaticamente para a sintaxe nativa do WhatsApp — tudo em tempo real, sem nenhum clique extra.

Exemplos de conversão: • **negrito** (Markdown) → *negrito* (WhatsApp) • *itálico* (Markdown) → _itálico_ (WhatsApp) • ~~tachado~~ (Markdown) → ~tachado~ (WhatsApp) • Blocos de código (```) e código inline (`) são preservados sem alteração.

Inteligente e não-intrusivo:

• Se você copiar uma mensagem de dentro do próprio WhatsApp, o Pestto reconhece isso e não interfere — a colagem funciona normalmente. • A extensão só atua no domínio web.whatsapp.com. Ela não roda em nenhum outro site. • Não há popup, não há ícone na barra de ferramentas, não há configurações. Instale e esqueça.

Privacidade e segurança em primeiro lugar:

O Pestto foi projetado com os princípios mais estritos de privacidade: • Não lê suas mensagens enviadas ou recebidas. • Não percorre o DOM da página. • Não utiliza MutationObserver. • Não possui UI, configurações ou armazenamento de dados. • Não faz nenhuma requisição a servidores externos (zero rede). • Não rastreia seu uso (zero analytics). • Não coleta nenhum dado pessoal.

A extensão é composta por apenas três pequenos arquivos JavaScript, totalmente auditáveis. O código-fonte é aberto e está disponível no GitHub: https://github.com/axmbo/pestto

Para quem é o Pestto?

• Profissionais que usam IA generativa e compartilham respostas via WhatsApp. • Desenvolvedores que copiam trechos de documentação técnica. • Estudantes que compartilham anotações formatadas. • Qualquer pessoa que cola textos com Markdown no WhatsApp Web e quer que a formatação simplesmente funcione.

Minimalista por design:

O Pestto não tenta fazer tudo. Ele faz uma única coisa — converter Markdown ao colar — e faz isso bem. Sem bloatware, sem permissões desnecessárias, sem surpresas.

O nome é uma brincadeira com "paste + to" e um trocadilho com o famoso molho pesto. 🍝
```

---

## Descrição de Único Propósito

```text
Converter automaticamente a formatação Markdown para a sintaxe nativa do WhatsApp ao colar texto no WhatsApp Web. A extensão intercepta o evento de colagem (paste), converte marcadores como **negrito**, *itálico* e ~~tachado~~ para seus equivalentes no WhatsApp (*, _, ~), e insere o texto já formatado — sem interface, sem configurações e sem coleta de dados.
```

---

## Justificativa da Permissão de Host

```text
A única permissão de host utilizada é o padrão de correspondência https://web.whatsapp.com/*, declarado em content_scripts.matches no manifest. Essa permissão é estritamente necessária porque a extensão precisa injetar um content script que intercepta o evento de colagem (paste) na caixa de mensagens do WhatsApp Web para converter a formatação Markdown em tempo real. A extensão não acessa nenhum outro site, não faz requisições de rede e não solicita nenhuma permissão adicional (como storage, tabs ou activeTab).
```
