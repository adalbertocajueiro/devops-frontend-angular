# Obtendo dados do DB DevOps back-end
Projeto angular simples contendo classes capazes de capturar os dados do back-end do projeto DB DevOps.

O Back-end constroi uma arvore sintática de um arquivo XML e retorna o objeto JSON que representa o esquema. Este objeto JSON é usado para construir um outro objeto que representa o esquema de volta em TypeScript, sendo a árvore sintática estrutural do BD.

### Passos
* Fazer o download do projeto back-end, um projeto do Visual Studio 2019 e executar o projeto. Isso vai lançar um serviço que possui a rota /schema para retornar um objeto DBSchemaNode, capturado do XML do banco. 

* Verificar se o back-end responde e retorna o objeto desejado (```http://localhost:PORTA/schema```)

* Abrir o projeto Angular no VSCode e digitar ```ng serve``` par ainiciar o projeto. Existem diversos componentes na UI construída. Você precisa apenas focar nos botões de obter o objeto do back-end e o botão de construir a árvore sintática a partir dele.

### Arquivos importantes
* `scr/app/dbmodel.model.ts` - arquivo contendo todos os tipos de nós presentes em um arquivo XML de um esquema. Estes tipos nada mais são do que os mesmos tipos presentes no projeto do back-end (C#).

* `src/app/schema.service.ts` - define uma classe de serviço `SchemaService` com dois métodos: `getSchema` (contactar o back-end e obter o JSON) e `buildSchema` (obter o objeto JSON e montar um objeto do tipo DBSchemaNode). O método `buildSchema` faz uso de métodos auxiliares para criar cada tipo de nó. Observe que o método `getSchema` faz uma chamada HTTP GET para o end-point ```http://localhost:PORTA/schema```. Você precisa ajustar esse end-point quando colocar o back-end no ar.

* `src/app/schema/schema.component.ts` - define o componente `SchemaComponent`, que se consecta com o serviço `SchemaService` para a obtencao do JSON do servidor e sua disponibilizacao para a UI do front-end.

* `src/app/schema/schema.component.html` - componente de UI para oferecer dois botões: `Obtain JSON object from back-end` e `Build DBSchemaNode object`. Exiba as ferramentas do desenvolvedor para conseguir visualizar os objetos capturados e construídos. O primeiro botão quando clicado leva um tempo (1 ou 2s) para obter os dados do back-end. Após isso, quando clicar no segundo botão, é possível ver o objeto DBSchemaNode construído (no console). Este objeto será o objeto principal a ser usado para pegar todas as informações a serem mostradas nos componentes de UI. A visualização da estrutura do objeto (no console e a definição dos tipos em `scr/app/dbmodel.model.ts`) é bem intuitiva. 