# todo-form

Form Builder and Form Render.<br>
This library needs Bootstrap 5 and jQuery.

---

## INSTALL
```bash
npm i todo-form
```
or
```bash
pnpm add todo-form
```

---

## Create builder
```JavaScript
const builder = $("selector").formBuilder();
```

## <u>Get data</u> / <u>Set data</u> from builder
```JavaScript
let data = builder.getData(); // Get data
builder.setData(data);        // Set data
```

## Render form
```JavaScript
$("selector").formRender(data);
```