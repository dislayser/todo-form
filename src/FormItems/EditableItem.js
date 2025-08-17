import Uniqid from "../Helper/Uniqid";

export class EditableItem{
    constructor(item, item_type, item_id = null){
        this.item = item;
        this.item_type = item_type;
        if (!item_id){
            this.item_id = Uniqid.get("preview-" + this.item_type + "-");
        }
    }

    appendToolbar(){
        this.item.addClass("position-relative");
        
        const placementClass = "position-absolute top-0 end-0";
    
        const closeBtn = $("<button>")
            .addClass("btn btn-outline-danger py-0 px-1")
            .attr("type", "button")
            .attr("data-close", "1")
            .append(UI.icon("x-lg"))
    
        const upBtn = $("<button>")
            .addClass("btn btn-outline-secondary py-0 px-1")
            .attr("type", "button")
            .append(UI.icon("arrow-left"))
    
        const downBtn = $("<button>")
            .addClass("btn btn-outline-secondary py-0 px-1")
            .attr("type", "button")
            .append(UI.icon("arrow-right"))

        closeBtn.click(() => {
            let block = $(`[data-item-id="${this.item_id}"]`);
            block.hide('fast', function(){
                block.remove();
            });
        });
        upBtn.click(() => {
            let currentBlock = upBtn.closest("[data-item-id]");
            let nextBlock = currentBlock.prev("[data-item-id]");
    
            if (nextBlock.length) {
                currentBlock.insertBefore(nextBlock);
            }
        });
        downBtn.click(() => {
            let currentBlock = downBtn.closest("[data-item-id]");
            let nextBlock = currentBlock.next("[data-item-id]");
    
            if (nextBlock.length) {
                currentBlock.insertAfter(nextBlock);
            }
        });

        const toolbar = $("<div>").addClass(placementClass)
            .attr("id", "toolbar")
            .append(
                $("<div>").addClass("btn-group me-2").attr("role", "group").append([
                    upBtn,
                    downBtn,
                    closeBtn
                ])
            );

        toolbar.hide();

        this.item.append(toolbar);
    }

    setItemType(item_type){
        this.item.attr("data-item-type", item_type);
    }

    setItemId(item_id){
        this.item.attr("data-item-id", item_id);
    }

    getItem(){
        this.setItemType(this.item_type);
        this.setItemId(this.item_id);
        this.appendToolbar()
        return this.item;
    }
}