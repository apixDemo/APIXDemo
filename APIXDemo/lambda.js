
let Swagger = require('swagger-client');

exports.handler = function (event, context, callback) {

    Swagger.http({

        url: 'https://services.apixplatform.com/api-sandbox/application/token',
        method: 'post',
        query: {},
        headers: { "Accept": "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({
            "userName": "modelbankuser@inboxbear.com",
            "password": "1qaz2wsx@"
        })

    }).then((response) => {
        
        var access_token = "bearer " + response.body.access_token;

        if (event.method == "getBanks") {
            Swagger.http({
                url: `https://api.apixplatform.com/sbbank/1.0/BanksService/banks/banks`,
                method: 'get',
                query: { "page": "0", "size": "10" },
                headers: { "X-Authorization": access_token, "Accept": "*/*" }
            }).then((response) => {
                callback(null, response.body);
            }).catch((err) => {
                console.log(err);
            });
        }

        if (event.method == "createAccount") {
            Swagger.http({
                url: `https://api.apixplatform.com/sbaccount/1.0/AccountService/accounts/accounts`,
                method: 'post',
                query: {},
                headers: { "X-Authorization": access_token, "Content-Type": "application/json" },
                body: JSON.stringify(event.account)

            }).then((response) => {
                callback(null, response.body);
            }).catch((err) => {
                console.log(err);
            });
        }

        if (event.method == "getAccount") {
            Swagger.http({
                url: `https://api.apixplatform.com/sbaccount/1.0/AccountService/accounts/accounts/account/${event.accountNumber}`,
                method: 'get',
                query: {},
                headers: { "X-Authorization": access_token, "Accept": "*/*" }
            }).then((response) => {
                callback(null, response.body);
            }).catch((err) => {
                console.log(err);
            });
        }

    }).catch((err) => {
        console.log(err);
        callback("Execution failed");
    });

}