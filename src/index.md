---
layout: 'layouts/page.html'
title: Word Frequency by Bible Chapter
description: The most common words in every chapter of the Bible
displayTitle: The most common words in every chapter of the Bible
---

<nav class="testament-navigation" aria-label="testament navigation" id="books">
{% for testament, books in ordered %}
<article>
<h2 id="{{ testament | lower }}">{{ testament }} Testament</h2>
{% for book in books -%}
<a href="{{ book | slug | url }}/">{{ book }}</a>
{% endfor -%}
</article>
{% endfor %}
</nav>
