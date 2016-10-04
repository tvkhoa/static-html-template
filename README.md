Quickly develop static HTML pages with nunjucks templating engine: https://mozilla.github.io/nunjucks/
Support ES6
Easy to config with gulp

### Dependencies
`npm install`


### How to use
#### HTML

##### Layout
Define in `app/templates/layout.nunjucks`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    {% block meta %} {% endblock %}

    {% block css %} {% endblock %}

  </head>
  <body>
    <!-- You write code for this content block in another file -->

    {% block content %} {% endblock %}

    {% block js %} {% endblock %}
  </body>
</html>
```


#### Pages
Your html pages will be defined in `app/pages`. 
Example: Your `app/pages/index.html` will be compiled to `build/index.html`

```
{% set pageName = 'index' %}

{% extends "layout.nunjucks" %}

{% block meta %} 
  {% import 'macros/meta-macro.nunjucks' as meta %}
  {{ meta.basicMeta(data[pageName].meta) }}
{% endblock %}

{% block js %}
  <script src="js/main/alert.js"></script>
{% endblock %}

{% block css %}
  <link rel="stylesheet" href="css/main.css">
{% endblock %}


{% block content %}
  {% include 'partials/image.nunjucks' %}

  {% import 'macros/content-macro.nunjucks' as content %}
  {{ content.render(data[pageName].items) }}
{% endblock %}
```

#### Data
Data defined in `app/data.json`. You can use your data in your pages.


#### Macros and Partials
Macros and Partials defined in `app/templates`


#### CSS
CSS defined in `app/css`

#### Images
Images put in `app/img`

#### JS
Support ES6, defined in `app/js/main`

```
const add = (a, b) => ( a + b);
alert(add(1,2));
```


#### How to use

##### Watch files and build
`npm run build:watch`

##### Deploy http server
`npm install http-server -g`

`http-server -c-1`

Check your page at: http://localhost:8080/build/








