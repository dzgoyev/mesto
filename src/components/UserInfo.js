export default class UserInfo {
    constructor({name, job, api}, avatar) {
        this._name = name;
        this._job = job;
        this._api = api;
        this._avatar = avatar;
        
    }

    getUserInfo() {
        return { // возвращает объект с данными пользователя (использовать при открытии для подстановки данных)
            name: this._name.textContent,
            job: this._job.textContent

        } 
    }

    setUserInfo(data) {
        //принимает новые данные пользователя и добавляет их на страницу 
        // this._name.textContent = values.name;
        // this._job.textContent = values.job;
        return this._api.editProfile(data);
       
    }

    getUserAvatar() {
        return {
            link: this._avatar.getAttribute('src') //получить значение
        }
    }

    editUserAvatar(data) {
        return this._api.avatar(data)
    }

    getUserProfile() {
        return this._api.getUserInfo().then(data => {
            this._name.textContent = data.name;
            this._job.textContent =  data.about;
            this._avatar.setAttribute('src', data.avatar);
            return data._id
        })
    }

}