import { Uniqid } from "../../app/Uniqid.js";
import { Case } from "./Case.js";

export class Div{
    constructor(item = null){
        this.item = item;
        this.div = null;
    }

    set(key, value){
        switch (key) {
            case "id":
                this.item.attr(key, value);        
                break;
            case "size":
                Case.setSize(this.item, value);        
                break;
            default:
                break;
        }
    }

    get(key){
        let value = null;
        switch (key) {
            case "id":
                value = this.item.attr(key);        
                break;
            case "size":
                value = Case.getSize(this.item);        
                break;
            default:
                break;
        }

        return value;
    }

    getAll(inputs = ["id", "size"]){
        let data = {};
        data["_type"] = this.item.data("item-type");
        inputs.forEach( input => {
            data[input] = this.get(input);
        })
        return data;
    }

    getConfigInputs(){
        let size_input = $("<input>").addClass("form-control form-control-sm").attr({
            name : "size",
            placeholder : "Размер",
            type : "number",
            min : 1,
            max: 12,
            value: this.get("size")
        });
        let id_input = $("<input>").addClass("form-control form-control-sm").attr({
            name : "id",
            placeholder : "ID",
            type : "text",
            value : this.get("id")
        });

        id_input.on("input", () => {
            this.set("id", id_input.val())
        });
        size_input.on("input", () => {
            this.set("size", size_input.val())
        });

        return [
            Case.add(size_input),
            Case.add(id_input)
        ]
    }

    new({id = "", size = 12} = {}) {
        // if (!id) id = Uniqid.get("id-");
        this.item = Case.add([], size);
        this.item.addClass("p-3 bg-secondary");

        this.set("id", id);
        this.set("size", size);

        return this.item;
    }
}