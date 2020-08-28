---
layout: "layouts/book.html"
pagination:
  data: chapterCount
  size: 1   
  alias: title
permalink: "{{ title | slug }}/"
---

{% set book = collections.books[title] %}

{% set chapters = chapterCount[title] %}

# {{ title }}

## Chapters
<nav class="chapter-navigation" aria-label="chapter navigation">
{% for i in range(1, chapters + 1) -%}
{% set baseUrl = ('/' + title | slug) | url -%}
<a href="{{ baseUrl }}/{{ i }}">{{ i }}</a>
{% endfor %}
</nav>

