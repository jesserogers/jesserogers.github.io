---
title: Welcome to the New Site
excerpt: After months of procrastination, it's finally done!
meta: Read about my new website and how I built it with Github Pages
category: journal
posted: August 11 2017
image: 2017-08-11-new-site.jpg
image2x: 2017-08-11-new-site@2x.jpg
feature_image: true
tag: design
author: Jesse Rogers
---
Well, Squarespace, we had a good run. You're probably the best consumer-oriented CMS on the market. Your ease of use is unquestionable, and you do drag-and-drop better than anyone else I've ever seen.

But I'm a _developer_, dammit, and I don't need to pay you guys $20 a month to house my work in a restrictive template when I could code a cooler website myself in no time.

<img style="width: 100%;" src="{{"/assets/img/journal/2017-08-11-21-savage.jpg"}}" alt="Actor portrayal of me being frustrated with Squarespace by 21 Savage" title="Actor portrayal of me being frustrated with Squarespace by 21 Savage" />

<span style=" display: block; margin: 1rem 0 1.618rem; font-size: 12px; color: #ccc;">Me realizing how much money I've paid Squarespace since 2013</span>

And when I say "no time" I mean about three months, apparently? I started putting this site together in May (on a plane) and worked on it sporadically. Now it's August, and I will _not_ get billed by Squarespace again.

## So welcome to my new website!

I thought it'd be fun to see what goes into coding a portfolio site and what I could do with it. I probably spent the majority of my dev time on the <a href="{{"/photography" | relative_url}}" title="Check it out on the photography page">lightbox component</a>, which I'm sure could've been engineered a little more efficiently, but whatever! I think it's a pretty slick experience, and I'll improve on the code over time. Will add support for swipe gestures and arrow keys later on.

This site is hosted on <a href="http://pages.github.com" target="_blank" title="Check out Github Pages">Github Pages</a>, built with Jekyll/Liquid, and runs on HTML5, SCSS, and jQuery (thanks Google ajax). Every single line of code was lovingly written by yours truly, utilizing an incomplete version of a very, _very_ simple framework/component library I've been putting together at Adaptiva. You can see all the code in my <a href="https://github.com/jesserogers/jesserogers.github.io" target="_blank" title="Jesse Rogers' website on Github">Github repo</a>.

I prioritized performance and efficiency throughout the codebase. HTTP requests are kept to a minimum, images are lazy loaded after the DOM, and the lightbox images aren't loaded until they're needed and are sized responsibly (surprisingly rare in portfolio sites.) I even made a solid effort at keeping nesting to a reasonable minimum in my stylesheets to avoid inefficient compilations to CSS.

Plus, since this a statically generated site being served over a CDN (thanks <a href="http://cloudflare.com" target="_blank" title="Use Cloudflare, it's free and awesome">Cloudflare</a> ), it's inherently fast as hell. Performance-minded dev can only help to improve on that speed.

This is also somewhat of a clean slate for me. At this point in my life, I feel like I can put up only the work that I _like_, rather than work I think might get me hired for something. I can write whatever and whenever I want in this journal/blog thing, so I think I'll do just that.

I'll post new work here if I'm particularly stoked about it, and I'll post random thoughts, sketches, life updates, and whatever else I feel like sharing here, too. I have ideas for some content I'd like to create, and being able to code a custom interface to host it would be nice.

Idk, maybe I'll add a subscription component to this journal if I actually use it enough. Baby steps.

<a href="http://twitter.com/jesserogers" target="_blank">Follow me on Twitter in the meantime.</a>

Thanks for reading. (:
