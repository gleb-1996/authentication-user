$('form #login').click(function() {
    let username = $('#username').val();
    let password = $('#password').val();

    let obj = authenticationUser(username, password);
    console.log(obj);
});

function authenticationUser(username, password) {
    let url = 'https://raw.githubusercontent.com/gleb-1996/test-db/main/data.json';
    let xhr = new XMLHttpRequest();
    let result = {};

    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        let responseObj = xhr.response;

        if (xhr.status != 200) {
            result.responseStatus = false;
            result.text = `Ошибка ${xhr.status}: ${xhr.statusText}`;
        } else {
            let coincidences = 0;
            for (let i = 0; i < responseObj.length; i++) {
                if (responseObj[i].userName === username && responseObj[i].userPassword === password) {
                    result.responseStatus = true;
                    result.text = `Пользователь ${responseObj[i].userName} успешно аутентифицирован.`;
                    coincidences++;
                    break;
                }
            }

            if (coincidences === 0) {
                result.responseStatus = false;
                result.text = `Пользователь ${username} не был аутентифицирован.`;
            }
        }
    }

    return result;
}