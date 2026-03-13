<h2>Para iniciar o sistema siga os comandos abaixo:</h2>

<p>após clonar o repositório</p>

<ul>
  <li>1. npm install</li>
  <li>2. docker compose up -d</li>
  <li>3. npm run migration:create -name=user</li>
  <li>4. npm run migration:run</li>
  <li>5. npm run start:dev</li>
  <li>6. use a url http://localhost:3000/users para acessar</li>
</ul>

obs:configure o .env.example com as informações de usuário do banco de dados de acordo com as do docker-compose.yml. Caso a criação da migrations não crie o banco é necessário crair o banco <b>dnc_api_rest</b> no container, utilize a extensão mysql, Database Management for MySQL/MariaDB, PostgreSQL, Redis and ElasticSearch. de cweijan.
