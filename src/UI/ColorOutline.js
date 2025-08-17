export class ColorOutline{
    static colors = [
        "",
        "primary",
        "danger",
        "warning",
        "success",
        "info",
        "secondary",
        "dark",
        "light",
        "outline-primary",
        "outline-danger",
        "outline-warning",
        "outline-success",
        "outline-info",
        "outline-secondary",
        "outline-dark",
        "outline-light"
    ]
    static btn(name){
        if (name && this.colors.includes(name)){
            return "btn-" + name;
        }
        return "";
    }

    static getColors(){
        return this.colors;
    }
}