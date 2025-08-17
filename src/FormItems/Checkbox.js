import { Uniqid } from "../../app/Uniqid.js";
import { Color } from "../UI/Color.js";
import { Case } from "./Case.js";
import { TextInput } from "./TextInput.js";

export class Checkbox{
    constructor (item = null){
        this.item = item;
        this.input = null;
        this.label = null;
    }
    
    set(key, value){
        if (!this.input) this.input = this.item.find("input");
        if (!this.label) this.label = this.item.find("label");

        switch (key){
            case "name":
                this.input.attr(key, value);
                break;
            case "id":
                this.label.attr("for", value);
                this.input.attr(key, value);
                break;
            case "size":
                Case.setSize(this.item, value);
                break;
            case "label_text":
                value ? this.label.show("fast") : this.label.hide("fast");
                this.label.text(value);
                break;
            case "required":
                const redStar = $("<span>").text("*").addClass(Color.text("danger"));
                this.input.attr(key, value);
                value ?
                    this.label.append(redStar) :
                    this.label.find("span").remove();
                break;
            case "disabled" : 
                this.input.attr(key, value);
                break;
            case "value":
                this.input.attr("checked", value);
                break;
        }
    }

    get(key){
        let value = null;
        if (!this.input) this.input = this.item.find("input");
        if (!this.label) this.label = this.item.find("label");

        switch (key){
            case "name":
                value = this.input.attr(key);
                break;
            case "id":
                value = this.input.attr(key);
                break;
            case "size":
                value = Case.getSize(this.item);
                break;
            case "label_text":
                value = this.label.text()
                if (this.get("required")) value = value.slice(0, -1);
                break;
            case "required":
                value = this.input.attr(key) === key;
                break;
            case "disabled":
                value = this.input.attr(key) === key;
                break;
            case "value":
                value = this.input.is(":checked");
                break;
        }
        if (value === undefined) {value = null;}
        return value;
    }

    getAll(inputs = ["name", "id", "required", "value", "size", "label_text", "value", "disabled"]){
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


        let label_input = $("<input>").addClass(sizes[1]).attr({
            name : "label_text",
            placeholder : "Заголовок",
            type : "text",
            value : this.get("label_text")
        });

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

        let size_input = $("<input>").addClass(sizes[1]).attr({
            name : "size",
            placeholder : "Размер",
            type : "number",
            min : 1,
            max: 12,
            value: this.get("size")
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
        label_input.on("input", () => {
            this.set("label_text", label_input.val())
        })
        id_input.on("input", () => {
            this.set("id", id_input.val())
        });
        size_input.on("input", () => {
            this.set("size", size_input.val())
        });

        // Возврат формы с инпутами
        return [
            Case.add(required_input),
            Case.add(label_input),
            Case.add(name_input),
            Case.add(id_input),
            Case.add(size_input),
            Case.add(disabled_input)
        ];
    }

    new ({name = "", id = "", size = 6, required = false, disabled = false, label_text = "Галочка", value = false} = {}){
        this.input = $("<input>").addClass("form-check-input").attr("type", "checkbox").attr("value", "1");
        this.label = $("<label>").addClass("form-check-label");

        let div = $("<div>").addClass("form-check").append([this.input,this.label]);
        this.item = Case.add(div, size);
        this.item.addClass(["d-flex", "align-items-end"]);

        this.set("name", name);
        this.set("id", id);
        this.set("size", size);
        this.set("label_text", label_text);
        this.set("required", required);
        this.set("disabled", disabled);
        this.set("value", value);

        return this.item;
    }
}