# front-end-challenge

## Contextualização

Você faz parte de uma empresa de soluções de pagamentos, a Boulder Co., e seu trabalho como desenvolvedor front end é fazer um portal administrativo para clientes internos. A ideia é que esse portal evolua muito mais posteriormente, mas o propósito inicial dele é para gestão de clientes e visualização das transações de cada um.

## User Story

**Como** funcionário da Boulder Co., **preciso** visualizar e editar informações de clientes bem como ver suas transações **para que** meu banco de dados de clientes esteja sempre atualizado e eu veja se o cliente está fazendo transações que não condizem com o seu modelo de negócio.

## Instruções para o Desafio

1. Faça um _fork_ deste repositório.

2. Utilize `npm start` para instanciar a API.

3. Baseando-se nas imagens em `assets/layouts`, crie uma tela de login da aplicação (`assets/layouts/login.png`):
    - Autentique o usuário fazendo um `POST` para o endpoint `http://localhost:3000/api/user/login`.
    - A autenticação deve considerar tratamento de dados e feedback para o usuário.
    - Os seguintes usuários foram previamente configurados:
    ```
    [
        {
            email: 'john@gmail.com',
            password: 'passwd'
        },
        {
            email: 'bill@gmail.com',
            password: 'test123'
        }
    ]
    ```

4. Crie telas de exibição da lista de clientes e criação de novo cliente com base nos arquivos `assets/layouts/clients.png` e `assets/layouts/clients-create.png`:
    - Para obter a lista de clientes, utilize um `GET` para o endpoint `/api/clients`.
    - Para criar um usuário, efetue um `POST` para o endpoint `/api/clients` com os dados do cliente.

5. Crie telas de exibição dos detalhes do cliente e edição do mesmo com base nos arquivos `assets/layouts/clientData.png` e `assets/layouts/clientData-edit.png`:
    - Para obter os detalhes do cliente, utilize um `GET` para o endpoint `/api/client/:id` onde `:id` é o id do cliente.
    - Para editar um cliente, efetue um `PATCH` para o mesmo endpoint, passando os dados que deseja mudar.

6. Crie uma tela de exibição do transacional de um cliente, com base na imagem `assets/layouts/transactional.png`:
    - As transações de um cliente podem ser obtidas fazendo um `GET` para o endpoint `/api/client/:id/transactions`.
    - Mostre dados de forma clara para o usuário.

7. Faça um _pull request_ para este repositório a partir do seu _fork_.

## Observações

Você tem duas escolhas:
1. Ser fiel ao layout fornecido.
2. Criar um layout novo.

Caso opte pela segunda opção, avaliaremos este critério também.

Você tem total liberdade para fazer modificações na API, layouts, extrair imagens, adicionar conteúdo, utilizar plugins, inovar, ir além do que pedimos.

Para o layout, utilizamos o [Gravit Designer](https://www.designer.io/download/), aplicativo gratuito. A pasta `assets/layouts` também contém o arquivo original caso deseje consultar, extrair imagens, ou até modificar.

## Critérios de Avaliação

- Fidelidade às instruções e ao contexto.
- Fidelidade com o layout.
- Experiência do usuário.
- _Clean code_ e _best practices_.
- Boas práticas de versionamento.

Caso opte por fazer um layout próprio, também avaliaremos a interface.