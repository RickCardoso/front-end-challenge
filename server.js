const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.json({
        title: 'Desafio Front End',
        version: '1.0.0',
        source: 'https://github.com/RickCardoso/front-end-challenge',
        authors: [
            {
                name: 'Ricardo Cardoso',
                url: 'https://github.com/RickCardoso'
            }
        ]
    });
});

const auth = {
    'john@gmail.com': 'passwd',
    'bill@gmail.com': 'test123'
};

const users = {
    'john@gmail.com': {
        firstName: 'John'
    },
    'bill@gmail.com': {
        firstName: 'Bill'
    }
};

let status = [
    {
        id: 1,
        description: 'Aprovado'
    },
    {
        id: 2,
        description: 'Bloqueado'
    },
    {
        id: 3,
        description: 'Cancelado'
    },
    {
        id: 4,
        description: 'Descredenciado'
    }
]

let clients = [
    {
        id: 1,
        name: 'Loja da Manu',
        address: 'Av. Ataulfo de Paiva 123',
        neighborhood: 'Leblon',
        city: 'Rio de Janeiro',
        status: 1,
        document: {
            type: 1,
            number: '12.345.678/0001-00'
        },
        partners: [
            {
                name: 'Manu',
                document: '123.456.789-10'
            }
        ]
    },
    {
        id: 2,
        name: 'Padaria do Seu José',
        address: 'Av. Rio Branco 123',
        neighborhood: 'Centro',
        city: 'Rio de Janeiro',
        status: 2,
        document: {
            type: 1,
            number: '23.456.789/0001-21'
        },
        partners: [
            {
                name: 'José',
                document: '234.567.891-01'
            }
        ]
    },
    {
        id: 3,
        name: 'Martelinho de Ouro da Carla',
        address: 'Rua da Passagem 13',
        neighborhood: 'Botafogo',
        city: 'Rio de Janeiro',
        status: 4,
        document: {
            type: 1,
            number: '34.567.890/0001-41'
        },
        partners: [
            {
                name: 'Carla Silva',
                document: '345.678.901-23'
            },
            {
                name: 'Maria Silva',
                document: '456.789.012-34'
            }
        ]
    },
    {
        id: 4,
        name: 'Brigadeiro da Vó Zelda',
        address: 'Rua Frederico Méier 10',
        neighborhood: 'Méier',
        city: 'Rio de Janeiro',
        status: 3,
        document: {
            type: 1,
            number: '45.678.901/0001-31'
        },
        partners: [
            {
                name: 'Zelda',
                document: '567.890.123-45'
            }
        ]
    }
];

const transactionStatus = [
    {
        id: 1,
        description: 'Autorizado'
    },
    {
        id: 2,
        description: 'Cancelado'
    },
    {
        id: 3,
        description: 'Negado'
    }
];

let brands = [
    {
        id: 1,
        name: 'Mastercard'
    },
    {
        id: 2,
        name: 'VISA'
    },
    {
        id: 3,
        name: 'Elo'
    },
    {
        id: 4,
        name: 'American Express'
    }
];

let transactionalData = [
    {
        id: 1,
        clientId: 4,
        amount: 599.12,
        date: '12/05/2019 07:19:20',
        statusId: 1,
        bin: '057041******2686',
        brandId: 1
    },
    {
        id: 2,
        clientId: 3,
        amount: 574.06,
        date: '04/05/2019 05:43:13',
        statusId: 3,
        bin: '662436******5111',
        brandId: 2
    },
    {
        id: 3,
        clientId: 3,
        amount: 785.34,
        date: '09/05/2019 11:21:17',
        statusId: 2,
        bin: '529368******3875',
        brandId: 3
    },
    {
        id: 4,
        clientId: 3,
        amount: 804.99,
        date: '11/05/2019 06:05:29',
        statusId: 1,
        bin: '311671******2375',
        brandId: 2
    },
    {
        id: 5,
        clientId: 2,
        amount: 303.46,
        date: '18/05/2019 18:28:40',
        statusId: 3,
        bin: '765509******5456',
        brandId: 2
    },
    {
        id: 6,
        clientId: 1,
        amount: 125.44,
        date: '09/05/2019 11:02:09',
        statusId: 2,
        bin: '655040******3097',
        brandId: 2
    },
    {
        id: 7,
        clientId: 1,
        amount: 139.52,
        date: '19/05/2019 18:51:47',
        statusId: 2,
        bin: '421907******7338',
        brandId: 3
    },
    {
        id: 8,
        clientId: 4,
        amount: 341.25,
        date: '23/05/2019 19:51:40',
        statusId: 2,
        bin: '895256******5581',
        brandId: 3
    },
    {
        id: 9,
        clientId: 1,
        amount: 149.09,
        date: '09/05/2019 22:40:36',
        statusId: 3,
        bin: '538831******9771',
        brandId: 4
    },
    {
        id: 10,
        clientId: 4,
        amount: 851.61,
        date: '16/05/2019 01:06:47',
        statusId: 1,
        bin: '940967******4641',
        brandId: 4
    },
    {
        id: 11,
        clientId: 3,
        amount: 106.58,
        date: '15/05/2019 00:31:03',
        statusId: 2,
        bin: '787038******1043',
        brandId: 3
    },
    {
        id: 12,
        clientId: 1,
        amount: 199.99,
        date: '06/05/2019 19:27:55',
        statusId: 2,
        bin: '033728******2785',
        brandId: 2
    },
    {
        id: 13,
        clientId: 1,
        amount: 217.01,
        date: '10/05/2019 00:23:45',
        statusId: 2,
        bin: '410749******9438',
        brandId: 4
    },
    {
        id: 14,
        clientId: 1,
        amount: 204.97,
        date: '13/05/2019 05:20:48',
        statusId: 2,
        bin: '356345******0206',
        brandId: 1
    },
    {
        id: 15,
        clientId: 1,
        amount: 998.41,
        date: '04/05/2019 13:30:48',
        statusId: 1,
        bin: '933032******0198',
        brandId: 1
    },
    {
        id: 16,
        clientId: 3,
        amount: 382.46,
        date: '06/05/2019 18:45:57',
        statusId: 3,
        bin: '562502******1005',
        brandId: 3
    },
    {
        id: 17,
        clientId: 3,
        amount: 275.92,
        date: '21/05/2019 12:20:34',
        statusId: 3,
        bin: '802968******4830',
        brandId: 3
    },
    {
        id: 18,
        clientId: 2,
        amount: 281.77,
        date: '08/05/2019 09:50:13',
        statusId: 3,
        bin: '099692******1547',
        brandId: 4
    },
    {
        id: 19,
        clientId: 4,
        amount: 268.06,
        date: '22/05/2019 04:44:55',
        statusId: 1,
        bin: '519927******2977',
        brandId: 3
    },
    {
        id: 20,
        clientId: 1,
        amount: 175.24,
        date: '22/05/2019 20:49:32',
        statusId: 1,
        bin: '376466******2588',
        brandId: 4
    },
    {
        id: 21,
        clientId: 1,
        amount: 390.92,
        date: '01/05/2019 11:54:01',
        statusId: 3,
        bin: '167903******6818',
        brandId: 4
    },
    {
        id: 22,
        clientId: 1,
        amount: 265.1,
        date: '21/05/2019 21:03:51',
        statusId: 2,
        bin: '766888******6609',
        brandId: 3
    },
    {
        id: 23,
        clientId: 1,
        amount: 458.02,
        date: '15/05/2019 07:45:32',
        statusId: 2,
        bin: '115373******0457',
        brandId: 4
    },
    {
        id: 24,
        clientId: 4,
        amount: 200.76,
        date: '10/05/2019 12:41:29',
        statusId: 3,
        bin: '542027******0276',
        brandId: 2
    },
    {
        id: 25,
        clientId: 4,
        amount: 411.47,
        date: '05/05/2019 04:51:26',
        statusId: 1,
        bin: '432073******4365',
        brandId: 1
    },
    {
        id: 26,
        clientId: 2,
        amount: 236.2,
        date: '19/05/2019 16:21:37',
        statusId: 2,
        bin: '093466******3194',
        brandId: 3
    },
    {
        id: 27,
        clientId: 1,
        amount: 584.28,
        date: '24/05/2019 00:57:08',
        statusId: 2,
        bin: '377848******5278',
        brandId: 3
    },
    {
        id: 28,
        clientId: 3,
        amount: 799.12,
        date: '22/05/2019 09:14:41',
        statusId: 1,
        bin: '788797******7432',
        brandId: 2
    },
    {
        id: 29,
        clientId: 3,
        amount: 764.32,
        date: '01/05/2019 08:51:53',
        statusId: 2,
        bin: '881217******7394',
        brandId: 1
    },
    {
        id: 30,
        clientId: 2,
        amount: 592.63,
        date: '06/05/2019 13:55:49',
        statusId: 2,
        bin: '343449******2294',
        brandId: 4
    },
    {
        id: 31,
        clientId: 2,
        amount: 7.05,
        date: '14/05/2019 05:59:45',
        statusId: 2,
        bin: '314537******1396',
        brandId: 2
    },
    {
        id: 32,
        clientId: 3,
        amount: 604.61,
        date: '02/05/2019 00:02:29',
        statusId: 1,
        bin: '017922******8553',
        brandId: 1
    },
    {
        id: 33,
        clientId: 2,
        amount: 227.22,
        date: '01/05/2019 07:15:31',
        statusId: 1,
        bin: '792144******8903',
        brandId: 1
    },
    {
        id: 34,
        clientId: 3,
        amount: 561.45,
        date: '04/05/2019 08:49:15',
        statusId: 1,
        bin: '443846******8274',
        brandId: 3
    },
    {
        id: 35,
        clientId: 3,
        amount: 88.95,
        date: '01/05/2019 07:39:16',
        statusId: 2,
        bin: '317548******3111',
        brandId: 4
    },
    {
        id: 36,
        clientId: 1,
        amount: 430.07,
        date: '12/05/2019 15:00:02',
        statusId: 2,
        bin: '292734******6159',
        brandId: 2
    },
    {
        id: 37,
        clientId: 3,
        amount: 609.19,
        date: '15/05/2019 11:54:34',
        statusId: 1,
        bin: '297709******3194',
        brandId: 1
    },
    {
        id: 38,
        clientId: 2,
        amount: 545.65,
        date: '04/05/2019 14:21:26',
        statusId: 2,
        bin: '506094******2666',
        brandId: 1
    },
    {
        id: 39,
        clientId: 2,
        amount: 191.26,
        date: '07/05/2019 21:04:36',
        statusId: 1,
        bin: '125476******9013',
        brandId: 2
    },
    {
        id: 40,
        clientId: 3,
        amount: 822.59,
        date: '18/05/2019 18:10:02',
        statusId: 1,
        bin: '292598******3674',
        brandId: 4
    },
    {
        id: 41,
        clientId: 2,
        amount: 513.11,
        date: '13/05/2019 13:04:22',
        statusId: 3,
        bin: '947927******3394',
        brandId: 2
    },
    {
        id: 42,
        clientId: 4,
        amount: 292.26,
        date: '20/05/2019 05:26:32',
        statusId: 2,
        bin: '890395******0990',
        brandId: 3
    },
    {
        id: 43,
        clientId: 3,
        amount: 809.33,
        date: '23/05/2019 10:11:11',
        statusId: 1,
        bin: '860704******8646',
        brandId: 3
    },
    {
        id: 44,
        clientId: 1,
        amount: 903.5,
        date: '10/05/2019 03:19:26',
        statusId: 2,
        bin: '788667******9947',
        brandId: 2
    },
    {
        id: 45,
        clientId: 4,
        amount: 606.45,
        date: '13/05/2019 06:19:50',
        statusId: 1,
        bin: '266121******0113',
        brandId: 2
    },
    {
        id: 46,
        clientId: 1,
        amount: 120.3,
        date: '10/05/2019 17:24:23',
        statusId: 1,
        bin: '474926******3490',
        brandId: 3
    },
    {
        id: 47,
        clientId: 4,
        amount: 897.58,
        date: '23/05/2019 12:32:12',
        statusId: 3,
        bin: '192197******8493',
        brandId: 2
    },
    {
        id: 48,
        clientId: 2,
        amount: 356.34,
        date: '15/05/2019 06:36:32',
        statusId: 2,
        bin: '688028******0148',
        brandId: 4
    },
    {
        id: 49,
        clientId: 3,
        amount: 75.87,
        date: '18/05/2019 22:46:10',
        statusId: 1,
        bin: '696585******9206',
        brandId: 1
    },
    {
        id: 50,
        clientId: 2,
        amount: 696.85,
        date: '10/05/2019 05:53:21',
        statusId: 2,
        bin: '047508******6857',
        brandId: 3
    }
];

app.post('/api/user/login', function (req, res) {
    const payload = req.body;

    if(auth[payload.email] && auth[payload.email] === payload.password) {
        res.status(200).json(users[payload.email]);
    } else {
        res.sendStatus(401);
    }
});

app.get('/api/status/', function (req, res) {
    res.json({ status });
});

app.get('/api/clients/', function (req, res) {
    const mappedClients = clients.map(client => {
        return {
            id: client.id,
            name: client.name,
            status: client.status
        }
    })
    res.json({ clients: mappedClients });
});

app.get('/api/client/:id', function (req, res) {
    let client = clients.find((client) => client.id.toString() === req.params.id.toString());
    res.json({ client });
});

app.patch('/api/client/:id', (req, res) => {
    let index = clients.findIndex((client) => client.id.toString() === req.params.id.toString());
    Object.assign(clients[index], req.body);
    res.status(200).json({ status: 'success' });
});

app.post('/api/client/', (req, res) => {
    const topId = clients.map(client => client.id).reduce((a, b) => {
        if (a > b) return a
        else return b
    })

    clients.push(Object.assign({
        id: topId + 1
    }, req.body));
    
    res.status(200).json({ status: 'success' });
});

app.get('/api/client/:id/transactions', (req, res) => {
    const transactions = transactionalData.filter(transaction => transaction.clientId.toString() === req.params.id.toString());

    res.json(transactions.map(transaction => {
        const clientName = clients.find(client => client.id === transaction.clientId).name;
        
        return Object.assign(transaction, {
            clientName
        });
    }));
});

app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`)
});
