export class Color{
    static colors = [
        "",
        "primary",
        "danger",
        "warning",
        "success",
        "info",
        "secondary",
        "dark",
        "light"
    ]
    static btn(name){
        if (name && this.colors.includes(name)){
            return "btn-" + name;
        }
        return "";
    }

    static text(name){
        if (name && this.colors.includes(name)){
            return "text-" + name;
        }
        return "";
    }

    static bg(name){
        if (name && this.colors.includes(name)){
            return "bg-" + name;
        }
        return "";
    }

    static border(name){
        if (name && this.colors.includes(name)){
            return "border-" + name;
        }
        return "";
    }

    static getColors(){
        return this.colors;
    }
}