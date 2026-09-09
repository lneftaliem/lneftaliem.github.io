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
  </div>

</section>

<section class="home-section" id="about">
  <div class="section-heading">
    <p class="section-eyebrow">About</p>
  </div>

  <div class="home-about">
    <p>I'm interested in cities because environmental change is never only ecological or only social. My research looks at these questions from different scales, from mapping urban forests with satellite imagery, to measuring neighborhood air pollution, to studying how climate risk and people's relationships with place shape decisions about where to live.</p>

    <p>Across these projects, I've become increasingly interested in what happens when research leaves academia: how evidence is communicated, how communities and practitioners shape the questions being asked, and how institutions decide which ideas and programs to support.</p>

    <p>I'm a PhD candidate in Stanford University's Emmett Interdisciplinary Program in Environment and Resources (E-IPER), where I'm advised by Chris Field and Rob Jackson. I'm also a Knight-Hennessy Scholar and National Science Foundation Graduate Research Fellow.</p>
  </div>
</section>

<section class="home-section" id="research">
  <div class="section-heading">
    <p class="section-eyebrow">Research</p>
    <h2>What I Study</h2>
  </div>

  <div class="focus-grid">
    <div class="focus-item">
      <h3>Climate + Cities</h3>
      <p>I study how environmental change shapes urban ecosystems and communities, with a particular focus on urban forests, climate risk, adaptation, and migration.</p>
    </div>
    <div class="focus-item">
      <h3>Communities + Environment</h3>
      <p>I study how environmental benefits and burdens are distributed across neighborhoods, and how community-based research can help us better understand those differences.</p>
    </div>
  </div>
</section>

<section class="home-section" id="work">
  <div class="section-heading">
    <p class="section-eyebrow">Portfolio</p>
    <h2>Selected Work</h2>
  </div>

  <div class="project-grid">
    {% assign featured_projects = site.portfolio | where: "featured", true | sort: "order" %}
    {% for project in featured_projects %}
      {% include project-card.html project=project %}
    {% endfor %}
  </div>
</section>

<section class="home-section" id="beyond">
  <div class="section-heading">
    <p class="section-eyebrow">Beyond Research</p>
  </div>

  <div class="home-about">
    <p>I'm interested in how environmental knowledge becomes useful outside academia. Alongside my research, I've worked across public education, policy engagement, interdisciplinary convening, and community partnership.</p>

    <p>My work has included developing environmental science programming with the California Academy of Sciences, contributing to policy-facing scientific review through the IPCC and United Nations, convening researchers and practitioners around urban development, and working with community organizations on environmental monitoring and public health.</p>
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
