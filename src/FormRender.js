import $ from 'jquery';
import { ItemsConfig } from "./Config/ItemsConfig.js";
import Uniqid from './Helper/Uniqid.js';

export default class FormRender{
    static default_id_for_builder = "bootstrap-form-builder";
    constructor(data, placement){
        this.itemsUniqID = ["datalist", "text", "textarea", "date", "file", "password", "checkbox", "select", "number", "datetime"];
        this.data = data;
        this.placement = placement;
        this.classes = ItemsConfig.getKeys("obj");
    }


    // Для редеринга формы
    render(){
        let render = [];
        this.data.forEach(item_data => {
            let item_type = item_data["_type"];
            if (this.classes[item_type]){
                const data = {...item_data};

                if (this.itemsUniqID.includes(item_type)){
                    if (!data["id"]) data["id"] = Uniqid.get(item_type + "-");
                }
                let instance = new this.classes[item_type](null);
                let item_render = instance.new(data);

                item_render = this.fix(item_type, instance);

                render.push(item_render);
            }
        });

        if(this.placement){
            this.placement.append(render);
        }
        return render;
    }

    // Для исправления рендера
    fix(item_type, item){
        switch (item_type){
            case "hidden":
                item = item.input.attr("type", "hidden");
                break;
            case "div":
                item = item.item.removeClass(["p-3", "bg-secondary"]);
                break;
            case "part":
                let data = item.data;
                item = item.item.removeClass(["p-3", "bg-secondary"]).addClass("row g-3");
                let form_id = item.attr("data-formrender");
                
                if (data){ // Если уже имеются полученные данные
                    let form = new FormRender(data);
                    item.append(form.render());
                }else{
                    if (form_id){
                        const ajax_uri_forms = "/get/forms";
                        $.ajax({
                            url : ajax_uri_forms,
                            data : { id: form_id },
                            success : data => {
                                let form = new FormRender(data.data);
                                item.append(form.render());
                            }
                        });
                    };
                }
                break;
            case "hr":
                item = item.hr;
                break;
            default:
                item = item.item;
                break;
        }
        return item; 
    }

    getData(){
        return this.data;
    }
}