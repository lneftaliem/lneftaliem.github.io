---
permalink: /
title:
layout: home
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<section class="home-hero">

  <div class="home-hero__content">

    <p class="home-eyebrow">Climate + Cities</p>

    <h1>Leona Neftaliem</h1>

    <p class="home-subtitle">
      PhD Candidate at Stanford University
    </p>

    <p class="home-intro">
      I'm an interdisciplinary environmental researcher studying how environmental
      change shapes cities and the people who live in them.
    </p>

    <div class="home-links">
      <a href="#work">Selected Work</a>
      <a href="/files/CV_LN.pdf">CV</a>
      <a href="https://www.linkedin.com/in/leona-neftaliem">LinkedIn</a>
      <a href="https://github.com/lneftaliem">GitHub</a>
    </div>

  </div>

  <div class="home-hero__photo">
    <img src="{{ "/images/LN_KH.png" | relative_url }}" alt="Portrait of Leona Neftaliem">
  </div>

</section>

<section class="home-section" id="about">
  <div class="section-heading">
    <p class="section-eyebrow">About</p>
  </div>

  <div class="home-about">
    <div class="home-about__text">
      <p>I'm currently a PhD candidate in Stanford University's Emmett Interdisciplinary Program in Environment and Resources (E-IPER), advised by <a href="https://fieldlab.stanford.edu">Chris Field</a> and <a href="https://jacksonlab.stanford.edu">Rob Jackson</a>, and a member of <a href="https://socialecology.stanford.edu">Nicole Ardoin's Social Ecology Lab</a>. I'm also a Knight-Hennessy Scholar and National Science Foundation Graduate Research Fellow.</p>

      <p>My research examines environmental change across multiple scales, from mapping urban forests with satellite imagery, to measuring neighborhood air pollution, to studying how climate risk and people's relationships with place shape decisions about where to live.</p>

      <p>Across this work, I'm especially interested in what makes environmental research useful beyond academia, from the questions we choose to ask and who helps shape them, to how findings are communicated and used.</p>
    </div>

    <figure class="home-about__photo">
      <img src="{{ "/images/site-uploads/kh_061126_0171_9M7A6826.jpg" | relative_url }}" alt="Leona Neftaliem with four fellow Knight-Hennessy Scholars at their Stanford graduation, standing outdoors in front of a wood-clad building surrounded by trees.">
      <figcaption>Knight-Hennessy Scholars graduation at Stanford, June 2026. Photo: Micaela Go / Knight-Hennessy Scholars</figcaption>
    </figure>
  </div>
</section>

<section class="home-section" id="work">
  <div class="section-heading">
    <h2>Selected Work</h2>
  </div>

  <div class="project-grid">
    {% assign featured_projects = site.portfolio | where: "featured", true | sort: "order" %}
    {% for project in featured_projects %}
      {% include project-card.html project=project %}
    {% endfor %}
  </div>
</section>

<section class="home-section home-writing">
  <div class="section-heading">
    <p class="section-eyebrow">Writing + Research</p>
    <h2>Selected Writing</h2>
  </div>

  <div class="writing-list">
    <a class="writing-item" href="https://knight-hennessy.stanford.edu/news/breathing-life-ghost-towns-harnessing-promise-eu1-homes">
      <h3>Breathing Life into Ghost Towns: Harnessing the Promise of €1 Homes</h3>
      <p class="writing-item__meta">Knight-Hennessy Scholar Insights · October 2024</p>
    </a>
    <a class="writing-item" href="https://law.stanford.edu/wp-content/uploads/2023/07/Measuring-the-Carbon-and-Other-Benefits-of-Climate-Smart-Forestry-Practices.pdf">
      <h3>Measuring the Carbon (and Other) Benefits of Climate-Smart Forestry Practices</h3>
      <p class="writing-item__meta">Stanford Law School Policy Lab · July 2023</p>
    </a>
  </div>

  <a href="/publications/" class="text-link">View publications and writing →</a>
</section>

