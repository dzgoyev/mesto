class UserInfo {
    constructor({name, description}) {
        this._name = name;
        this._description = description;

    }

    getUserInfo() {
        return { // возвращает объект с данными пользователя (использовать при открытии для подстановки данных)
            name: this._name.textContent,
            description: this._textContent

        } 
    }

    setUserInfo(values) {
        //принимает новые данные пользователя и добавляет их на страницу
        this._name.textContent = values.name;
        this._description.textContent = values.description;


    }
}