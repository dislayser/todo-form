import $ from 'jquery';
import { Size } from "./Size.js";

export default class UI{
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
}