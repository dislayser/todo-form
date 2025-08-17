export class Size{
    static br = ["", "sm", "md", "lg"];

    static getSizes(breakble = "md"){
        let sizes = [""];
        if (!this.br.includes(breakble)){
            return sizes;
        }
        const className = "col";
        const sizeLimit = 12;

        let size = 1;
        while (size <= sizeLimit){
            let join = [className, breakble, size];
            join = join.filter(function(el) {return el != '';});
            sizes[size] = join.join("-");
            size++;
        }
        return sizes;
    }
}