---
layout: "layouts/chapter.html"
pagination:
  data: allChapters
  size: 1
  alias: bookAndChapter
permalink: "{{ bookAndChapter | customSlug }}/"
eleventyComputed:
  title: "{{ bookAndChapter | readableBookAndChapter }}"
  description: "The most frequently occurring words in {{ title }} of the Bible"
---

{% set bookTitle = bookAndChapter | bookTitle %}

{% set chapters = chapterCount[bookTitle] %}

# {{ title }}

{% set words = allChapters[bookAndChapter] %}

<ol class="word-list">
{% for word in words %}
<li>{{ word[0] }} ({{ word[1] }})</li>
{% endfor %}
</ol>

<nav aria-label="{{ bookTitle }} chapters" class="contextual-navigation">
{%- set chapterNumber = bookAndChapter | currentChapter -%}
{%- if chapterNumber > 1 or chapterNumber < chapters -%}
<div class="increment">
{%- if chapterNumber > 1 -%}
<a class="chapter-link --previous" href="{{ pagination.href.previous | url }}" aria-label="previous chapter">Previous <span class="desktop-only">chapter</span></a>
{%- endif -%}
{%- if chapterNumber < chapters -%}
<a class="chapter-link --next" href="{{ pagination.href.next | url }}" aria-label="next chapter">Next <span class="desktop-only">chapter</span></a>
{%- endif -%}
</div>
{%- endif -%}
<a href="../">All {{ bookTitle }}</a>
</nav>
