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

    /**
     * @param {string} name 
     * @returns { `btn-${string}` | '' } 
     */
    static btn(name){
        if (name && this.colors.includes(name)){
            return "btn-" + name;
        }
        return "";
    }

    /**
     * @param {string} name 
     * @returns { `text-${string}` | '' } 
     */
    static text(name){
        if (name && this.colors.includes(name)){
            return "text-" + name;
        }
        return "";
    }

    /**
     * @param {string} name 
     * @returns { `bg-${string}` | '' } 
     */
    static bg(name){
        if (name && this.colors.includes(name)){
            return "bg-" + name;
        }
        return "";
    }

    /**
     * @param {string} name 
     * @returns { `border-${string}` | '' } 
     */
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