import $ from 'jquery';
import { AppConfig } from './Config/AppConfig.js';
import { ItemsConfig } from './Config/ItemsConfig.js';
import { EditableItem } from './FormItems/EditableItem.js';
import { Color } from './UI/Color.js';
import { Modal } from './elements/Modal.js';
import Uniqid from './Helper/Uniqid.js';

export default class FormBuilder{
    constructor(placement){
        // айдишник самого редактора
        // this.id = id;
        this.placement = placement;
        this.id = this.placement.attr("id");
        this.eventsStart = false;
        // айдишники всех контроллеров
        this.controls = AppConfig.getControlsId();

        // Обьекты для создания элементов
        this.classes = ItemsConfig.getKeys("obj");

        this.itemsList = [];
    }

    // Метод постройки редактора
    buildEditor(){
        this.placement.empty();
        // Вставка заголовка
        this.placement.append(this.getHeader());
        this.placement.append(
            $("<div>").addClass("d-md-flex gap-2 w-100").append(
                $("<div>").addClass("d-flex flex-fill gap-2 order-2 mb-2").append([
                    $("<div>").addClass("flex-fill user-select-none").append(
                        $("<div>").addClass("card").append(this.getEditor()) // Тут элементы
                    ),
                    $("<div>").addClass("sticky-top").append(this.getItems()) // Выборка элементов
                ])
            ).append(
                $("<div>").addClass("order-1").append(
                    $("<div>").addClass("card d-flex sticky-top").css({"width" : "180px"}).append(this.getConfig()) // Настройка элемента формы
                )
            )
        );
        if (!this.eventsStart) this.events();
    }

    // Запуск ивентов
    events(){
        this.eventsStart = true;
        // Добавление нового элемента на редактор
        this.placement.on("click", `[data-type][role="item"]`, (e) => {
            let clicked = $(e.currentTarget);
            let data_type = clicked.attr("data-type");
            
            if (this.classes[data_type]){
                let instance = new this.classes[data_type](null, data_type);
                let params = ItemsConfig.get(data_type + ".params");
                
                this.addToEditor(instance.new(params), data_type);
            }
        });

        // При нажатии на элемент
        this.placement.on("click", `#${this.controls.editor} [data-item-id][data-item-type]`, (e) => {
            // При клике на тулбар
            const target = $(e.target);
            if (target.closest("#toolbar").length > 0) return;

            const selected_classes = "border rounded shadow " + Color.border("warning");
            const clicked = $(e.currentTarget);
            
            if (clicked.hasClass(selected_classes)){
                // Если кликнуть на выделенный элемент
                this.placement.find(`#${this.controls.editor} [data-item-id]`).removeClass(selected_classes);
                this.placement.find(`#${this.controls.config}`).empty();
            }else{
                // Удаление старых
                this.placement.find(`#${this.controls.editor} [data-item-id]`).removeClass(selected_classes);
                // Добавление на кликнутый
                clicked.addClass(selected_classes);
    
                // Показ настроек
                let data_type = clicked.attr("data-item-type");
                let instance = new this.classes[data_type](clicked);
                let config = instance.getConfigInputs()
                this.setConfig(config);
            }
        });

        // При отправке формы
        this.placement.closest("form").on("submit", () => {
            this.submit();
        })

        // Показ тулбара
        this.placement.on({
            mouseenter: (e) => { // При наведении
                let hovered = $(e.currentTarget);
                let toolbar = hovered.find('#toolbar');

                hovered.addClass('rounded shadow');
                toolbar.show(100); 
            },
            mouseleave: (e) => { // При убирании
                let hovered = $(e.currentTarget);
                let toolbar = $(hovered).find('#toolbar');

                if (!hovered.hasClass('border')){
                    hovered.removeClass('rounded shadow');
                }
                toolbar.hide(100); 
            },
        }, `#${this.controls.editor} [data-item-id]`);
    }

    // Создает на месте редактора скрытое поле с данными о форме
    submit(input = null){
        if ($("#" + this.id).children().length == 1) return;
        let allData = this.getData()
        let jsonData = JSON.stringify(allData, null, 4);
        $("#" + this.id).empty();
        
        if (!input){
            input = $("<textarea>").addClass("form-control font-monospace").attr("type", "text").attr("name", "data").attr("rows", "12");
        }
        input.text(jsonData);
        $("#" + this.id).prepend(input);
    }

    // Для получения элемента в редакторе по его data-item-id
    getByItemId(item_id){
        let block = $(`#${this.id} #${this.controls.editor} [data-item-id="${item_id}"]`);
        console.log(block);
        return block;
    }

    // Редактируемые элементы
    getEditor(){
        let editor = $("<div>").addClass("card-body row g-3").attr("id", this.controls.editor);
        editor.sortable();
        this.itemsList = editor;
        return editor;
    }

    // Настройка элементов
    getConfig(){
        return $("<form>").addClass("card-body d-flex flex-wrap flex-md-column gap-2").attr("id", this.controls.config);
    }

    // Элементы
    getItems(){
        let items = $("<div>").addClass("list-group").attr("id", this.controls.items);

        let list = ItemsConfig.getList();
        for (let key in list) {
            // Добавление элементов для выборкиы
            items.append(
                $("<a>").addClass("list-group-item list-group-item-action text-nowrap c-pointer")
                    .attr("data-type", key)
                    .attr("role", "item")
                .append([
                    list[key]["icon"].clone(),
                    $("<span>").addClass("d-none d-sm-inline ms-2").text(list[key]["text"])
                ])
            );
        };
        items.sortable();

        const modalJson = new Modal([], "Данные полей в формате JSON", {
            backdrop : "static"
        });
        modalJson.new();
        modalJson.modal.find(".modal-body").addClass("p-0");
        
        const btnJsonView = $("<button>")
            .addClass("btn btn-primary text-start px-3 mt-1 w-100")
            .attr("type", "button")
            .attr("role", "view")
            .append([
                UI.icon("braces"),
                $("<span>").addClass("d-none d-sm-inline ms-2").text("JSON")
            ]);
        const btnJsonCopy = $("<button>")
            .addClass("btn btn-outline-info")
            .attr("type", "button")
            .text("Copy")
            .prepend(
                UI.icon("copy").addClass("me-1")
            );
        modalJson.footerContent().prepend(btnJsonCopy);
        btnJsonView.on("click", () => {
            modalJson.setContent($("<pre>").addClass("mb-0").append(
                $("<code>").addClass("json").text(JSON.stringify(this.getData(), null, 4))
            ));
            modalJson.show();
            hljs.highlightAll()
        });
        btnJsonCopy.on("click", () => {
            // Копирование let copy_text = $("pre code.json").text() в буфер обмена
            // Показ пуша   
        });
        

        // Кнопка предпросмотра формы
        const modalRender = new Modal([], "Рендер формы", {
            size:"fullscreen",
            backdrop : "static"
        });
        modalRender.new();
        const btnPreview = $("<button>").addClass("btn btn-outline-info text-start px-3 mt-1 w-100")
            .attr("type", "button")
            .attr("role", "view")
        .append([
            UI.icon("eye"),
            $("<span>").addClass("d-none d-sm-inline ms-2").text("Render")
        ]);
        btnPreview.on("click", () => {
            const testForm = $("<form>").addClass("row g-3").append(
                new FormRender(this.getData()).render()
            );
            modalRender.setContent(
                $("<div>").addClass("container col-12 container-md col-xl-7").append(testForm)
            );
            testForm.submit(e => {
                e.preventDefault();
                alert('Форма отправляется!');
                return false;
            });
            modalRender.show();
        });

        return [
            items,
            btnPreview,
            btnJsonView
        ];
    }

    // Заголовок программы
    getHeader(){
        const version = AppConfig.getVersion();
        const title = AppConfig.getName();
        const viewVersion = AppConfig.getViewVersion();

        let header = $('<div>')
            .attr('id', this.controls.header)
            .addClass("border rounded d-flex align-items-center px-3 py-2 mb-2 font-monospace")
            .append(
                $("<b>").addClass("h1 mb-0").text(title)
            );
        if (viewVersion){
            header.find("b").append($("<span>").addClass("ms-3 text-secondary").text("v" + version))
        }
        const confirmInput_id = Uniqid.get("confirm-");
        const confirmInput = $("<input>").addClass("form-check-input").attr({
            "id": confirmInput_id,
            "type" : "checkbox"
        });
        confirmInput.on("input", () => {
            this.submit()
        });
        header.append(
            $("<div>").addClass("ms-auto form-check").append([
                $("<label>").addClass("form-check-label").text("Подтвердить форму").attr("for", confirmInput_id),
                confirmInput,
            ])
        )
        return header
    }

    // Установка полей для настройки поля
    setConfig(inputs){
        $(`#${this.id} #${this.controls.config}`).empty().append(inputs);
    }

    // Метод добавления элемента в редактор
    addToEditor(item, item_type){
        let editable = new EditableItem(item, item_type).getItem();
        editable.hide();
        this.itemsList.append(editable);
        editable.show(100);
    }

    // Для получения данных о редактированных элементах
    getData(){
        let data = [];
        this.itemsList.children().each((index, element) => {
            element = $(element);
            // console.log(element);
            let data_type = element.data("item-type");
            let instance = new this.classes[data_type](element);
            data.push(instance.getAll());
        });
        return data;
    }

    // Для установки редактируемых элементов
    setData(data = []){
        this.itemsList.empty();
        data.forEach(item => {
            let item_type = null
            item["_type"] ? item_type = item["_type"] : alert("Не получилоcь опеределить тип элемента.");
            if (this.classes[item_type]){
                let instance = new this.classes[item_type](null);
                this.addToEditor(instance.new(item), item_type);
            }
        });
    }
}