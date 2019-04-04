
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
        console.log(response.body.access_token)
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

        Swagger.http({
            url: `https://api.apixplatform.com/sbbank/1.0/BanksService/banks/banks`,
            method: 'get',
            query: { "page": "0", "size": "1" },
            headers: { "X-Authorization": access_token, "Accept": "*/*" }
        }).then((response) => {
            // your code goes here
        }).catch((err) => {
            // error handling goes here
        });


    }).catch((err) => {
        console.log(err);
        callback("Execution failed");
    });
    Swagger.http({
        url: `https://api.apixplatform.com/facematch/1.0/v1/photo/verifyPair`,
        method: 'post',
        query: {},
        headers: { "appId": "123", "appKey": "123", "X-Authorization": "bearer authtoken", "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" },
        body: `image1=image.png&image2=image.png&type=png`
    }).then((response) => {
        // your code goes here
    }).catch((err) => {
        // error handling goes here
    });

}