import { ColorOutline } from './../UI/ColorOutline.js';
import { Case } from './Case.js';
import { TextInput } from './TextInput.js';

export class Button{
    static btnSizes = ["", "btn-sm", "btn-lg"];
    static btnTypes = ["button", "submit"];
    constructor(item = null){
        this.item = item;
        this.button = null;
    }

    set(key, value){
        if (!this.button) { this.button = this.item.find("button").first(); } 

        switch (key) {
            case "name":
                if (value){
                    this.button.attr(key, value);                    
                }else{
                    this.button.prop(key);
                }
                break;
            case "id" :
                this.button.attr(key, value);
                break;
            case "disabled":
                this.button.attr(key, value);
                break;
            case "text":
                this.button.text(value);
                break;
            case "tooltip":
                if (value){
                    this.button.attr("data-todo-tooltip", value);
                }else{
                    this.button.prop("data-todo-tooltip");
                }
                break;
            case "item_type":
                if (Button.btnTypes.includes(value)){
                    this.button.attr("type", value);
                }
                break;
            case "size" : 
                Case.setSize(this.item, value);
                break;
            case "btn_size" :
                const btnSizes = Button.btnSizes; 
                this.button.removeClass(btnSizes);
                this.button.addClass(btnSizes[value]);
                break;
            case "color" :
                const colors = ColorOutline.colors;
                for (var i in colors){
                    this.button.removeClass(ColorOutline.btn(colors[i]));   
                }
                this.button.addClass(ColorOutline.btn(value));
                break;
            case "wide" :
                value ? this.button.addClass("w-100") : this.button.removeClass("w-100");
                break;
                
        }
    }

    get(key){
        let value = null;
        if (!this.button) { this.button = this.item.find("button").first(); } 

        switch (key) {
            case "name":
                value = this.button.attr(key);
                break;
            case "id" :
                value = this.button.attr(key);
                break;
            case "disabled":
                value = this.button.attr(key) === key;
                break;
            case "text":
                value = this.button.text();
                break;
            case "item_type":
                value = this.button.attr("type");
                break;
            case "tooltip":
                value = this.button.attr("data-todo-tooltip");
                if (!value) value = null;
                break;
            case "size" : 
                value = Case.getSize(this.item);
                break;
            case "btn_size" :
                const btnSizes = Button.btnSizes; 
                value = 0;
                if (this.button.hasClass(btnSizes[1])) { value = 1}
                if (this.button.hasClass(btnSizes[2])) { value = 2}
                break;
            case "color" :
                ColorOutline.colors.forEach(color => {
                    if (this.button.hasClass(ColorOutline.btn(color))){
                        value = color;
                    }
                })
                break;
            case "wide" :
                value = this.button.hasClass("w-100");
                break;
        }
        return value;
    }

    getAll(inputs = ["name", "id", "text", "item_type", "size", "btn_size", "color", "wide", "tooltip", "disabled"]){
        let data = {};
        data["_type"] = this.item.data("item-type");
        inputs.forEach( input => {
            data[input] = this.get(input);
        })
        return data;
    }

    getConfigInputs(){
        const sizes = TextInput.fieldSizes;
        // Инпуты
        let wide_checkbox_label = $("<label>").addClass("form-check-label").attr("for", "checkbox_wide").text("По длине");
        let wide_checkbox = $("<input>").addClass("form-check-input").attr({
            name : "wide",
            type : "checkbox",
            value : "1",
            id : "checkbox_wide"
        });
        wide_checkbox.prop("checked", this.get("wide"));
        let wide_input = $("<div>").addClass("form-check").append([wide_checkbox, wide_checkbox_label]);

        let disabled_checkbox_label = $("<label>").addClass("form-check-label").attr("for", "checkbox_disabled").text("Выключить");
        let disabled_checkbox = $("<input>").addClass("form-check-input").attr({
            name : "disabled",
            type : "checkbox",
            value : "1",
            id : "checkbox_disabled"
        });
        disabled_checkbox.prop("checked", this.get("disabled"));

        let disabled_input = $("<div>").addClass("form-check").append([disabled_checkbox, disabled_checkbox_label]);

        let text_input = $("<input>").addClass(["form-control", "form-control-sm"]).attr({
            name : "text",
            placeholder : "Текст",
            type : "text",
            value : this.get("text")
        });

        let name_input = $("<input>").addClass(sizes[1]).attr({
            name : "name",
            placeholder : "Имя",
            type : "text",
            value : this.get("name")
        });

        let tooltip_input = $("<input>").addClass(sizes[1]).attr({
            name : "tooltip",
            placeholder : "Всплывающая подсказка",
            type : "text",
            value : this.get("tooltip")
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

        let button_size_options = () => {
            let items = [];
            items.push($("<option>").val("0").text("Обычный"));
            items.push($("<option>").val("1").text("Малый"));
            items.push($("<option>").val("2").text("Большой"));
            return items;
        }
        let button_size_select = $("<select>").addClass(["form-select", "form-select-sm"]).attr({
            name : "btn_size",
            placeholder : "Размер кнопки",
        }).append(button_size_options);
        button_size_select.val(this.get("btn_size"));

        let item_type_options = () => {
            let items = [];
            Button.btnTypes.forEach(type => {
                items.push($("<option>").val(type).text(type));
            })
            return items;
        }
        let item_type_select = $("<select>").addClass(["form-select", "form-select-sm"]).attr({
            name : "item_type",
            placeholder : "Тип кнопки",
        }).append(item_type_options);
        item_type_select.val(
            this.get("item_type")
        );

        let optoions_color = () => {
            let items = [];
            ColorOutline.colors.forEach(element => {
                items.push($("<option>").val(element).text(element))
            });
            return items;
        };
        let color_input = $("<select>").addClass(["form-select", "form-select-sm"]).attr({
            name : "color",
            placeholder : "Цвет текста"
        }).append(optoions_color);
        color_input.val(this.get("color"))

        // Ивенты
        name_input.on("input", () => {
            this.set("name", name_input.val())
        });
        tooltip_input.on("input", () => {
            this.set("tooltip", tooltip_input.val())
        });
        id_input.on("input", () => {
            this.set("id", id_input.val())
        });
        size_input.on("input", () => {
            this.set("size", size_input.val())
        });
        text_input.on("input", () => {
            this.set("text", text_input.val());
        });
        button_size_select.on("input", () => {
            this.set("btn_size", button_size_select.val());
        });
        wide_checkbox.on("input", () => {
            this.set("wide", wide_checkbox.is(':checked'));
        })
        color_input.on("input", () => {
            this.set("color", color_input.val());
        });
        disabled_checkbox.on("input", () => {
            this.set("disabled", disabled_checkbox.is(':checked'));
        });
        item_type_select.on("input", () => {
            this.set("item_type", item_type_select.val());
        });

        return [
            Case.add(wide_input),
            Case.add(item_type_select),
            Case.add(text_input),
            Case.add(color_input),
            Case.add(name_input),
            Case.add(id_input),
            Case.add(size_input),
            Case.add(button_size_select),
            Case.add(tooltip_input),
            Case.add(disabled_input)
        ]
    }

    new({name = "", id = "", text = "Кнопка", size = 12, btn_size = 0, item_type = "button", color = "primary", wide = false, disabled = false, tooltip = null} = {}){
        // if(!id) { id = Uniqid.get("button-"); }
        this.button = $("<button>").addClass(["btn"]);
        this.item = Case.add(this.button, size);
        this.item.addClass(["d-flex", "align-items-center"]);

        this.set("name", name);
        this.set("item_type", item_type)
        this.set("id", id);
        this.set("size", size);
        this.set("btn_size", btn_size);
        this.set("text", text);
        this.set("color", color);
        this.set("wide", wide);
        this.set("tooltip", tooltip);
        this.set("disabled", disabled);

        return this.item
    }
}