import { Color } from "../UI/Color.js";
import { Case } from "./Case.js";

export class Paragraph{
    static aligns = ["", "text-start", "text-center", "text-end"];

    constructor(item = null){
        this.item = item;
        this.p = null;
    }

    set(key, value){
        function xss(text) {
            const div = document.createElement('div');
            div.textContent = text; // Все специальные символы будут экранированы
            return div.innerHTML; // Возвращаем экранированный HTML
        }
        if (!this.p) { this.p = this.item.find("p"); }
        switch (key){
            case "text" : 
                const safeText = xss(value).replace(/\n/g, "<br>");
            
                this.p.html(safeText);
                break;
            case "align":
                if (Paragraph.aligns[parseInt(value)]){
                    this.p.removeClass(Paragraph.aligns);
                    this.p.addClass(Paragraph.aligns[value])
                }
                break;
            case "color":
                const colors = Color.colors;
                for (var i in colors){
                    this.p.removeClass(Color.text(colors[i]));   
                }
                this.p.addClass(Color.text(value));
                break;
            case "size" :
                Case.setSize(this.item, value);
                break;
        }
    }

    get(key){
        let value = null ;
        if (!this.p) { this.p = this.item.find("p"); }

        switch (key){
            case "text":
                value = this.p.html().replace(/<br>/g, '\n');;
                break;
            case "align":
                Paragraph.aligns.forEach((element, index) => {
                    if (this.p.hasClass(element)) {
                        value = index;
                    }
                });
                break;
            case "color":
                Color.colors.forEach(color => {
                    if (this.p.hasClass(Color.text(color))){
                        value = color;
                    }
                })
                break;
            case "size":
                value = Case.getSize(this.item);
                break;

        }

        if (value === undefined) {value = null;}
        return value;
    }

    getAll(inputs = ["text", "align", "color", "size"]){
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

        let text_input = $("<textarea>").addClass(["form-control", "form-control-sm"]).text(this.get("text")).attr("rows", 3);
        text_input.on("input", () => {
            this.set("text", text_input.val());
        })

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


        // события для обработки редактивания
        size_input.on("input", () => {
            this.set("size", size_input.val());
        });

        text_input.on("input", () => {
            this.set("text", text_input.val());
        });

        align_select.on("input", () => {
            this.set("align", align_select.val());
        });

        color_input.on("input", () => {
            this.set("color", color_input.val());
        });

        return [
            Case.add(text_input),
            Case.add(size_input),
            Case.add(color_input),
            Case.add(align_select)
        ]
    }

    new({text = "Параграф", align = 0, color = "", size = 12} = {}){
        this.p = $("<p>");
        this.item = Case.add(this.p, size);

        this.set("text", text);
        this.set("align", align);
        this.set("color", color);
        this.set("size", size);

        return this.item;
    }
}