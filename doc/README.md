# API documentation

Method POST
``/api/invoice/create``

```json
{
    "phone":"1234567890",
    "name": "customer name",
    "address": "achalpur pbh",
    "email": "dev.veerusandy@gmail.com",
    "notes": ["optional notes 1"],
    "dueDate": "optional default 5 days after",
    "status": "DUE | PAID | CANCELLED optional default (DUE)",
    "paymentMode": "CASH | DD | ONLINE | CHEQUE optional default (CASH)",
    "lineItems": [{
        "totalPrice": 123,
        "quantity": 2,
        "name": "item 1"
    },{
        "totalPrice": 100,
        "quantity": 1,
        "name": "item 2"
    }]
}
```

Response

```json
{
    "message": "new invoice created",
    "payload": {
        "id": "a0829aa2-8bb6-4163-933b-666f6c445fce",
        "createdAt": "2021-06-19T15:03:38.344Z",
        "address": "achalpur pbh",
        "dueDate": "2021-06-24T15:03:38.339Z",
        "email": "dev.veerusandy@gmail.com",
        "name": "customer name",
        "paymentMode": "CASH",
        "phone": "1234567890",
        "status": "DUE",
        "notes": [
            "notes 1",
            "notes 2"
        ],
        "totalAmount": 223,
        "lineItems": [
            {
                "id": "7d85269d-99ed-432f-b971-461fc8a1a045",
                "name": "item 1",
                "quantity": 2,
                "totalPrice": 123
            },
            {
                "id": "b34804da-8892-483b-921a-eab4f0bf193a",
                "name": "item 2",
                "quantity": 1,
                "totalPrice": 100
            }
        ]
    }
}
```

Method GET
``/api/invoice/list``

```json
{
    "message": "1 invoice(s) fetched successfully.",
    "payload": [
        {
            "id": "3fb76b8c-6e05-43b9-99e5-bcdd022d7cfd",
            "createdAt": "2021-06-19T15:23:39.627Z",
            "address": "achalpur pbh",
            "dueDate": "2021-06-24T15:23:39.624Z",
            "email": "dev.veerusandy@gmail.com",
            "name": "customer name",
            "paymentMode": "CASH",
            "phone": "1234567890",
            "status": "DUE",
            "notes": [
                "notes 1",
                "notes 2"
            ],
            "totalAmount": 223,
            "lineItems": [
                {
                    "id": "cecc26b8-96e5-471d-b2ea-9146fcd1f89e",
                    "name": "item 1",
                    "quantity": 2,
                    "totalPrice": 123
                },
                {
                    "id": "be8b66c4-0206-4d92-a7ad-b0ca1a895328",
                    "name": "item 2",
                    "quantity": 1,
                    "totalPrice": 100
                }
            ]
        }
    ]
}
```

Method GET
``/api/invoice/list/:invoice_id``

ex- ``/api/invoice/list/3fb76b8c-6e05-43b9-99e5-bcdd022d7cfd``

```json
{
    "message": "success",
    "payload": {
        "id": "3fb76b8c-6e05-43b9-99e5-bcdd022d7cfd",
        "createdAt": "2021-06-19T15:23:39.627Z",
        "address": "achalpur pbh",
        "dueDate": "2021-06-24T15:23:39.624Z",
        "email": "dev.veerusandy@gmail.com",
        "name": "customer name",
        "paymentMode": "CASH",
        "phone": "1234567890",
        "status": "DUE",
        "notes": [
            "notes 1",
            "notes 2"
        ],
        "totalAmount": 223,
        "lineItems": [
            {
                "id": "cecc26b8-96e5-471d-b2ea-9146fcd1f89e",
                "name": "item 1",
                "quantity": 2,
                "totalPrice": 123
            },
            {
                "id": "be8b66c4-0206-4d92-a7ad-b0ca1a895328",
                "name": "item 2",
                "quantity": 1,
                "totalPrice": 100
            }
        ]
    }
}
```

Method PUT
``/api/invoice/update-status/:invoice_id?status=PAID``

ex- ``/api/invoice/update-status/3fb76b8c-6e05-43b9-99e5-bcdd022d7cfd?status=PAID``

(status can be DUE, PAID, CANCELLED)

```json
{
    "message": "status updated",
    "payload": {
        "id": "3fb76b8c-6e05-43b9-99e5-bcdd022d7cfd",
        "updatedAt": "2021-06-19T15:29:34.651Z",
        "status": "PAID"
    }
}
```

Method GET
``/api/invoice/send-mail/:invoice_id``

ex- ``/api/invoice/send-mail/3fb76b8c-6e05-43b9-99e5-bcdd022d7cfd``

```json
{
    "message": "mail sent successfully.",
    "payload": {
        "id": "3fb76b8c-6e05-43b9-99e5-bcdd022d7cfd",
        "email": "dev.veerusandy@gmail.com",
        "name": "customer name"
    }
}
```