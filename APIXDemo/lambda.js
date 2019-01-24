
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
        Swagger.http({
            url: `https://api.apixplatform.com/facematch/1.0/v1/photo/verifyPair`,
            method: 'post',
            query: {},
            headers: { "appId": "123", "appKey": "123", "X-Authorization": "bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVd3J6cXNjODUtSWVpRVkzdG55Y2lXOEVpN0NteDBHX2hYQm5Nb2xaYjhJIn0.eyJqdGkiOiI4M2MyYzA5NS1iZjAxLTRhYzAtYTMwMC0yMDdjN2NmMDIxOTYiLCJleHAiOjE1NDgzNDgxOTgsIm5iZiI6MCwiaWF0IjoxNTQ4MzQ2Mzk4LCJpc3MiOiJodHRwczovL3Nzby5hcGl4cGxhdGZvcm0uY29tL2F1dGgvcmVhbG1zL0FGSU4tUmVhbG0iLCJhdWQiOiJhcGktc2FuZGJveC1taWNyb3NlcnZpY2UiLCJzdWIiOiJiNGZmYTUyYi05OGY2LTQ5YjUtYjAzNC1iNDRmYzE1NWRhYmEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcGktc2FuZGJveC1taWNyb3NlcnZpY2UiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiI0ZWViYzkyYS0wMWIyLTQ4MzMtOTJiMS00M2QzNzA2YjU2OWIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImJhbmstcm9sZXMiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiYXBpLXNhbmRib3gtdXNlciIsImJhbmstcm9sZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFwaS1zYW5kYm94LW1pY3Jvc2VydmljZSI6eyJyb2xlcyI6WyJ1c2VyIl19LCJkYXNoYm9hcmQtbWV0cmljcy1taWNyb3NlcnZpY2UiOnsicm9sZXMiOlsidXNlciJdfSwiYXBpLWdhdGV3YXktbWljcm9zZXJ2aWNlIjp7InJvbGVzIjpbImFwaS9zYmJhbmsvMS4wIiwicGxhbi9zYmVudGl0bGVtZW50L3ByZXZpZXdhY2Nlc3MiLCJhcGkvc2JlbnRpdGxlbWVudC8xLjAiLCJwbGFuL3NidHJhZGVmaW5hbmNlL3ByZXZpZXdhY2Nlc3MiLCJhcGkvdW5pb25iYW5rcGFydG5lcmxvZ2luYXBpLzEuMCIsInBsYW4vc2JwYXJ0eS9wcmV2aWV3YWNjZXNzIiwiYXBpL2RhdGF6b29hcGkvMS4wIiwicGxhbi9zYmFjY291bnQvcHJldmlld2FjY2VzcyIsInBsYW4vc2JpbnZlc3RtZW50L3ByZXZpZXdhY2Nlc3MiLCJwbGFuL3VuaW9uYmFua3BhcnRuZXJsb2dpbmFwaS9wcmV2aWV3YWNjZXNzIiwicGxhbi9zYnRmaW5xdWlyeS9wcmV2aWV3YWNjZXNzIiwiYXBpL3NidHJhZGVmaW5hbmNlLzEuMCIsImFwaS9zYnBheW1lbnQvMS4wIiwicGxhbi9zYnBheW1lbnQvcHJldmlld2FjY2VzcyIsInBsYW4vZGF0YXpvb2FwaS9wcmV2aWV3YWNjZXNzIiwicGxhbi9mYWNlbWF0Y2gvcHJldmlld2FjY2VzcyIsInBsYW4vc2JsZW5kaW5nVjEvcHJldmlld2FjY2VzcyIsInBsYW4vaHlwZXJ2ZXJnZS1saXZlbmVzcy9wcmV2aWV3YWNjZXNzIiwiYXBpL2ZhY2VtYXRjaC8xLjAiLCJhcGkvaHlwZXJ2ZXJnZS1saXZlbmVzcy8xLjAiLCJhcGkvc2J0ZmlucXVpcnkvMS4wIiwiYXBpL3NibGVuZGluZ1YxLzEuMCIsImFwaS9zYmludmVzdG1lbnQvMS4wIiwicGxhbi9zYmRvY3VtZW50L3ByZXZpZXdhY2Nlc3MiLCJwbGFuL3NiYmFuay9wcmV2aWV3YWNjZXNzIiwiYXBpL3NicGFydHkvMS4wIiwiYXBpL3NiYWNjb3VudC8xLjAiLCJ1c2VyIiwiYXBpL3NiZG9jdW1lbnQvMS4wIl19LCJhcGktc2FuZGJveC1taWNyb2Zyb250ZW5kIjp7InJvbGVzIjpbInVzZXIiXX0sImZvcnVtLW1pY3Jvc2VydmljZSI6eyJyb2xlcyI6WyJ1c2VyIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sImFmaW4tcGxhdGZvcm0tYmFja2VuZCI6eyJyb2xlcyI6WyJiYW5rLWNsaWVudC1yb2xlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm9yZ2FuaXphdGlvbk5hbWUiOiJpbmJveGJlYXIuY29tIiwiY29tcGFueVR5cGUiOiJiYW5rIiwiY29tcGFueU5hbWUiOiJNb2RlbCBCYW5rIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibW9kZWxiYW5rdXNlckBpbmJveGJlYXIuY29tIiwiZ2l2ZW5fbmFtZSI6IlJhdmVlbiIsInBlcnNvblBhcnR5SWQiOiIxOTg4Iiwib3JnYW5pemF0aW9uVHlwZSI6WyIvaW5ib3hiZWFyLmNvbSJdLCJwZXJzb25Pcmdhbml6YXRpb25JZCI6IjE5ODkiLCJncm91cE9yZ2FuaXphdGlvbklkIjpbIi9pbmJveGJlYXIuY29tIl0sIm5hbWUiOiJSYXZlZW4gd2lqZXRpbGxla2UiLCJmYW1pbHlfbmFtZSI6IndpamV0aWxsZWtlIiwiZW1haWwiOiJtb2RlbGJhbmt1c2VyQGluYm94YmVhci5jb20ifQ.BTIx8LM0KKLVVYhDkkTs1vzimXmPdQBLbJWEnBOZjBWlm-PRu7W3OEziIqN9j4Q4CsxzEpHPZdqWFyb-bH8pqKFzSW7KLfuCgd76U185LKtBJwPaVTloTQ7LVIWVajVVVHT5L7LQuYVIyhwphk1AGW50nGEx7vZ040CK2Dd81t6xUIXuPSUsLTlKLZqkjLPIByYfU5hKNPL6iSyILuv6wRlfU6a0LuRShR5fUUN8mtfzaJdnx5Upyn2yvvtn54Cz4jRrOPyvtFcyz9rQCKLwkXFoBdg6EWwAywMhqIzxNfEwZ4mqmJK2EUIriZKkLpcCFjyA8uu-18-e4OE_SlnUog", "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" },
            body: `image1=test.img&image2=test.img&type=jpg`
        }).then((response) => {
            // your code goes here
        }).catch((err) => {
            // error handling goes here
        });

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

    }).catch((err) => {
        console.log(err);
        callback("Execution failed");
    });

}