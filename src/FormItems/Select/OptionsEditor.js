export class OptionsEditor{
    constructor(target){
        this.editor = $("<div>").addClass("d-flex flex-column gap-2");
        this.target = target;
    }

    getData(){
        let data = [];
        let inputs = this.editor.find("input");
        inputs.each((index, input) => {
            input = $(input);
            data.push(input.val());
        })
        return data;
    }

    add(value){
        const btnClose = $("<button>").addClass("btn-close").attr("type", "button").attr("aria-label", "Close");   
        const input = $("<input>").addClass("form-control form-control-sm").attr("type", "text").val(value);
        const block = $("<div>").addClass(["d-flex", "gap-1", "align-items-center"]).append([input, btnClose]);
        this.editor.find("button.btn").before(block);

        input.on("input", () => {
            this.update();
        });
        btnClose.on("click", () => {
            block.remove();
            this.update();
        });
    }

    // Обноваление данных на форме
    update(){
        this.target.set("options", this.getData());
    }

    // Посторой 
    buildEditor(){
        this.editor.empty();
        const btnAdd = $("<button>").addClass("btn btn-sm btn-outline-success w-100").text("Добавить").attr("type", "button");
        const label = $("<span>").text("Список");
        this.editor.append([label, btnAdd]);
        btnAdd.on("click", () => {
            this.add("");
        })
    }

    setData(data){
        data.forEach(value => {
            this.add(value);
        });
    }
}