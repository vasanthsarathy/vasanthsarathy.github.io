---
layout: page
permalink: /research/
title: research
description: publications by categories in reversed chronological order. 
nav: true
nav_order: 2
---

My research is in developing and using computational methods involving natural language to enable future AI systems to be more trustworthy, reliable and competent collaborators. I take an interdisciplinary approach by combining social/cognitive science theory, linguistics and AI to develop state-of-the-art neuro-symbolic methods. A full list of my publications can be found [here](publications) and on [Google Scholar](https://scholar.google.com/citations?user=3SeoejIAAAAJ&hl=en)

Broadly, my research falls into three main themes:
1. [Social NLP](#social-nlp)
2. [Reasoning with Social Norms](#reasoning-with-social-norms)
3. [Sense-making and Problem-Solving](#sense-making-and-problem-solving)
<!-- Topics: socialnlp, problemsolving, socialreasoning -->

# Social NLP
In this theme, I explore how NLP techniques, and more generally computational methods can be used to explore and uncover patterns in human social behavior.

<div class="publications">

  {% bibliography --group_by none --query @*[theme=socialnlp]* %}

</div>

# Reasoning with Social Norms
In this theme, I develop computational methods and AI/robotic architectures to use social norms when reasoning about actions and understanding natural language.

<div class="publications">

  {% bibliography --group_by none --query @*[theme=socialreasoning]* %}

</div>
<!-- now I just need to add a field for topic -->

# Sense-making and Problem-Solving
In this theme, I explore how we simplify the complexity of physical and social world (use of knowledge, cognitive biaes, etc.) for the purposes of efficient problem-solving. I develop computational methods and architectures for fast human-like learning and problem solving. 

<div class="publications">

  {% bibliography --group_by none --query @*[theme=problemsolving]* %}

</div>

