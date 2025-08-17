export default class Uniqid{
    constructor(){}

    static get(prefix = "", suffix = ""){
        const randomString = Math.random().toString(36).substr(2, 9); // случайная строка из 9 символов
        const timestamp = Uniqid.time();
        return `${prefix}${timestamp}${randomString}${suffix}`;
    }

    static time(){
        const timestamp = Math.floor(Date.now() / 1000).toString(36); // текущее время в секундах в виде строки в 36-ричной системе
        return timestamp;
    }
}