import { Uniqid } from "../../app/Uniqid.js";
import { Color } from "../UI/Color.js";
import { Case } from "./Case.js";
import { Option } from "./Select/Option.js";
import { OptionsEditor } from "./Select/OptionsEditor.js";
import { TextInput } from "./TextInput.js";

export class Select{
    static fieldSizes = [
        ["form-select"],
        ["form-select", "form-select-sm"],
        ["form-select", "form-select-lg"]
    ]
    constructor(item = null){
        this.item = item;
        this.label = null;
        this.select = null;
    }

    set(key, value){
        if (!this.label) this.label = this.item.find("label");
        if (!this.select) this.select = this.item.find("select");

        switch (key){
            case "name":
                if (value){
                    this.select.attr(key, value);
                }else{
                    this.select.prop(key);
                }
                break;
            case "id":
                this.label.attr("for", value);
                this.select.attr(key, value);
                break;
            case "size":
                Case.setSize(this.item, value);
                break;
            case "label_text":
                value ? this.label.show("fast") : this.label.hide("fast");
                this.label.text(value);
                break;
            case "placeholder":
                this.select.attr(key, value);
                break;
            case "maxlength":
                this.select.attr(key, value);
                break;
            case "field_size":
                const sizes = Select.fieldSizes;
                sizes.forEach(element => { this.select.removeClass(element); });
                this.select.addClass(sizes[value]);
                break;
            case "required":
                const redStar = $("<span>").text("*").addClass(Color.text("danger"));
                this.select.attr(key, value);
                value ?
                    this.label.append(redStar) :
                    this.label.find("span").remove();
                break;
            case "disabled" : 
                this.select.attr(key, value);
                break;
            case "value":
                this.select.val(value);
                break;
            case "options":
                this.select.empty();
                value.forEach(option => {
                    option = option.split("::", 2);
                    if (!option[1]){
                        option[1] = null;
                    }
                    this.select.append(new Option(
                        option[0],
                        option[1] ?? option[0]
                    ).getItem());
                });
                break;
        }
    }

    get(key){
        let value = null;
        if (!this.label) this.label = this.item.find("label");
        if (!this.select) this.select = this.item.find("select");

        switch (key){
            case "name":
                value = this.select.attr(key);
                break;
            case "id":
                value = this.select.attr(key);
                break;
            case "size":
                value = Case.getSize(this.item);
                break;
            case "label_text":
                value = this.label.text()
                if (this.get("required")) value = value.slice(0, -1);
                break;
            case "placeholder":
                value = this.select.attr(key);
                break;
            case "maxlength":
                value = this.select.attr(key);
                break;
            case "field_size":
                const sizes = Select.fieldSizes;
                value = 0;
                if (this.select.hasClass(sizes[1][1])){ value = 1; }
                if (this.select.hasClass(sizes[2][1])){ value = 2; }
                break;
            case "required":
                value = this.select.attr(key) === key;
                break;
            case "disabled":
                value = this.select.attr(key) === key;
                break;
            case "value":
                value = this.select.val();
                break;
            case "options" :
                value = [];
                this.select.children().each((index, element) => {
                    element = $(element);
                    let option = [element.val(), element.text()];
                    // option = option.filter(el => {
                    //     return el != '';
                    // })
                    value.push(option.join("::"));
                });
        }
        if (value === undefined) value = null;
        return value;
    }

    getAll(inputs = ["name", "id", "label_text", "required", "field_size", "value", "maxlength", "size", "placeholder", "disabled", "options"]){
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
        let placeholder_input = $("<input>").addClass(sizes[1]).attr({
            name : "placeholder",
            placeholder : "Фоновый текст",
            type : "text",
            value : this.get("placeholder")
        });

        let size_input = $("<input>").addClass(sizes[1]).attr({
            name : "size",
            placeholder : "Размер",
            type : "number",
            min : 1,
            max: 12,
            value: this.get("size")
        });

        let maxlength_input = $("<input>").addClass(["form-control", "form-control-sm"]).attr({
            name : "maxlength",
            placeholder : "Макс. длина",
            type : "number",
            value: this.get("maxlength")
        });

        let field_size_options = () => {
            let items = [];
            items.push($("<option>").val("0").text("Обычный"));
            items.push($("<option>").val("1").text("Малый"));
            items.push($("<option>").val("2").text("Большой"));
            return items;
        }
        let field_size_select = $("<select>").addClass(["form-select", "form-select-sm"]).attr({
            name : "field_size",
            placeholder : "Размер поля",
        }).append(field_size_options);
        field_size_select.val(this.get("field_size"));

        let options_editor = new OptionsEditor(this);
        options_editor.buildEditor();
        options_editor.setData(this.get("options"));

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
        placeholder_input.on("input", () => {
            this.set("placeholder", placeholder_input.val())
        });
        size_input.on("input", () => {
            this.set("size", size_input.val())
        });
        maxlength_input.on("input", () => {
            this.set("maxlength", maxlength_input.val())
        });
        field_size_select.on("input", () => {
            this.set("field_size", field_size_select.val())
        })

        // Возврат формы с инпутами
        return [
            Case.add(required_input),
            Case.add(label_input),
            Case.add(name_input),
            Case.add(id_input),
            Case.add(placeholder_input),
            Case.add(field_size_select),
            Case.add(size_input),
            Case.add(maxlength_input),
            Case.add(disabled_input),
            Case.add(options_editor.editor)
        ];
    }

    new({name="", id="", size=6, label_text="Список", placeholder = "Список", maxlength = null, field_size = 0, required = true, disabled = false, value = "", options = ["Выбор1", "Выбор2", "Выбор3"]} = {}){
        this.select = $("<select>");
        this.label = $("<label>").addClass("form-label");

        this.item = Case.add([this.label, this.select, this.select], size);

        this.set("name", name);
        this.set("id", id);
        this.set("size", size);
        this.set("label_text", label_text);
        this.set("placeholder", placeholder);
        this.set("maxlength", maxlength);
        this.set("field_size", field_size);
        this.set("required", required);
        this.set("disabled", disabled);
        this.set("value", value);
        this.set("options", options);


        return this.item;
    }
}