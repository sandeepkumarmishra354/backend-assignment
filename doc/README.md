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