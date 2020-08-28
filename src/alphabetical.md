---
layout: "layouts/page.html"
title: "Alphabetical books of the Bible"
nav:
    title: 'Alphabetical'
tags: ['nav']
---

{% set books = [ ordered.New, ordered.Old ] | flatten | sort %}

<ol>
    {% for book in books -%}
        <li><a href="../{{ book | slug | url }}/">{{ book }}</a></li>
    {% endfor %}
</ol>