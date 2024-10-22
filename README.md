[AXIOS__BADGE]: https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios
[DOTENV__BADGE]: https://img.shields.io/badge/dotenv-000?style=for-the-badge&logo=dotenv
[EXPRESS__BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express
[MONGOOSE__BADGE]: https://img.shields.io/badge/mongoose-880000?style=for-the-badge&logo=mongoose
[NODEMON__BADGE]: https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge&logo=nodemon
[WINSTON__BADGE]: https://img.shields.io/badge/winston-0055A4?style=for-the-badge&logo=winston
[TYPES__EXPRESS_BADGE]: https://img.shields.io/badge/@types/express-430098?style=for-the-badge&logo=express
[TYPES__NODE_BADGE]: https://img.shields.io/badge/@types/node-8F8F8F?style=for-the-badge&logo=node.js
[TS_NODE__BADGE]: https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=typescript
[TS_NODE_DEV__BADGE]: https://img.shields.io/badge/ts--node--dev-323330?style=for-the-badge&logo=dev.to
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript

<h1 align="center" style="font-weight: bold;">Physical Store 💻</h1>

![axios][AXIOS__BADGE]
![dotenv][DOTENV__BADGE]
![express][EXPRESS__BADGE]
![mongoose][MONGOOSE__BADGE]
![nodemon][NODEMON__BADGE]
![winston][WINSTON__BADGE]
![@types/express][TYPES__EXPRESS_BADGE]
![@types/node][TYPES__NODE_BADGE]
![ts-node][TS_NODE__BADGE]
![ts-node-dev][TS_NODE_DEV__BADGE]
![typescript][TYPESCRIPT__BADGE]

<p align="center">
    <a href="#estrutura">Estrutura do Projeto</a> •
    <a href="#fluxo-geral">Fluxo Geral do Sistema</a> •
    <a href="#apis">APIs Utilizadas</a> •
    <a href="#como-funciona">Como o Projeto Funciona</a> •
    <a href="#routes">API Documentação</a> •
    <a href="#autor">Autor</a> •
    <a href="#contribute">Como Contribuir</a> 
</p>

<p align="center">
  <b>Encontra lojas físicas de um eCommerce, utilizando a API do ViaCEP para localizar endereços com base no CEP fornecido pelo usuário. As lojas mais próximas serão priorizadas dentro de um raio de 100 km.</b>
</p>

---

<h2 id="estrutura">📂 Estrutura do Projeto</h2>

```
/📂physical-store
|-- /📂node_modules               # Módulos do Node.js
|-- /📂src
|   |-- /📂config
|   |   |-- db.ts                 # Conexão com o MongoDB
|   |-- /📂controllers
|   |   |-- storeController.ts    # Lógica das lojas (cálculo da distância, listagem de todas lojas, pesquisa por ID, delete loja, criação de loja, update de loja)
|   |-- /📂logs                   # Pasta para armazenar os arquivos de logs gerados pelo Winston
|   |-- /📂models
|   |   |-- storeModel.ts         # Modelo da loja
|   |-- /📂routes
|   |   |-- storeRoutes.ts        # Definição das rotas
|   |-- /📂utils
|   |   |-- distance.ts           # Função para calcular a distância entre dois pontos (fórmula de Haversine)
|   |   |-- logger.ts             # Configuração do Winston para logs
|   |   |-- obterCoordenadas.ts   # Função que recebe um CEP valida o CEP pelo viaCEP e retorna as coordenadas (latitude/longitude)
|   |-- app.ts                    # Configuração e inicialização do servidor
|-- .env                          # Variáveis de ambiente
|-- .gitgnore                     # Arquivos ignorados pelo git
|-- package.json                  # Dependências do projeto
|-- README.md                     # Documentação do projeto
|-- tsconfig.json                 # Configurações do TypeScript

```

---

<h2 id="fluxo-geral">Fluxo Geral do Sistema</h2>

1. O usuário insere um CEP no sistema.
2. O sistema valida o CEP e obtém o endereço correspondente usando a API ViaCEP.
3. O endereço é enviado para a API Nominatim, que retorna as coordenadas (latitude e longitude) daquele local.
4. O sistema utiliza a fórmula de Haversine para calcular a distância entre a localização do usuário e as lojas físicas cadastradas.
5. As lojas dentro de um raio de 100 km são priorizadas e exibidas ao usuário.

---

<h2 id="apis">APIs Utilizadas</h2>

1. **ViaCEP API**  
   A [API ViaCEP](https://viacep.com.br/) é utilizada para buscar o endereço completo a partir de um CEP fornecido. Isso inclui informações como logradouro, bairro, cidade e estado. A requisição à API é feita no formato JSON.
   
2. **Nominatim API**  
   A [API Nominatim](https://nominatim.org/) converte endereços em coordenadas geográficas (latitude e longitude). Essas coordenadas são para o cálculo de distância entre a localização do usuário e as lojas físicas.
   
3. **Fórmula de Haversine**  
   A fórmula de Haversine é usada para calcular a distância entre dois pontos na superfície da Terra, dados em coordenadas de latitude e longitude. Essa fórmula considera a curvatura da Terra e é usada em sistemas de geolocalização.

---

<h2 id="como-funciona">Como o Projeto Funciona</h2>

1. **Entrada do Usuário (CEP)**: O usuário insere o CEP de sua localização.
   
2. **Validação e Obtenção do Endereço (ViaCEP)**: 
   O CEP é enviado à [API ViaCEP](https://viacep.com.br/), que retorna informações do endereço, como logradouro, bairro, cidade e estado. Essa etapa valida o CEP e transforma o código postal em um endereço completo.
   
3. **Obtenção das Coordenadas Geográficas (Nominatim)**:
   Com o endereço obtido pela API ViaCEP, o sistema realiza uma requisição à API [Nominatim](https://nominatim.org/) (um serviço do OpenStreetMap) para obter as coordenadas geográficas (latitude e longitude) do endereço. Essas coordenadas são necessárias para calcular a distância até as lojas físicas.

4. **Cálculo da Distância (Fórmula de Haversine)**:
   Utilizando a fórmula de Haversine, o sistema calcula a distância entre as coordenadas da localização do usuário e as coordenadas das lojas cadastradas no sistema. O cálculo é baseado nas coordenadas geográficas (latitude e longitude) e retorna a distância entre dois pontos na superfície da Terra, em quilômetros.
   
5. **Prioridade para Lojas Próximas**:
   O sistema retorna as lojas que estão dentro de um raio de 100 km da localização do usuário, priorizando aquelas mais próximas.

---

<h2 id="routes">📍 API Documentação</h2>

| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /lojas /buscar-lojas-proximas</kbd>     | *Obrigatório enviar o json* [Veja mais](#get-buscar-lojas-proximas)
| <kbd>GET /lojas</kbd>     | [Veja mais](#get-loja)
| <kbd>GET /lojas /:id</kbd>     | *Obrigatório id na rota* [Veja mais](#get-loja-id)
| <kbd>POST /lojas</kbd>     | *Obrigatório enviar o json* [Veja mais](#post-loja)
| <kbd>PATCH /lojas /:id</kbd>     | *Obrigatório id na rota e enviar o json* [Veja mais](#patch-loja)
| <kbd>DELETE /lojas /:id</kbd>     | *Obrigatório id na rota* [Veja mais](#delete-loja)


<h3 id="get-buscar-lojas-proximas">GET /lojas /buscar-lojas-proximas</h3>
Pesquisa lojas próximas (em um raio de 100km) do CEP enviado por json

**BODY**
```json
{
    "cep": "01000-010",
}
```

**RESPONSE**
```json
[
    {
        "endereco": {
            "rua": "Rua das Flores",
            "numero": "101",
            "cidade": "São Paulo",
            "estado": "SP",
            "CEP": "01001-000"
        },
        "_id": "67143349a5986e2abeed72f1",
        "nome": "Loja B - SP",
        "distancia": null,
        "__v": 0
    },
    {
        "endereco": {
            "rua": "Rua Jacob Diehl",
            "numero": "10",
            "cidade": "Piracicaba",
            "estado": "SP",
            "CEP": "13420-410"
        },
        "_id": "671549e8536ff171adeafa41",
        "nome": "Loja Exemplo",
        "distancia": null,
        "__v": 0
    }
]
```

<h3 id="get-loja">GET /lojas</h3>
Retorna lista com todas as lojas

**RESPONSE**
```json
[
    {
        "endereco": {
            "rua": "Rua das Flores",
            "numero": "101",
            "cidade": "São Paulo",
            "estado": "SP",
            "CEP": "01001-000"
        },
        "_id": "67143349a5986e2abeed72f1",
        "nome": "Loja B - SP",
        "distancia": null,
        "__v": 0
    },
    {
        "endereco": {
            "rua": "Rua Jacob Diehl",
            "numero": "10",
            "cidade": "Piracicaba",
            "estado": "SP",
            "CEP": "13420-410"
        },
        "_id": "671549e8536ff171adeafa41",
        "nome": "Loja Exemplo",
        "distancia": null,
        "__v": 0
    }
]
```

<h3 id="get-loja-id">GET /lojas</h3>
Retorna a loja do ID especificado na rota

**RESPONSE**
```json
{
    "endereco": {
        "rua": "Rua das Flores",
        "numero": "101",
        "cidade": "São Paulo",
        "estado": "SP",
        "CEP": "01001-000"
    },
    "_id": "67143349a5986e2abeed72f1",
    "nome": "Loja B - SP",
    "distancia": null,
    "__v": 0
}
```

<h3 id="post-loja">POST /lojas</h3>
Cria uma loja

**BODY**
```json
{
  "nome": "Loja Exemplo",
  "endereco":{
    "cep": "01000-010",
    "numero": "10"
  }
}
```

**RESPONSE**
```json
{
    "nome": "Loja Exemploabc",
    "endereco": {
        "rua": "Rua Jacob Diehl",
        "numero": "10",
        "cidade": "Piracicaba",
        "estado": "SP",
        "CEP": "13420-410"
    },
    "distancia": null,
    "_id": "6717ba1d458aed30586c8849",
    "__v": 0
}
```

<h3 id="patch-loja">PATCH /lojas /:id</h3>
Edita a loja do ID especificado na rota

**BODY**
```json
{
    "nome": "Loja B - SP",
    "endereco": {
        "rua": "Rua das Flores",
        "numero": "101",
        "cidade": "São Paulo",
        "estado": "SP",
        "CEP": "01001-000"
    }
}
```

**RESPONSE**
```json
{
    "message": "Loja atualizada com sucesso!",
    "loja": {
        "endereco": {
            "rua": "Rua das Flores",
            "numero": "101",
            "cidade": "São Paulo",
            "estado": "SP",
            "CEP": "01001-000"
        },
        "_id": "67143349a5986e2abeed72f1",
        "nome": "Loja B - SP",
        "distancia": null,
        "__v": 0
    }
}
```

<h3 id="delete-loja">DELETE /lojas /:id</h3>
Deleta a loja do ID especificado na rota

**RESPONSE**
```json
{
    "message": "Loja deletada com sucesso",
    "loja": {
        "endereco": {
            "rua": "Rua Jacob Diehl",
            "numero": "10",
            "cidade": "Piracicaba",
            "estado": "SP",
            "CEP": "13420-410"
        },
        "_id": "6717ba1d458aed30586c8849",
        "nome": "Loja Exemploabc",
        "distancia": null,
        "__v": 0
    }
}
```
---

<h2 id="autor">🤝 Autora</h2>

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="perfil.png" width="100px;" alt="Beatriz Garcia Profile Picture"/><br>
        <sub>
          <b>Beatriz Garcia</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

---

<h2 id="contribute">📫 Como Contribuir</h2>

1. Faça um fork do projeto.
2. Crie uma nova branch: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'Minha nova feature'`.
4. Faça o push para a branch: `git push origin minha-feature`.
5. Abra um Pull Request.








