import Uniqid from "../Helper/Uniqid";

export class Modal{
    static modalSizes = {
        "sm" : "modal-sm",
        "" : "",
        "lg" : "modal-lg",
        "xl" : "modal-xl",
        "fullscreen" : "modal-fullscreen"
    };

    constructor(content = [], header = "Modal", {id = null,  size = "", scrollable = true, centred = true, backdrop = null, scroller = false} = {}){
        if (id){
            this.id = id;
            if ($(".modal#" + this.id).length > 0){
                this.modal = $(".modal#" + this.id);
            }else{
                this.modal = null;
            }
        } else {
            this.id = this.getId();
            this.modal = null;
        } 
        this.header = header;
        this.content = content;
        this.backdrop = backdrop
        this.scroller = scroller;
        
        this.size = size;
        this.scrollable = scrollable;
        this.centred = centred;

        this.modalClasses = ["modal-dialog"];
        if (Modal.modalSizes[size]){
            this.modalClasses.push(Modal.modalSizes[size]);
        }
        if (scrollable){
            this.modalClasses.push("modal-dialog-scrollable");
        }
        if (centred){
            this.modalClasses.push("modal-dialog-centered");
        }
    }

    getId(){
        if (!this.id){
            this.id = Uniqid.get("modal-");
        }
        return this.id;
    }

    // Для установки контента
    setContent(content){
        this.content = content;

        if(this.modal){
            this.bodyContent().empty();
            this.bodyContent().append(this.content);
        }
    }

    // Указание элемента который будет показывать кнопку
    control(item){
        item.attr({
            "data-bs-toggle" : "modal",
            "data-bs-target" : "#" + this.getId()
        });
    }

    controlClose(item){
        item.attr({
            "data-bs-dismiss" : "modal",
            "aria-label" : "Close"
        })
    }

    // Для показа модала
    show(){
        // if (!this.modal.length > 0) return;
        // const bsModal = new bootstrap.Modal(this.modal[0]);
        // bsModal.show();
        // return;
        this.modal.prop("aria-hidden");
        this.modal.attr("role", "dialog");
        this.modal.attr("aria-modal", "true");
        this.modal.modal("show");
    }
    isShow(){
        return this.modal.hasClass("show");
    }
    hide(){
        // if (!this.modal.length > 0) return;
        // const bsModal = bootstrap.Modal.getInstance(this.modal[0]);
        // bsModal.hide();
        // return;
        this.modal.prop("role");
        this.modal.prop("aria-modal");
        this.modal.attr("aria-hidden", "true");
        this.modal.modal("hide");
    }
    close(){
        this.hide();
    }

    headerContent(){
        return this.modal.find(".modal-header");
    }
    bodyContent(){
        return this.modal.find(".modal-body");
    }
    footerContent(){
        return this.modal.find(".modal-footer");
    }
    modalContent(){
        return this.modal.find(".modal-content");
    }

    // Custom UI
    addAutoScroller(){
        let scroller = this.modal.find("#autoScroller");
        if (!scroller.length > 0){
            const inner = $("<div>").addClass("fixed-bottom p-3 text-center");
            scroller = $("<div>")
                .addClass(["position-fixed", "top-50", "start-0", "translate-middle-y", "vh-100", "d-none", "d-lg-inline"])
                .attr("id", "autoScroller")
                .css({
                    "width" : "100px",
                    "opacity" : "0.25"
                })
                .append(inner);
            scroller.on({
                mouseenter: (e) => { // При наведении
                    let hovered = $(e.currentTarget);
                    hovered.addClass("bg-secondary");
                },
                mouseleave: (e) => { // При убирании
                    let hovered = $(e.currentTarget);
                    hovered.removeClass("bg-secondary");
                },
            });
            let scrollPossition = {
                start : 0,
                last : 0,
            }

            const starting = 500; // пять скоролов

            scroller.on("click", () => {
                const modalBody = this.bodyContent()[0];
                if (!modalBody) return;
                console.log(this.bodyContent())

                if (modalBody.scrollTop < starting){
                    inner.text("Вниз").addClass("fixed-bottom");
                    modalBody.scrollTo({
                        top: scrollPossition.last,
                        behavior: "smooth"
                    });
                }else if(modalBody.scrollTop >= starting){
                    inner.text("Вверх").removeClass("fixed-bottom");
                    scrollPossition.last = modalBody.scrollTop;
                    modalBody.scrollTo({
                        top: scrollPossition.start,
                        behavior: "smooth"
                    });
                }
            });
            this.bodyContent().on("scroll", () => {
                const modalBody = this.bodyContent()[0];
                if (modalBody.scrollTop < starting){
                    inner.text("Вниз").addClass("fixed-bottom");
                }else if(modalBody.scrollTop >= starting){
                    inner.text("Вверх").removeClass("fixed-bottom");
                }
            })
            this.modal.append(scroller);
        }
    }

    new(){
        if (this.modal) return;

        const closeModalBtn = $("<button>").addClass(["btn", "btn-secondary"]).text("Отмена");
        const x_closeModalBtn = $("<button>").addClass("btn-close").attr("data-bs-dismiss", "modal").attr("aria-label", "Close");
        let currentShowModal =  $("div.modal.show");
        if (currentShowModal.length > 0){
            closeModalBtn.on("click", () => {
                currentShowModal.modal("show");
            })
            x_closeModalBtn.on("click", () => {
                currentShowModal.modal("show");
            })
        }
        closeModalBtn.attr("data-bs-dismiss", "modal");
        
        this.modal = $("<div>").addClass(["modal", "fade"])
        .attr({
            "id": this.id,
            // "role" : "dialog",
            "tabindex" : "-1",
            "aria-hidden" : "true",
            "aria-labelledby" : this.id + "-Label",
        }).append(
            $("<div>").addClass(this.modalClasses).append(
                $("<div>").addClass("modal-content").append([
                    $("<div>").addClass("modal-header").append([
                        $("<h5>").addClass("modal-title").text(this.header),
                        x_closeModalBtn
                    ]),
                    $("<div>").addClass("modal-body").append(this.content),
                    // $("<hr>").addClass("my-0"),
                    // $("<div>").addClass("modal-body").append(this.content),
                    $("<div>").addClass("modal-footer").append(
                        closeModalBtn
                    )
                ])
            )
        );

        // backdrop="static" - будет закрыть модалку если клинуть в темное место модалки
        if(this.backdrop) this.modal.attr("data-bs-backdrop", this.backdrop);
        if(this.scroller) this.addAutoScroller();
        
        $("body").append(this.modal);
    }
}