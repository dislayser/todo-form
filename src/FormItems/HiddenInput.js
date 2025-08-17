import { Uniqid } from "../../app/Uniqid.js";
import { Case } from "./Case.js";
import { TextInput } from "./TextInput.js";

export class HiddenInput{
    constructor(item){
        this.item = item;
        this.input = null;
    }
    set(key, value){
        if (!this.input) this.input = this.item.find("input");
        if (key == "value"){
            this.input.val(value);    
        }else{
            this.input.attr(key, value);
        }
        if (key == "name"){
            this.input.attr("placeholder", value);
        }
    }

    get(key){
        if (!this.input) this.input = this.item.find("input");
        let value = null;
        if (key == "value"){
            value = this.input.val();
        }else{
            value = this.input.attr(key);
        }
        if (value === undefined) {value = null;}
        return value;
    }

    getAll(inputs = ["name", "id", "required", "value", "disabled"]){
        let data = {};
        data["_type"] = this.item.data("item-type");
        inputs.forEach( input => {
            data[input] = this.get(input);
        })
        return data;
    }

    getConfigInputs(){
        const sizes = TextInput.fieldSizes;
        // Создание инпутов
        let required_checkbox_label = $("<label>").addClass("form-check-label").attr("for", "checkbox_required").text("Required");
        let required_checkbox = $("<input>").addClass("form-check-input").attr({
            name : "required",
            type : "checkbox",
            value : "1",
            id : "checkbox_required"
        });
        required_checkbox.prop("checked", this.get("required"));

        let disabled_checkbox_label = $("<label>").addClass("form-check-label").attr("for", "checkbox_disabled").text("Выключить");
        let disabled_checkbox = $("<input>").addClass("form-check-input").attr({
            name : "disabled",
            type : "checkbox",
            value : "1",
            id : "checkbox_disabled"
        });
        disabled_checkbox.prop("checked", this.get("disabled"));

        let required_input = $("<div>").addClass("form-check").append([required_checkbox, required_checkbox_label]);
        let disabled_input = $("<div>").addClass("form-check").append([disabled_checkbox, disabled_checkbox_label]);

        let name_input = $("<input>").addClass(sizes[1]).attr({
            name : "name",
            placeholder : "Имя",
            type : "text",
            value : this.get("name")
        });

        let id_input = $("<input>").addClass(sizes[1]).attr({
            name : "id",
            placeholder : "ID",
            type : "text",
            value : this.get("id")
        });

        // Ивенты
        required_checkbox.on("input", () => {
            this.set("required", required_checkbox.is(':checked'))
        });
        disabled_input.on("input", () => {
            this.set("disabled", disabled_checkbox.is(':checked'))
        });
        name_input.on("input", () => {
            this.set("name", name_input.val())
        });
        id_input.on("input", () => {
            this.set("id", id_input.val())
        });

        // Возврат формы с инпутами
        return [
            Case.add(required_input),
            Case.add(name_input),
            Case.add(id_input),
            Case.add(disabled_input)
        ];
    }

    new({name = "", id = "", required = false, disabled = false, value = null} = {}){
        // if (!id) id = Uniqid.get("hidden-");
        this.input = $("<input>").attr("type", "text").addClass("form-control");

        this.item = Case.add(this.input, 12);

        this.set("name", name);
        this.set("id", id);
        this.set("required", required);
        this.set("disabled", disabled);
        this.set("value", value);

        return this.item;
    }
}