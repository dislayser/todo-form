export class Items{
    static getList(){
        return [
            {
                icon : 'type-h1',
                name : 'Заголовок',
                type : 'header'
            },
            {
                icon : 'input-cursor',
                name : 'Текст',
                type : 'text'
            },
            {
                icon : '123',
                name : 'Число',
                type : 'number'
            },
            {
                icon : 'list-task',
                name : 'Список',
                type : 'select'
            },
            {
                icon : 'check-square',
                name : 'Галочка',
                type : 'checkbox'
            },
            {
                icon : 'calendar-date',
                name : 'Дата',
                type : 'date'
            },
            {
                icon : 'app',
                name : 'Кнопка',
                type : 'button'
            },
            {
                icon : 'fonts',
                name : 'Текст',
                type : 'span'
            },
            {
                icon : 'textarea-resize',
                name : 'Большое поле',
                type : 'textarea'
            },
            {
                icon : 'list',
                name : 'Даталист',
                type : 'datalist'
            },
            {
                icon : 'file-earmark',
                name : 'Файл',
                type : 'file'
            },
            {
                icon : 'dash-square-dotted',
                name : 'Скрытое поле',
                type : 'hidden'
            },
            {
                icon : 'dash',
                name : 'hr',
                type : 'hr'
            },
        ];
    }
}