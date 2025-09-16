# 1. Arquitetura:

Foi escolhido a Arquitetura pra Aplicação Full-Stack Desacoplada, composta por:

- Front-end (Single Page Application - SPA): Em resumo, roda inteiramente no navegador do cliente.
- Back-end (API RESTful): Um servidor que expõe endpoints para o front consumir, responsável por toda a lógica e comunicação com o BD.

Vantagens:

- É Escalavel: O front e o back podem ser desenvolvidos, implantados e escalados de forma independente
- É Flexivel: Outras aplicações (ex: um aplicativo mobile) podem consumir a mesma API no futuro
- O SPA tem uma navegação mais agradável e rápida, e também não tem a necessidade de recarregar a página inteira all the time.

# 2. Bibliotecas utilizadas

Para o Back:

- Express.js: Framework usado pra construir a API. É o padrão do mercado pra Node.js msm.
- Prisma: É o ORM, a ponte entre o código e o banco de dados. Facilita bastante a vida, previne erros e deixa as queries mais seguras e fáceis de escrever.
- PostgreSQL: Foi o banco de dados escolhido (dentre Postegres e MySql). É um BD relacional, bem robusto, no geral eu já tinha experiência com, então decidi que era o melhor a usar.
- jsonwebtoken: Usado pra criar e validar os tokens JWT da autenticação. É uma lib padrão pra isso.
- bcryptjs: Serve pra criptografar as senhas. NBasicamente usa o hash que o bcrypt gera.
- cookie-parser: Mmddleware pro Express conseguir ler os cookies que tem no navegador do user. É core pro JWT funcionar com cookies.
- cors: Resolve o famoso problema de CORS. É o que permite que o front (meu caso: localhost:5173) consiga fazer chamadas pra API (novamente, meu caso: localhost:3000) sem o navegador bloquear.
- dotenv: Carrega as variáveis de ambiente do arquivo .env. É como mantem a senhas fora do código de forma segura.

Para o Front:

- Vue.js: É o framework do front.
- Vite: A ferramenta que "monta" e serve o front-end. É bem rápida e melhora muito a experiência de dev.
- Vuetify: A biblioteca de componentes de UI usados.
- vue-router: Gerenciador da navegação entre as rotas ( /login e /) na SPA, sem precisar recarregar a aplicação.
- Axios: É quem faz as chamadas HTTP do front para a API no back-end.
- vue-i18n: A biblioteca usada pra ter múltiplos idiomas (nesse caso o português e inglês) no front.
- VeeValidate + Yup: Servcem pra validar os formulários (Nome, E-mail, etc.) antes de enviar os dados, mostrando mensagens de erro pro usuário.
- vue-toastification: Usado pra mostrar aquelas notificações de sucesso ou erro que aparecem no canto da tela. Bem útil pro feedback pro usuário e pra não precisar criar na mão.

# Exemplo do flow da arquitetura:

    A (User's Browser)                             --> |HTTPS| B(Frontend - Vue.js SPA);
    então B (API Calls (HTTPS/Axios))              --> C(Backend - Node.js/Express API);
    por fim C através de Database Queries (Prisma) --> D[(PostgreSQL Database)];

"O que você melhoraria se tivesse mais tempo?"
R:

1. Teria criado o idioma em Espanhol.
2. Teria feito os testes de componentes, unidades e afins.
3. Teria criado a tela de configuração de usuário.
4. Poderia refinar o código. Dá pra comentar ele pra explicar melhor o funcionamento pra possíveis outras pessoas entenderem o fluxo (se necessário).
5. Dá pra criar mais módulos pra gerenciar os alunos e criar uma área que justamente usuários não administradores possam entrar (ex: configurar a própria matrícula em cadeiras/cursos. Gerenciar pagamentos)

Quais requisitos obrigatórios que não foram entregues? Todos os requisitos foram atendidos.

Mostrando a aplicação:

1) Tela de Login:
    <img width="2534" height="1328" alt="image" src="https://github.com/user-attachments/assets/2af56dce-bb13-4182-a872-8a14a6db18be" />

2) Tela de alunos listados:
   <img width="2548" height="1324" alt="image" src="https://github.com/user-attachments/assets/7661be87-8375-4753-ba49-5c98fa06f0f1" />

3) Form de cadastro de alunos:
   <img width="2545" height="1322" alt="image" src="https://github.com/user-attachments/assets/ed8fba3e-d957-4872-91a5-598690898e54" />

4) Form customizado de editar aluno (usa o form anterior):
   <img width="2554" height="1328" alt="image" src="https://github.com/user-attachments/assets/221d3025-0cd4-40d3-ad00-8ad79212fc58" />

5) Form de deletar aluno:
   <img width="2547" height="1328" alt="image" src="https://github.com/user-attachments/assets/81b59943-7785-473e-9045-4835024b53f8" />

Todas as telas são funcionais, ademais, também há o campo de pesquisa, área de LogOut e também seleção de idioma, todos 100% funcionais.



