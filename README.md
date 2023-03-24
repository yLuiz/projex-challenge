<h1 align="center">Desafio Projex</h1>

<h2 align="center">FRONT-END</h2>

# Instalação
Para instalar, basta clonar o repositório e rodar o comando: 
``` bash
 npm install
```

# Inicialização
Após concluir a instalação, você deve rodar o seguinte comando para iniciar o projeto:
``` bash
 npm run dev
```

<h2 align="center">BACK-END</h2>

Para instalar, basta clonar o repositório e rodar o comando: 
``` bash
 npm install
```

# Inicialização
Após concluir a instalação, você deve rodar o seguinte comando para iniciar o projeto:
``` bash
 npm run dev
```

## SOBRE O DESAFIO:

Desenvolva uma aplicação em Angular2+ para um corretor de imóveis onde,

Obrigatório:
1) Possua tela de login
2) Opção de cadastro no login
3) Após realizar login deverá apareçar header e menu lateral
4) No menu deverá ter:
	4.1) Opção para editar os dados do usuário
	4.2) Opção para cadastrar imóveis*
	4.3) Opção para acessar um dashboard**

5) API em node ou python utilizando qualquer framework.
	5.1) Deverá ser implementado JWT
	5.2) Não precisa de banco de dados
	5.3) A API só devera responder requisições autenticadas.

6) Os códigos devem ser versionados no git, e compartilhados com o e-mail: marcos.deilson@gmail.com


*Imóveis:
	Além de conter os dados mínimos de um imóvel, deverá conter informações de compra e venda e tenha opção de anexar fotos do imóvel. Exemplo: valor de compra, valor de venda, percentual de lucro.
	Um imóvel cadastro pode não ter sido vendido, estaria em "estoque".

	Atributos do imóvel:
		- Valor de compra.
		- Valor de venda.
		- Percentual de lucro.
		- Um imóvel cadastro pode não ter sido vendido, estaria em "estoque".

**Dashboard:
	Os dados para gestão e controle do corretor.
	Nos apresente as informações extraindo o máximo dos dados disponíveis.

Utilize tudo que souber do framework: Guarda de rota, Interceptor, Components, Services, etc.
Tudo que for necessário para subir e realizar o teste/demonstração da aplicação deverá estar no README

Extras:
	Deploy da aplicação em qualquer serviço, por exemplo: Heroku

Se faltou informação, algo não fez sentido ou está errado, tome a liberdade de aplicar a correção que julgar necessária e descreva o erro/solução no README.
Técnicamente irei avaliar o projeto, outras pessoas vão avaliar como se fossem os corretores. Nos surpreenda.

## Rotas Backend:
	# User
	
		Create [POST] - /user
		Authentication [POST] - /user/auth
		UpdateByToken [PUT] - /user
		GetByEmail [GET] - /user?email=
		GetById [GET] - /user/:id
		DeleteById [DELETE]  - /user/:id
	
	# Property
	
		Create [POST] - /property
		UpdateById [PUT] - /property/:id
		GetAllProperties [GET] - /property
		GetById [GET] - /property/:id
	
