import { Option } from './Option.js';

export class Options{
    constructor(data = []){
        this.data = data;
        this.items = [];
    }

    getItems(){
        for (let i of this.data){
            this.addOption(
                this.createOption(this.data[i])
            );
        }
        return this.items;
    }

    addOption(option){
        this.items.push(option);
    }

    createOption(val, text = null){
        let option = new Option(val, text);
        return option.getItem();
    }
}