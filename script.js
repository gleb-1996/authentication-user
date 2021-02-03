$('form #login').click(function() {
    let username = $('#username').val();
    let password = $('#password').val();

    if (username === '' || password === '') {
        alert('Пожалуйста, введите данные.');
    } else {
        authenticationUser(username, password);
    }
});

function authenticationUser(username, password) {
    let url = 'https://raw.githubusercontent.com/gleb-1996/test-db/main/dataa.json';
    let xhr = new XMLHttpRequest();
    let coincidences = 0;
    let message;

    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        let responseObj = xhr.response;

        if (xhr.status != 200) {
            console.log(xhr.statusText);
            message = `Ошибка ${xhr.status}: ${xhr.statusText}`;
            alert(message);
        } else {
            for (let i = 0; i < responseObj.length; i++) {
                if (responseObj[i].userName === username && responseObj[i].userPassword === password) {
                    coincidences++;
                    message = `Пользователь ${responseObj[i].userName} успешно аутентифицирован.`;
                    alert(message);
                    break;
                }
            }

            if (coincidences === 0) {
                message = `Пользователь ${username} не был аутентифицирован.`;
                alert(message);
            }
        }
    }
}