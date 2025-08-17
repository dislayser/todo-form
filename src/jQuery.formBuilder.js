import FormBuilder from "./FormBuilder";

(function(jQuery) {
    jQuery.fn.formBuilder = function(options) {
        const editor = new FormBuilder(this.first());
        editor.buildEditor();
        return editor;
    }
})(window.$ || window.jQuery || window.Zepto);