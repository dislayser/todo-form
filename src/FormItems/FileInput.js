import { Color } from "../UI/Color.js";
import { Case } from "./Case.js";


export class FileInput{
    static fieldSizes = [
        ["form-control"],
        ["form-control", "form-control-sm"],
        ["form-control", "form-control-lg"]
    ];

    constructor(item){
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
            case "accept":
                this.input.attr(key, value);
                break;
            case "field_size":
                const sizes = FileInput.fieldSizes;
                sizes.forEach(element => { this.input.removeClass(element); });
                this.input.addClass(sizes[value]);
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
                this.input.val(value);
                break;
            case "multiple":
                if (value) {
                    this.input.attr(key, value);
                } else {
                    this.input.removeAttr(key);
                }
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
            case "accept":
                value = this.input.attr(key);
                break;
            case "field_size":
                const sizes = FileInput.fieldSizes;
                value = 0;
                if (this.input.hasClass(sizes[1][1])){ value = 1; }
                if (this.input.hasClass(sizes[2][1])){ value = 2; }
                break;
            case "required":
                value = this.input.attr(key) === key;
                break;
            case "disabled":
                value = this.input.attr(key) === key;
                break;
            case "value":
                value = this.input.val();
                break;
            case "multiple":
                value = this.input.attr(key) !== undefined;
                break;
        }
        if (value === undefined) {value = null;}
        return value;
    }

    getAll(inputs = ["name", "id", "label_text", "required", "field_size", "value", "accept", "size", "disabled", "multiple"]){
        let data = {};
        data["_type"] = this.item.data("item-type");
        inputs.forEach( input => {
            data[input] = this.get(input);
        })
        return data;
    }

    getConfigInputs(){
        const sizes = FileInput.fieldSizes;
        // Создание инпутов
        let required_checkbox_label = $("<label>").addClass("form-check-label").attr("for", "checkbox_required").text("Required");
        let required_checkbox = $("<input>").addClass("form-check-input").attr({
            name : "required",
            type : "checkbox",
            value : "1",
            id : "checkbox_required"
        });
        required_checkbox.prop("checked", this.get("required"));

        let multiple_checkbox_label = $("<label>").addClass("form-check-label").attr("for", "checkbox_multiple").text("Несколько файлов");
        let multiple_checkbox = $("<input>").addClass("form-check-input").attr({
            name : "multiple",
            type : "checkbox",
            value : "1",
            id : "checkbox_multiple"
        });
        multiple_checkbox.prop("checked", this.get("multiple"));

        let disabled_checkbox_label = $("<label>").addClass("form-check-label").attr("for", "checkbox_disabled").text("Выключить");
        let disabled_checkbox = $("<input>").addClass("form-check-input").attr({
            name : "disabled",
            type : "checkbox",
            value : "1",
            id : "checkbox_disabled"
        });
        disabled_checkbox.prop("checked", this.get("disabled"));

        let required_input = $("<div>").addClass("form-check").append([required_checkbox, required_checkbox_label]);
        let multiple_input = $("<div>").addClass("form-check").append([multiple_checkbox, multiple_checkbox_label]);
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

        let accept_input = $("<input>").addClass(["form-control", "form-control-sm"]).attr({
            name : "accept",
            type : "text",
            placeholder : "Тип файла",
            value : this.get("accept")
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

        // Ивенты
        required_checkbox.on("input", () => {
            this.set("required", required_checkbox.is(':checked'))
        });
        multiple_checkbox.on("input", () => {
            this.set("multiple", multiple_checkbox.is(':checked'))
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
        accept_input.on("input", () => {
            this.set("accept", accept_input.val())
        });
        field_size_select.on("input", () => {
            this.set("field_size", field_size_select.val())
        })

        // Возврат формы с инпутами
        return [
            Case.add(required_input),
            // Case.add(multiple_input),
            Case.add(label_input),
            Case.add(name_input),
            Case.add(id_input),
            Case.add(field_size_select),
            Case.add(size_input),
            Case.add(accept_input),
            Case.add(disabled_input),
        ];
    }

    new({name="", id="", size=6, label_text="Поле с файлом", accept = "image/jpeg, image/png, image/gif", field_size = 0, required = true, disabled = false, value = "", multiple = false} = {}){
        this.input = $("<input>").attr("type", "file");
        this.label = $("<label>").addClass("form-label");

        this.item = Case.add([this.label, this.input], size);

        this.set("name", name);
        this.set("id", id);
        this.set("size", size);
        this.set("label_text", label_text);
        this.set("accept", accept);
        this.set("field_size", field_size);
        this.set("required", required);
        this.set("disabled", disabled);
        this.set("value", value);
        this.set("multiple", multiple);


        return this.item;
    }
}