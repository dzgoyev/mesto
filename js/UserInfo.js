export default class UserInfo {
    constructor({name, job}) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        return { // возвращает объект с данными пользователя (использовать при открытии для подстановки данных)
            name: this._name.textContent,
            job: this._job.textContent

        } 
    }

    setUserInfo(values) {
        //принимает новые данные пользователя и добавляет их на страницу
        this._name.textContent = values.name;
        this._job.textContent = values.job;
    }
}