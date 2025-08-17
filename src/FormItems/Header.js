import { Case } from './Case.js';
import { Color } from './../UI/Color.js';
import { Paragraph } from './Paragraph.js';


export class Header{
    static types = ["h1", "h2", "h3", "h4", "h5", "h6"];
    
    constructor(item = null){
        this.types = Header.types;
        this.item = item;
        this.item_type = "header";
    }

    set(key, value){

        let main = null;
        for (var type of this.types) {
            main = this.item.find(type);
            if (main.length > 0){
                break;
            }
        }

        switch (key){
            case "color" :
                const colors = Color.colors;
                for (var i in colors){
                    main.removeClass(Color.text(colors[i]));   
                }
                main.addClass(Color.text(value));
                break;
            case "text" :
                main.text(value);
                break;
            case "align":
                if (Paragraph.aligns[parseInt(value)]){
                    main.removeClass(Paragraph.aligns);
                    main.addClass(Paragraph.aligns[value])
                }
                break;
            case "size" :
                Case.setSize(this.item, value);
                break;
            case "item_type" :
                if (this.types.includes(value)){
                    main.replaceWith(function() {
                        let newItem = $(`<${value}>`);
                        newItem.html($(this).html());
                        newItem.addClass($(this).attr("class"));
                        return newItem;
                    });
                }
                break;
            default:
                console.log(`Sorry, we are out of.`);
        }
    }

    get(key){
        let value = '';
        let main = null;
        for (var type of this.types) {
            main = this.item.find(type);
            if (main.length > 0){
                break;
            }
        }
        switch (key){
            case "text" :
                value = this.item.text();
                break;
            case "size" :
                value = Case.getSize(this.item);
                break;
            case "item_type" : 
                this.types.forEach(element =>{
                    if (this.item.find(element).length > 0){
                        value = element;
                    }
                });
                break;
            case "align":
                Paragraph.aligns.forEach((element, index) => {
                    if (main.hasClass(element)) {
                        value = index;
                    }
                });
                break;
            case "color":
                Color.colors.forEach(color => {
                    if (main.hasClass(Color.text(color))){
                        value = color;
                    }
                })
                break;
        }

        if (value === undefined) {value = null;}
        return value;
    }

    getAll(inputs = ["item_type", "text", "align", "size", "color"]){
        let data = {};
        data["_type"] = this.item.data("item-type");
        inputs.forEach( input => {
            data[input] = this.get(input);
        })
        return data;
    }

    getConfigInputs(){

        // Создание инпутов
        let size_input = $("<input>").addClass(["form-control", "form-control-sm"]).attr({
            name : "size",
            placeholder : "Размер",
            type : "number",
            min : 1,
            max: 12,
            value: this.get("size")
        });
        
        let text_input = $("<input>").addClass(["form-control", "form-control-sm"]).attr({
            name : "text",
            placeholder : "Текст",
            type : "text",
            value : this.get("text")
        });
        
        let optoions_type = () => {
            let items = [];
            this.types.forEach(element => {
                items.push($("<option>").val(element).text(element))
            });
            return items;
        };
        let type_select = $("<select>").addClass(["form-select", "form-select-sm"]).attr({
            name : "type",
            placeholder : "Тип заголовка",
        }).append(optoions_type);
        type_select.val(this.get("item_type"));

        
        let optoions_color = () => {
            let items = [];
            Color.colors.forEach(element => {
                items.push($("<option>").val(element).text(element))
            });
            return items;
        };
        let color_input = $("<select>").addClass(["form-select", "form-select-sm"]).attr({
            name : "color",
            placeholder : "Цвет текста"
        }).append(optoions_color);
        color_input.val(this.get("color"))

        let optoions_align = () => {
            let items = [];
            Paragraph.aligns.forEach((element, index) => {
                items.push($("<option>").val(index).text(element))
            });
            return items;
        }
        let align_select = $("<select>").addClass(["form-select", "form-select-sm"]).attr({
            name : "align",
            placeholder : "Цвет текста"
        }).append(optoions_align);
        align_select.val(this.get("align"))


        // события для обработки редактивания
        size_input.on("input", () => {
            this.set("size", size_input.val());
        });

        text_input.on("input", () => {
            this.set("text", text_input.val());
        });

        type_select.on("input", () => {
            this.set("item_type", type_select.val());
        });

        color_input.on("input", () => {
            this.set("color", color_input.val());
        });

        align_select.on("input", () => {
            this.set("align", align_select.val());
        });

        // Закидываем инпуты в контейнеры и возвращаем
        return [
            Case.add(size_input),
            Case.add(text_input),
            Case.add(type_select),
            Case.add(color_input),
            Case.add(align_select)
        ]
    }

    new({size = 12, text = "Заголовок", align = 0, item_type = "h1", color = ""} = {}){
        let main;
        if (this.types.includes(item_type)){
            main = $(`<${item_type}>`);
        }else{
            main = $("<h1>");
        }

        // main.addClass(["text-truncate", "text-nowrap"]);

        this.item = Case.add(main, size);
                    
        this.set("size", size);
        this.set("text", text);
        this.set("item_type", item_type);
        this.set("color", color);
        this.set("align", align);

        return this.item;
    }
}