# Desafio de backend

## Objetivo
Você precisa desenvolver uma API para realizar busca de passagens aéreas.

## Orientações

- Deve existir a seguinte rota de busca:
```
GET /tickets
```

- Parâmetros que serão recebidos pela rota de busca:
```js
{
  originPlace: string; // Local de origem (ex: VIX).
  destinationPlace: string; // Local de destino (ex: REC).
  outboundDate: string; // Data de saída em ISOString. -> Tomei a liberdade de buscar todas as passagens que fossem igual ou depois dessa data 
  inboundDate?: string; // Data de retorno em ISOString. Não pode ser anterior a outboundDate. -> Tomei a liberdade de buscar todas as passagens que fossem igual ou depois dessa data 
  cabinClass?: string; // Tipo de cabine. Pode ser economica ou premium.
  adults: number; // Número de adultos (16+ anos). Deve ser entre 1 e 8.
  children?: number; // Número de crianças (1-16 anos). Deve ser entre 0 e 8.
  infants?: number; // Número de bebês (abaixo de 12 meses). Deve ser entre 0 e 8.
}
```

- Os dados da requisição precisam ser validados pelo backend e, em caso de falha de validação, um erro deve ser retornado.

- A resposta da API deve possuir o seguinte formato:

```js
{
  tickets: Array<{
    id: string; // Id do voo.
    company: string; // Nome da compania aérea.
    departureTime: string; // Data de partida em ISOString.
    arrivalTime: string; // Data de chegada em ISOString.
    departureStation: string; // Local de partida (ex: VIX).
    arrivalStation: string; // Local de chegada (ex: REC).
    legDurationTimeInMinutes: number; // Tempo de voo.
    stopsPlaces: string[]; // Locais de paradas (ex: [CNF, CHZ]).
  }>,
  requestId: string;
  ...
}
```

- A resposta deverá devolver 20 tickets. 

- Para retornar os próximos 20 tickets, deverá ser passado o requestId para rota:

```
GET /tickets/pull/:requestId
```

- Quando não houver mais tickets para listar, deverá retornar um array vazio

- As passagens armazenadas no banco de dados devem possuir o seguinte formato:
```js
{
  id: string; // Id do voo.
  company: string; // Nome da compania aérea.
  departureTime: string; // Data de partida.
  departureStation: string; // Local de partida (ex: VIX).
  arrivalTime: string; // Data de chegada.
  arrivalStation: string; // Local de chegada (ex: REC).
  stopsPlaces: string[]; // Locais de paradas (ex: [CNF, CHZ]).
  remainingSeats: number; // Assentos restantes. (obs: bebês não ocupam assentos)
  cabinClass?: string; // Tipo de cabine. Pode ser economica ou premium.
}
```

- As informações das passagens devem ser buscadas no elasticsearch

## Regras

- O projeto deverá ser criado utlizando Nodejs + Typescript + Express.
- O projeto deverá ter eslint (pode escolher qualquer styleguide) e prettier configurado.
- O projeto deverá possuir teste automatizado.
- Procure serguir boas práticas de design de código e SOLID.
- O projeto deverá ser colocado no github/gitlab e o link enviado para o recrutador.
