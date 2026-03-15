# Guia de Automação de Publicação na Chrome Web Store via GitHub Actions

Para automatizar o processo de publicação da extensão na Chrome Web Store via GitHub Actions e não precisar mais subir arquivos manualmente, siga este roteiro de configuração em três etapas principais.

## 1. Obter as Credenciais da Google Cloud Platform (GCP)

A Chrome Web Store APi exige o protocolo OAuth 2.0 para acesso programático.

1. Acesse o **Google Cloud Console** (https://console.cloud.google.com).
2. Crie um novo projeto (ex: `pestto-publisher`).
3. Vá em "APIs e Serviços" > "Biblioteca" e ative a **Chrome Web Store API**.
4. Vá em "Tela de permissão OAuth", configure o tipo de usuário (Externo) e preencha os campos obrigatórios (apenas dados de contato, não exigirá logotipo nem nada).
5. Vá em "Credenciais" > "Criar Credenciais" > **ID do cliente OAuth**.
   - Tipo de aplicativo: **App do computador**.
   - Dê um nome (ex: `Bot do GitHub`).
6. Você receberá o **ID do Cliente** (`client_id`) e a **Chave Secreta do Cliente** (`client_secret`). Anote-os.
7. Agora, para pegar o Token de Atualização (`refresh_token`), construa esta URL manualmente e acesse-a no navegador (troque seu `client_id` na URL abaixo):
   ```
   https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=SEU_CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob
   ```
8. Faça login, autorize, e o Google retornará um código na tela (`authorization_code`).
9. Finalmente, faça uma requisição POST para trocar esse código pelo `refresh_token` definitivo. Você pode rodar isso no terminal:
   ```bash
   curl "https://accounts.google.com/o/oauth2/token" -d "client_id=SEU_CLIENT_ID&client_secret=SEU_CLIENT_SECRET&code=CÓDIGO_DA_TELA_ANTERIOR&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob"
   ```
10. O JSON final te dará um **`refresh_token`**. Guarde-o com segurança (ele não expira a menos que a autorização seja revogada!).

## 2. Configurar os Secrets no GitHub

1. Acesse o seu repositório no GitHub.
2. Navegue até **Settings > Secrets and variables > Actions**.
3. Crie os seguintes "New repository secret":
   - `EXTENSION_ID` (O ID oficial da extensão `ihokfhnldmldopdgdccokilohmbgkjbk` etc).
   - `CLIENT_ID` (Do passo 6).
   - `CLIENT_SECRET` (Do passo 6).
   - `REFRESH_TOKEN` (Do passo 10).

## 3. Criar o Novo Workflow do GitHub

Crie um arquivo em `.github/workflows/deploy-chrome.yml` com o seguinte padrão:

```yaml
name: Deploy na Chrome Web Store

on:
  workflow_dispatch: # Permite rodar num botão manual na aba Actions

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Instalar Dependências e Buildar
        # Caso tenha dependências como esbuild/webpack, rode npm install
        run: |
          npm ci || echo "Não precisa install"
          npm run build

      - name: Upload pra Loja da Google
        uses: Klemensas/chrome-extension-upload-action@v2
        with:
          refresh-token: ${{ secrets.REFRESH_TOKEN }}
          client-id: ${{ secrets.CLIENT_ID }}
          client-secret: ${{ secrets.CLIENT_SECRET }}
          app-id: ${{ secrets.EXTENSION_ID }}
          file-name: 'pestto-latest.zip'
```

### Como Utilizar depois de Pronto:

Sempre que o `pestto-latest.zip` mudar (por exemplo, após você gerar sua release do SemVer), você vai no seu GitHub > Aba "Actions" > Clica em "Deploy na Chrome Web Store" > Botão verde "Run workflow".
O script compilará a extensão fresquinha do código-fonte e fará o _upload_ da mesma para a Chrome Store instantaneamente, poupando minutos preciosos em acessos e formulários.
