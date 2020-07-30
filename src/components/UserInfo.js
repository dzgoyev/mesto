export default class UserInfo {
    constructor({name, job}, avatar, handleUpdateProfile, handleUpdateAvatar, handleRetrieveUserInfo) {
        this._name = name;
        this._job = job;
        this._avatar = avatar;

        this._handleUpdateProfile = handleUpdateProfile;
        this._handleUpdateAvatar = handleUpdateAvatar;
        this._handleRetrieveUserInfo = handleRetrieveUserInfo;
    }

    getUserInfo() {
        return { // возвращает объект с данными пользователя (использовать при открытии для подстановки данных)
            name: this._name.textContent,
            job: this._job.textContent

        } 
    }

    setUserInfo(data) {
        //принимает новые данные пользователя и добавляет их на страницу 
        return this._handleUpdateProfile(data);
    }

    getUserAvatar() {
        return {
            link: this._avatar.getAttribute('src') //получить значение
        }
    }

    setUserAvatar(data) {
        return this._handleUpdateAvatar(data);
    }

    getUserProfile() {
        return this._handleRetrieveUserInfo();
    }

}