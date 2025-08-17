import $ from 'jquery';
// Элементы для обьектов
import { Button } from './../FormItems/Button.js';
import { Header } from './../FormItems/Header.js';
import { Paragraph } from '../FormItems/Paragraph.js';
import { HorizontalLine } from '../FormItems/HorizontalLine.js';
import { TextInput } from './../FormItems/TextInput.js';
import { NumberInput } from '../FormItems/NumberInput.js';
import { DateInput } from '../FormItems/DateInput.js';
import { DateTimeInput } from '../FormItems/DateTimeInput.js';
import { FileInput } from '../FormItems/FileInput.js';
import { HiddenInput } from '../FormItems/HiddenInput.js';
import { Textarea } from '../FormItems/Textarea.js';
import { Checkbox } from '../FormItems/Checkbox.js';
import { Div } from '../FormItems/Div.js';
import { Datalist } from '../FormItems/Datalist.js';
import { Select } from '../FormItems/Select.js';
import { PasswordInput } from '../FormItems/PasswordInput.js';
import { Part } from '../FormItems/Part.js';

export class ItemsConfig{
    static items = {
        "header" : {
            "icon" : $("<i>").addClass("bi-type-h1"),
            "obj" : Header,
            "text" : "Заголовок",
            "params" : {
                size : 12,
                text : "Заголовок",
                color : "",
                item_type : "h1"
            }
        },
        "paragraph" : {
            "icon" : $("<i>").addClass("bi-fonts"),
            "obj" : Paragraph,
            "text" : "Параграф",
            "params" : {
                text : "Параграф",
                align : 0,
                color : "",
                size : 12
            }
        },
        "text" : {
            "icon" : $("<i>").addClass("bi-input-cursor"),
            "obj" : TextInput,
            "text" : "Текстовое поле",
            "params" : {
                placeholder : "Текстовое поле",
                size : 6,
                required : false,
                label_text : "Текстовое поле",
                id : "",
                name : "",
                field_size : 0,
                maxlength : null
            }
        },
        "number" : {
            "icon" : $("<i>").addClass("bi-123"),
            "obj" : NumberInput,
            "text" : "Числовое поле",
            "params" : {
                placeholder : "Числовое поле",
                size : 6,
                required : false,
                label_text : "Числовое поле",
                id : "",
                name : "",
                field_size : 0,
                min : null,
                max : null,
                step : null,
            }
        },
        "textarea" : {
            "icon" : $("<i>").addClass("bi-textarea-resize"),
            "obj" : Textarea,
            "text" : "Большое поле",
            "params" : {
                placeholder : "Большое поле",
                size : 12,
                required : false,
                rows : 3,
                label_text : "Большое поле",
                id : "",
                name : "",
                field_size : 0,
                maxlength : null
            }
        },
        "date" : {
            "icon" : $("<i>").addClass("bi-calendar-date"),
            "obj" : DateInput,
            "text" : "Поле с датой",
            "params" : {
                placeholder : "Поле с датой",
                size : 6,
                required : false,
                label_text : "Поле с датой",
                id : "",
                name : "",
                field_size : 0,
                min : null,
                max : null,
                step : null,
            }
        },
        "datetime" : {
            "icon" : $("<i>").addClass("bi-clock"),
            "obj" : DateTimeInput,
            "text" : "Дата и время",
            "params" : {
                placeholder : "Поле с датой и временем",
                size : 6,
                required : false,
                label_text : "Поле с датой и временем",
                id : "",
                name : "",
                field_size : 0,
                min : null,
                max : null,
                step : null,
            }
        },
        "file" : {
            "icon" : $("<i>").addClass("bi-file-earmark"),
            "obj" : FileInput,
            "text" : "Поле с файлом",
            "params" : {
                placeholder : "Поле с файлом",
                size : 6,
                required : false,
                label_text : "Поле с файлом",
                id : "",
                name : "",
                field_size : 0,
                accept : ".jpeg, .png",
                disabled : false
            }
        },
        "checkbox" : {
            "icon" : $("<i>").addClass("bi-check-square"),
            "obj" : Checkbox,
            "text" : "Галочка",
            "params" : {
                size : 6,
                required : false,
                disabled : false,
                value : false,
                label_text : "Галочка",
                id : "",
                name : ""
            }
        },
        "select" : {
            "icon" : $("<i>").addClass("bi-list-task"),
            "obj" : Select,
            "text" : "Список",
            "params" : {
                placeholder : "Список",
                size : 6,
                required : false,
                label_text : "Список",
                id : "",
                name : "",
                field_size : 0,
            }
        },
        "datalist" : {
            "icon" : $("<i>").addClass("bi-list"),
            "obj" : Datalist,
            "text" : "Даталист",
            "params" : {
                placeholder : "Даталист",
                size : 6,
                required : false,
                label_text : "Даталист",
                id : null,
                name : "",
                maxlength : null,
                field_size : 0
            }
        },
        "hidden" : {
            "icon" : $("<i>").addClass("bi-dash-square-dotted"),
            "obj" : HiddenInput,
            "text" : "Скрытое поле",
            "params" : {
                required : false,
                id : "",
                name : "",
                value : null,
                disabled : false
            }
        },
        "button" : {
            "icon" : $("<i>").addClass("bi-app"),
            "obj" : Button,
            "text" : "Кнопка",
            "params" : {
                item_type : "button",
                size : 12,
                text : "Кнопка",
                id : "",
                name : "",
                color : "primary"
            }
        },
        "password" : {
            "icon" : $("<i>").addClass("bi-key"),
            "obj" : PasswordInput,
            "text" : "Поле с паролем",
            "params" : {
                placeholder : "Поле с паролем",
                size : 6,
                required : false,
                label_text : "Поле с паролем",
                id : "",
                name : "",
                field_size : 0,
                maxlength : null
            }
        },
        "hr" : {
            "icon" : $("<i>").addClass("bi-dash"),
            "obj" : HorizontalLine,
            "text" : "Горизонтальная линия",
            "params" : {
                size : 12,
            }
        },
        "div" : {
            "icon" : $("<i>").addClass("bi-border"),
            "obj" : Div,
            "text" : "Блок",
            "params" : {
                id : "",
                size : 12,
            }
        },
        "part" : {
            "icon" : $("<i>").addClass("bi-border"),
            "obj" : Part,
            "text" : "Часть формы",
            "params" : {
                id : "",
                size : 12,
                formrender : "",
            }
        }
    }

    static get(keys){
        keys = keys.split(".");

        let value = this.items;
        for (var key in keys){
            if (value[keys[key]]){
                value = value[keys[key]];
            }else{
                return null;
            }
        }

        return value;
    }

    static getKeys(param){
        let keys = {};
        for (var key in this.items){
            if (this.items[key][param]){
                keys[key] = this.items[key][param];
            }
        }
        return keys;
    }

    static getItemsNames(){
        return Object.keys(this.items);
    }

    static getConfig(key){
        if (this.items[key]){
            return this.items[key]
        }
        return null;
    }

    static getList(){
        return this.items;
    }
}