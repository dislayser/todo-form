import { Size } from './../UI/Size.js';
import { Uniqid } from '../../app/Uniqid.js';


export class Case{
    static add(item, size = 12, item_type = null, item_id = null){
        if (!item_id) item_id = Uniqid.get("preview-" + item_type + "-");

        let sizes = Size.getSizes("");

        let block = $("<div>")
            .addClass([sizes[12]])
            .append(item);
        block = Case.setSize(block, size);
        return block;
    }

    static getSize(item){
        let md_sizes = Size.getSizes("md");

        let size = '';

        md_sizes.forEach((value, index)=>{
            if (item.hasClass(value)){
                size = index;
            }
        });

        return size;
    }

    static setSize(item, size=12){
        let md_sizes = Size.getSizes("md");

        item.removeClass(md_sizes);
        item.addClass(md_sizes[size]);

        return item;
    }
}