import { Case } from './Case.js';
import { TextInput } from './TextInput.js';

export class HorizontalLine{
    constructor(item = null){
        this.item = item;
        this.hr = null;
    }

    set(key,value){
        switch (key){
            case "size":
                Case.setSize(this.item, value);
                break;
        }
    }

    get(key){
        let value = null;

        switch (key){
            case "size":
                value = Case.getSize(this.item);
                break;
        }
        return value;
    }
    
    getConfigInputs(){
        const sizes = TextInput.fieldSizes;
        let size_input = $("<input>").addClass(sizes[1]).attr({
            name : "size",
            placeholder : "Размер",
            type : "number",
            min : 1,
            max: 12,
            value: this.get("size")
        });

        size_input.on("input", () => {
            this.set("size", size_input.val())
        });

        return [
            // Case.add(size_input),
        ]

    }

    getAll(inputs = ["size"]){
        let data = {};
        data["_type"] = this.item.data("item-type");
        inputs.forEach( input => {
            data[input] = this.get(input);
        })
        return data;
    }
    
    new({size = 12} = {}){
        this.hr = $("<hr>").addClass("mb-0");
        this.item = Case.add(this.hr, size);
        this.set("size", size)
        return this.item;
    }
}