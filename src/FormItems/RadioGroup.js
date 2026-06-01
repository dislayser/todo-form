import { Color } from "../UI/Color.js";
import { Case } from "./Case.js";
import { OptionsEditor } from "./Select/OptionsEditor.js";
import { TextInput } from "./TextInput.js";

export class RadioGroup {
    constructor(item = null) {
        this.item = item;
        this.label = null;
        this.radiosDiv = null;
    }

    set(key, value) {
        if (!this.label) this.label = this.item.find("label.form-label").first();
        if (!this.radiosDiv) this.radiosDiv = this.item.find("div.radio-group-items");

        switch (key) {
            case "name":
                this.radiosDiv.find("input[type='radio']").attr("name", value);
                break;
            case "id":
                this.radiosDiv.find(".form-check").each((index, el) => {
                    const input = $(el).find("input");
                    const label = $(el).find("label");
                    const radioId = value ? `${value}-${index}` : "";
                    input.attr("id", radioId);
                    label.attr("for", radioId);
                });
                break;
            case "size":
                Case.setSize(this.item, value);
                break;
            case "label_text":
                value ? this.label.show("fast") : this.label.hide("fast");
                this.label.text(value);
                break;
            case "required": {
                const redStar = $("<span>").text("*").addClass(Color.text("danger"));
                const radios = this.radiosDiv.find("input[type='radio']");
                if (value) {
                    radios.attr("required", "required");
                    this.label.find("span").remove();
                    this.label.append(redStar);
                } else {
                    radios.removeAttr("required");
                    this.label.find("span").remove();
                }
                break;
            }
            case "disabled": {
                const radios = this.radiosDiv.find("input[type='radio']");
                value ? radios.attr("disabled", "disabled") : radios.removeAttr("disabled");
                break;
            }
            case "value":
                this.radiosDiv.find("input[type='radio']").each((i, el) => {
                    $(el).prop("checked", $(el).val() === value);
                });
                break;
            case "inline":
                this.radiosDiv.find(".form-check").toggleClass("form-check-inline", !!value);
                break;
            case "options": {
                const name = this.radiosDiv.find("input[type='radio']").first().attr("name") || "";
                const firstId = this.radiosDiv.find("input[type='radio']").first().attr("id") || "";
                const id = firstId ? firstId.replace(/-\d+$/, "") : "";
                const required = this.radiosDiv.find("input[type='radio']").first().attr("required") === "required";
                const disabled = this.radiosDiv.find("input[type='radio']").first().attr("disabled") === "disabled";
                const inline = this.get("inline");

                this.radiosDiv.empty();
                value.forEach((option, index) => {
                    option = option.split("::", 2);
                    const optionText = option[1] ?? option[0];
                    const optionValue = option[0];
                    const radioId = id ? `${id}-${index}` : "";

                    const input = $("<input>").addClass("form-check-input").attr({
                        type: "radio",
                        name: name,
                        id: radioId,
                        value: optionValue
                    });
                    const label = $("<label>").addClass("form-check-label").attr("for", radioId).text(optionText);
                    const div = $("<div>").addClass("form-check").append([input, label]);

                    if (required) input.attr("required", "required");
                    if (disabled) input.attr("disabled", "disabled");
                    if (inline) div.addClass("form-check-inline");

                    this.radiosDiv.append(div);
                });
                break;
            }
        }
    }

    get(key) {
        let value = null;
        if (!this.label) this.label = this.item.find("label.form-label").first();
        if (!this.radiosDiv) this.radiosDiv = this.item.find("div.radio-group-items");

        switch (key) {
            case "name":
                value = this.radiosDiv.find("input[type='radio']").first().attr("name") || "";
                break;
            case "id": {
                const firstId = this.radiosDiv.find("input[type='radio']").first().attr("id") || "";
                value = firstId ? firstId.replace(/-\d+$/, "") : "";
                break;
            }
            case "size":
                value = Case.getSize(this.item);
                break;
            case "label_text":
                value = this.label.text();
                if (this.get("required")) value = value.replace(/\*$/, "");
                break;
            case "required":
                value = this.radiosDiv.find("input[type='radio']").first().attr("required") === "required";
                break;
            case "disabled":
                value = this.radiosDiv.find("input[type='radio']").first().attr("disabled") === "disabled";
                break;
            case "value":
                value = this.radiosDiv.find("input[type='radio']:checked").val() ?? null;
                break;
            case "inline":
                value = this.radiosDiv.find(".form-check").first().hasClass("form-check-inline");
                break;
            case "options":
                value = [];
                this.radiosDiv.find(".form-check").each((index, el) => {
                    const input = $(el).find("input");
                    const label = $(el).find("label");
                    const optValue = input.val();
                    const optText = label.text();
                    value.push(optText === optValue ? optText : `${optValue}::${optText}`);
                });
                break;
        }
        if (value === undefined) value = null;
        return value;
    }

    getAll(inputs = ["name", "id", "label_text", "required", "disabled", "inline", "value", "size", "options"]) {
        let data = {};
        data["_type"] = this.item.data("item-type");
        inputs.forEach(input => {
            data[input] = this.get(input);
        });
        return data;
    }

    getConfigInputs() {
        const sizes = TextInput.fieldSizes;

        let required_checkbox_label = $("<label>").addClass("form-check-label").attr("for", "checkbox_required").text("Required");
        let required_checkbox = $("<input>").addClass("form-check-input").attr({
            name: "required",
            type: "checkbox",
            value: "1",
            id: "checkbox_required"
        });
        required_checkbox.prop("checked", this.get("required"));

        let disabled_checkbox_label = $("<label>").addClass("form-check-label").attr("for", "checkbox_disabled").text("Выключить");
        let disabled_checkbox = $("<input>").addClass("form-check-input").attr({
            name: "disabled",
            type: "checkbox",
            value: "1",
            id: "checkbox_disabled"
        });
        disabled_checkbox.prop("checked", this.get("disabled"));

        let inline_checkbox_label = $("<label>").addClass("form-check-label").attr("for", "checkbox_inline").text("Горизонтально");
        let inline_checkbox = $("<input>").addClass("form-check-input").attr({
            name: "inline",
            type: "checkbox",
            value: "1",
            id: "checkbox_inline"
        });
        inline_checkbox.prop("checked", this.get("inline"));

        let required_input = $("<div>").addClass("form-check").append([required_checkbox, required_checkbox_label]);
        let disabled_input = $("<div>").addClass("form-check").append([disabled_checkbox, disabled_checkbox_label]);
        let inline_input = $("<div>").addClass("form-check").append([inline_checkbox, inline_checkbox_label]);

        let label_input = $("<input>").addClass(sizes[1]).attr({
            name: "label_text",
            placeholder: "Заголовок",
            type: "text",
            value: this.get("label_text")
        });

        let name_input = $("<input>").addClass(sizes[1]).attr({
            name: "name",
            placeholder: "Имя",
            type: "text",
            value: this.get("name")
        });

        let id_input = $("<input>").addClass(sizes[1]).attr({
            name: "id",
            placeholder: "ID",
            type: "text",
            value: this.get("id")
        });

        let size_input = $("<input>").addClass(sizes[1]).attr({
            name: "size",
            placeholder: "Размер",
            type: "number",
            min: 1,
            max: 12,
            value: this.get("size")
        });

        let options_editor = new OptionsEditor(this);
        options_editor.buildEditor();
        options_editor.setData(this.get("options"));

        required_checkbox.on("input", () => {
            this.set("required", required_checkbox.is(":checked"));
        });
        disabled_input.on("input", () => {
            this.set("disabled", disabled_checkbox.is(":checked"));
        });
        name_input.on("input", () => {
            this.set("name", name_input.val());
        });
        label_input.on("input", () => {
            this.set("label_text", label_input.val());
        });
        id_input.on("input", () => {
            this.set("id", id_input.val());
        });
        size_input.on("input", () => {
            this.set("size", size_input.val());
        });
        inline_checkbox.on("input", () => {
            this.set("inline", inline_checkbox.is(":checked"));
        });

        return [
            Case.add(required_input),
            Case.add(label_input),
            Case.add(name_input),
            Case.add(id_input),
            Case.add(size_input),
            Case.add(disabled_input),
            Case.add(inline_input),
            Case.add(options_editor.editor)
        ];
    }

    new({ name = "", id = "", size = 6, label_text = "Группа радио", required = false, disabled = false, inline = false, value = "", options = ["Вариант 1", "Вариант 2", "Вариант 3"] } = {}) {
        this.label = $("<label>").addClass("form-label");
        this.radiosDiv = $("<div>").addClass("radio-group-items");

        this.item = Case.add([this.label, this.radiosDiv], size);

        this.set("label_text", label_text);
        this.set("options", options);
        this.set("name", name);
        this.set("id", id);
        this.set("size", size);
        this.set("required", required);
        this.set("disabled", disabled);
        this.set("inline", inline);
        this.set("value", value);

        return this.item;
    }
}
