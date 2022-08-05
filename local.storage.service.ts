export default class LocalStorageService{
    constructor(){

    }

    updateElement(key: string, value: any){
        localStorage.setItem(key,JSON.stringify(value));
    }
    getElement(key: string):any{
        if(localStorage.getItem(key)!= null){
            return JSON.parse(localStorage.getItem(key) as string);
        }
    }
}
