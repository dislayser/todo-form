# todo-form

[![npm version](https://img.shields.io/npm/v/todo-form)](https://www.npmjs.com/package/todo-form)
[![license](https://img.shields.io/npm/l/todo-form)](LICENSE)
[![github](https://img.shields.io/badge/GitHub-todo--form-181717?logo=github)](https://github.com/dislayser/todo-form)

A jQuery-based drag-and-drop **Form Builder** and **Form Renderer** built on top of Bootstrap 5.

Build forms visually, save them as JSON, and render them anywhere.

---

## Requirements

- [Bootstrap 5](https://getbootstrap.com/) (CSS + JS)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [jQuery](https://jquery.com/) 3.x
- [jQuery UI](https://jqueryui.com/) (for drag-and-drop sorting)

---

## Installation

```bash
npm i todo-form
```
```bash
pnpm add todo-form
```

---

## Usage

### 1. Include dependencies in your HTML

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.min.css">

<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-ui@1/dist/jquery-ui.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
```

### 2. Import the library

```js
import 'todo-form';
```

---

## Form Builder

Create an interactive form builder inside any container element.

```html
<div id="my-builder"></div>
```

```js
const builder = $("#my-builder").formBuilder();
```

The builder renders a full editor UI with a sidebar of available elements, a drag-and-drop canvas, and a configuration panel.

### Get form data

Returns an array of field objects representing the current form state.

```js
const data = builder.getData();
// data is an array, e.g.:
// [{ _type: "text", label_text: "Name", name: "name", required: true, ... }, ...]
```

### Set form data

Load a previously saved form into the builder.

```js
builder.setData(data);
```

### Submit / serialize

When the builder is inside a `<form>`, submitting it replaces the builder UI with a hidden `<textarea name="data">` containing the form JSON. You can also trigger it manually:

```js
builder.submit();
```

---

## Form Render

Render a saved form from JSON data into any container element.

```html
<div id="my-form"></div>
```

```js
const data = [...]; // array from builder.getData()

$("#my-form").formRender(data);
```

The rendered output is a set of Bootstrap 5 form elements ready to use inside a `<form>`.

---

## Data Format

Form data is a JSON array where each object represents one element. Every object must have a `_type` field.

```json
[
  {
    "_type": "header",
    "text": "Registration",
    "size": 12,
    "item_type": "h1",
    "color": ""
  },
  {
    "_type": "text",
    "label_text": "First name",
    "placeholder": "Enter your name",
    "name": "first_name",
    "id": "first_name",
    "size": 6,
    "required": true,
    "field_size": 0,
    "maxlength": null
  },
  {
    "_type": "select",
    "label_text": "Country",
    "name": "country",
    "id": "country",
    "size": 6,
    "required": false,
    "options": ["Russia", "USA", "Germany"]
  },
  {
    "_type": "button",
    "text": "Submit",
    "item_type": "submit",
    "color": "primary",
    "size": 12,
    "id": "",
    "name": ""
  }
]
```

---

## Available Elements

| `_type`      | Description              | Key params |
|--------------|--------------------------|------------|
| `header`     | Heading (h1–h6)          | `text`, `size`, `color`, `item_type` |
| `paragraph`  | Text paragraph           | `text`, `size`, `color`, `align` |
| `text`       | Text input               | `label_text`, `placeholder`, `name`, `id`, `required`, `maxlength` |
| `number`     | Number input             | `label_text`, `placeholder`, `name`, `id`, `required`, `min`, `max`, `step` |
| `textarea`   | Textarea                 | `label_text`, `placeholder`, `name`, `id`, `required`, `rows`, `maxlength` |
| `date`       | Date input               | `label_text`, `name`, `id`, `required`, `min`, `max` |
| `datetime`   | Date + time input        | `label_text`, `name`, `id`, `required`, `min`, `max` |
| `password`   | Password input           | `label_text`, `placeholder`, `name`, `id`, `required`, `maxlength` |
| `file`       | File upload              | `label_text`, `name`, `id`, `required`, `accept`, `disabled` |
| `checkbox`   | Checkbox                 | `label_text`, `name`, `id`, `required`, `disabled`, `value` |
| `select`     | Dropdown select          | `label_text`, `name`, `id`, `required`, `options` |
| `datalist`   | Input with suggestions   | `label_text`, `placeholder`, `name`, `id`, `required`, `options` |
| `hidden`     | Hidden input             | `name`, `id`, `value`, `disabled` |
| `button`     | Button                   | `text`, `item_type`, `color`, `name`, `id` |
| `hr`         | Horizontal line          | `size` |
| `div`        | Empty container block    | `id`, `size` |
| `part`       | Nested form section      | `id`, `size`, `formrender` |

> `size` is a Bootstrap grid column span (1–12). `field_size` controls Bootstrap `form-control-sm/lg` sizing (0 = default).

---

## Full Example

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.min.css">
</head>
<body>
  <div class="container mt-4">
    <div id="builder"></div>
    <button id="save" class="btn btn-success mt-3">Save & Render</button>
    <hr>
    <form id="render-target" class="row g-3 mt-2"></form>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-ui@1/dist/jquery-ui.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"></script>
  <script type="module">
    import 'todo-form';

    const builder = $("#builder").formBuilder();

    $("#save").on("click", () => {
      const data = builder.getData();
      $("#render-target").empty().formRender(data);
    });
  </script>
</body>
</html>
```

---

## Links

- [GitHub](https://github.com/dislayser/todo-form)
- [npm](https://www.npmjs.com/package/todo-form)

---

## License

[MIT](LICENSE)
