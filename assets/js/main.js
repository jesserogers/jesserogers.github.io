---
---
var isTouch = function () { // check to see if touch device before DOM ready

  try {
    document.createEvent("TouchEvent");
    return true;
  }
  catch (e) {
    return false;
  }

}

jQuery(document).ready(function ($) {
  // party time
  {% include js/lazy.js %}
  {% include js/nav.js %}
  {% include js/occupations.js %}
  {% include js/directions.js %}
  {% include js/visible.js %}
  {% include js/onscroll.js %}
  {% include js/gallery.js %}
  {% include js/journal.js %}
});
