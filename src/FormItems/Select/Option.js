export class Option{
    constructor(val, text = null){
        this.item = $("<option>");
        if (val) {
            this.item.val(val);
        }
        if (text){
            this.item.text(text);
        }

    }

    getItem(){
        return this.item;
    }
}