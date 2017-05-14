---
layout: projects
title: 'A&amp;R Solar'
meta: 'Commissioned illustration series for Seattle-based solar energy company A&R Solar'
img: '/assets/img/a-r-solar.png'
img_ret: '/assets/img/a-r-solar.png'
featured: true
---
In 2015, I was commissioned by Seattle-based solar energy company to illustrate technical diagrams and product depictions.

A&R Solar was in the process of a website redesign and needed illustrative components to depict the process and prerequisites for a fully solar powered home. These illustrations were to go on a "How it Works" page.

<div class="gallery">
{% for image in site.data.a-r-solar %}
  <div class="j-col j-col-4 project-img">
    <img class="js-project-img" title="{{image.title}}" src="{{image.src}}" alt="Illustration of {{image.title}}" />
    <div class="js-lightbox" style="display: none;">
      <div class="js-lightbox-close">
        <span></span>
        <span></span>
      </div>
      <img class="js-lightbox-img" src="{{image.title}}" src="{{image.src}}" alt="Illustration of {{image.title}}" />
    </div>
  </div>
{% endfor %}
</div>

A&R Solar was really happy with the illustration series, so they asked me to create another illustration for their office beer keg.

<div class="project-img single-img">
<img src="{{'/assets/img/a-r-solar/a-r-solar-keg-rules-illustration.jpg' | relative_url}}" alt="Banner illustration for A&R Solar's office keg" />
<div class="js-lightbox" style="display: none;">
  <div class="js-lightbox-close">
    <span></span>
    <span></span>
  </div>
  <img src="{{'/assets/img/a-r-solar/a-r-solar-keg-rules-illustration.jpg' | relative_url}}" alt="Banner illustration for A&R Solar's office keg" />
</div>
</div>
