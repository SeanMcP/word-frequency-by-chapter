---
layout: 'layouts/page.html'
title: Word Frequency by Bible Chapter
description: The most common words in every chapter of the Bible
displayTitle: The most common words in every chapter of the Bible
---

<nav class="testament-navigation" aria-label="testament navigation">
{% for testament, books in ordered %}
<article>
<h2>{{ testament }} Testament</h2>
{% for book in books -%}
<a href="{{ book | slug | url }}/">{{ book }}</a>
{% endfor -%}
</article>
{% endfor %}
</nav>

<section id="about">

## Why?

When reading the Bible with my family, I like to pick out a word that my young son should listen for. I want it to be relevant to the passage and common enough to keep him engaged throughout the reading.

While it is sometimes easy to scan a chapter and pick a suitable word, often times it is not. This website makes it easier to find the right word for each chapter of the Bible.

## Why old English?

The computer program behind this website reads every chapter of the Bible and counts the word frequency. The only Bible translations that are free and available to use are in the public domain. I chose the King James Version because it meets that criterion and is still used today.

In my experience, finding the word in my preferred translation has been easy, especially if you are choosing a word that occurs frequently in a chapter.

</section>