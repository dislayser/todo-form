import FormBuilder from "./FormBuilder";
import FormRender from "./FormRender";

(function(jQuery) {
    jQuery.fn.formBuilder = function(options) {
        const editor = new FormBuilder(this.first());
        editor.buildEditor();
        return editor;
    }
    jQuery.fn.formRender = function(data, selector = null) {
        const render = new FormRender(data, selector = null);
        render.render();
    }
})(window.$ || window.jQuery || window.Zepto);