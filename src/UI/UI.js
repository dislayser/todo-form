import $ from 'jquery';
import { Size } from "./Size.js";

export default class UI{
    /**
     * @param {string} name 
     * @returns {JQuery<HTMLElement>}
     */
    static icon(name){
        if (name){
            return $("<i>").addClass(["bi", "bi-" + name]);
        }
        return [];
    }

    static size(val){
        let md_sizes = Size.getSizes("md");
        let sizes = Size.getSizes("");
        return sizes[12] + " " + md_sizes[val];
    }

    /** @returns {JQuery<HTMLElement>} */
    static requiredStar() {
        return $('<span>').addClass('text-danger').text('*');
    }
}