Projeto: Conector Personalizado para n8n

Este projeto contém um conector personalizado para a plataforma de automação n8n, utilizando Docker Compose para gerenciar o ambiente.
O projeto inclui:

	n8n para automação.
	PostgreSQL como banco de dados para persistência do n8n.
	Conector customizado escrito em TypeScript, compilado e integrado ao n8n.
	
Pré-requisitos
	Antes de iniciar, certifique-se de ter os seguintes itens instalados na sua máquina:
	
	Docker Desktop
	Node.js 22+
	npm

Configuração do Ambiente com Docker Compose

	1. Criar arquivo .env na raiz do projeto com as seguintes variáveis:
		POSTGRES_USER=admin
		POSTGRES_PASSWORD=admin
		POSTGRES_DB=n8n
		POSTGRES_NON_ROOT_USER=n8n_user
		POSTGRES_NON_ROOT_PASSWORD=n8n_pass

	2. Construir a imagem
		Na raiz do projeto rode o seguinte comando:
			docker-compose build
			
	3. Subir os containers
		Para iniciar o n8n e o PostgreSQL, rode o seguinte comando:
			docker-compose up -d
			
Acessando o n8n

	Após os containers estarem rodando, acesse o n8n no navegador:
	http://localhost:5678
	
Durante o desenvolvimento, siga estes passos:

	1. Instalar dependências:
		npm install
	2. Rodar build do TypeScript:
		npm run build
	3. Sempre que fizer alterações no código do conector:
		Rebuild do TypeScript: npm run build
		Rebuild da imagem Docker: docker-compose build
		Reiniciar os containers: docker-compose up -d
Teste do conector

	1. Acesse o painel do n8n em http://localhost:5678
	2. Crie um novo fluxo
	3. Procure pelo nome do seu conector na lista de nodes
	4. Teste os inputs e outputs do seu conector
		
