export class AppConfig{
    static config = {
        "name" : "ToDo Form Builder",
        "version" : "1.2.0",
        "viewVersion" : true,
        "id" : {
            header : 'form-header',
            items  : 'form-items',
            config : 'form-config',
            editor : 'form-editor',
            modal_json : "modal-json",
            modal_render : "modal_render",
        }
    }

    static getViewVersion(){
        return this.config["viewVersion"];
    }

    static getName(){
        return this.config["name"];
    }

    static getVersion(){
        return this.config["version"];
    }

    static getControlsId(){
        return this.config["id"];
    }
}