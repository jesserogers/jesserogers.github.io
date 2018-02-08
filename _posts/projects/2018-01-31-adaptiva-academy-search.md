---
layout: projects
title: Adaptiva Academy Search
meta: A custom coded JavaScript search feature for Adaptiva's Academy front end interface
excerpt: A custom coded JavaScript search feature for Adaptiva's Academy.
image: adaptiva-academy-search--thumb.png
featured: true
category: projects
permalink: /projects/adaptiva-academy-search
posted: January 31 2018
tag: development
---
One thing that encourages me in my journey as a designer and builder of interfaces and digital experiences is seeing noticeable growth in my abilities over time. Even better when it's a relatively short period of time.

Someone at Adaptiva recently asked me about the possibility of adding a search feature to the <a href="https://adaptiva.com/academy/" target="\_blank" rel="noopener" title="Adaptiva Academy">Adaptiva Academy</a>. It had come up before, but the last time was when we were defining requirements for the page, and I had to say, "Honestly, I don't know how to do that."

The cool part is that was six months ago, and this time around, my answer was a _lot_ different. More like, "Oh yeah, I forgot about that. Lemme knock that out real quick."

## The Plan

This search function is kinda weird/unique/fun because it's entirely run in the front end. Since adaptiva.com is a statically generated site (thanks GitHub Pages), it's not like I have a database to query anyway.

The Academy is essentially a big grid of tiles that all link to downloadable assets, like product resources, webinar recordings, community tools, etc. Each asset is an `<a>` element and has a `title` attribute with the full asset title, which is what we match the query against.

The initial plan was to loop through all the assets to see if any of them match the query. If we get a match, push that jQuery object to an array called `results`.

Then, I would loop through `results` and add a modifying class on each object in the array to mark it as a match. Then it's just a matter of hiding all objects and only showing those with the new mod class.

The one thing I knew would be tricky was the dropdown menu that was already on the page that controlled which asset categories were displayed. What if the user selects a category before searching? Or after? D:

## Alpha
It didn't take long to get some basic functionality up and running.

Inside a `.submit()` function on the search form, I first created an array called `results` and a variable `query` equal to the value of the search input on submission.

```javascript
search.submit(function(e){

  e.preventDefault();

  var results = [],
      scope = $('.asset.is-showing'),
      query = searchBar.val().toLowerCase();

});
```
Then I split up the query by word into a new array called `q`.

```javascript
q = query.split(' ');
```
Then, I looped through the assets on the page, and found their `title` attribute.

```javascript
$('.asset').each(function() {
  var title = $(this).attr('title').toLowerCase();
});
```
Nice. Inside that loop, I wrote a regular JavaScript loop for the `q` array. This loop contains a boolean variable `match` that determines whether the current object gets pushed to `results` or not.

Also stored in the variable section is `reg`, a regex rule for the current word in the `for` loop.

If the title matches the string for the current word in the loop, it logs the match and sets `match` to `true`.

Then, if `match` is true, push `$(this)`, or the current jQuery object in the `.each()` loop, to the `results` array.

```javascript
for (var i = 0; i < q.length; i++) {
  var reg = new RegExp(q[i], 'g'),
      match = false;

  if (title.match(reg)) {
    console.log('Matched word "' + q[i] +'"');
    match = true;
  }
}

if (match) {
  results.push($(this));
}

match = false; // reset match
```
At the end, I set `match` back to false because otherwise it would add everything after the first `asset` returned true.

Then, the easy jQuery DOM manipulation jazz. Removing mod classes and hiding everything first, then adding the mod class for objects in `results`, and showing only those.
```javascript
$asset.removeClass('is-showing is-match').hide();

$.each(results, function(){
  $(this).addClass('is-match');
});

$('.asset.is-match').addClass('is-showing').show();
```
Voila. At this point, I had a working product. I could type in "webinar" and it would return everything with "webinar" in the title. And damn, it's lightweight and ... _nimble_ if I do say so myself.

_But_, it still totally sucked because if the user typed in multiple words, the whole experience kinda fell apart.

If the user typed in "[product name or something] webinar", it would essentially return everything you'd get from "webinar" _and_ whatever product or other word entered in with it. And the results would show up organized by date, so the order in which you typed the query made no difference. **Garbage**.

But it was late Friday afternoon and I had to go to my wife's company's holiday party that night, so further improvements would have to wait until Monday.

## Beta
At this point, the goal was to build a scoring system and display the results in order of highest to lowest score.

A <span class="strikethrough">slightly</span> buzzed conversation with one of the engineers at the holiday party gave me ideas on how to weight the score based on word order as well.

Inside the first loop, I added a couple variables, `score` and `bonus`. `bonus` is set to the amount of assets currently showing on the page. I also created a new variable in the `.submit()` function called `scope`, set to `$('.asset.is-showing')`.

```javascript
// ...
score = 0,
bonus = scope.length;
```

Then inside the loop through the `q` array, I scored the assets that met the `match` criteria. I subtracted the numeric value of the matched word's index in the query from the bonus, so that word order would affect scores for multi-word entries.

Basically, if an asset matches the first word in the query, it gets the full bonus minus _zero_, since the word is the first in the array. Words with an index of greater than zero will subsequently receive less than the full bonus. All matched assets are given a DOM attribute `data-score` with the value of `score`.

```javascript
for (var i = 0; i < q.length; i++) {
  if (title.match(reg)) {
    // ...
    score += (bonus - i);
    score++;
  }
}

if (match) {
  $(this).attr('data-score', score);
  results.push($(this));
}
```
Next up, `.sort()` the results by score. I created a variable `container` set to the HTML element that contained the grid of assets and sorted it based on the `data-score` attribute.
```javascript
container.find('.asset.is-match').sort(function(a, b) {
  return ($(b).data('score')) > ($(a).data('score')) ? 1 : -1;
}).appendTo(container);
```
I knew that rearranging objects would create a need to put them back in order, so I created a loop immediately upon document ready to add another DOM attribute called `data-original-index` to retain the original order.
```javascript
// immediately loop through all assets
$('.asset').each(function(index) {
  $(this).attr('data-original-index', index);
});
```
I knew that would be coming up a lot, so I put the code to reorder assets based on original index in a function expression.
```javascript
var resetAcademy = function() {
  container.find('.asset.is-showing').sort(function(a, b) {
    return ($(b).data('original-index')) < ($(a).data('original-index')) ? 1 : -1;
  }).appendTo(container);
}
```
よっしゃ! It worked. Results showed up in order of score, and word order in the query affected result order, and I had a function to put them back in their original order whenever I needed to.

## UX time

Scope was the big issue for me here. Inherently, the search only queried the assets that were showing on the page. This meant that if a user ran a search, then ran another search, they would be searching within a search. No _Inception_ jokes, please.

Also, the dropdown at the top of the page hides and displays assets by category, thus affecting the scope if the dropdown's `.change()` function runs before the search.

This is the intended design, but none of it was being made clear to the user.

After some discussion with my associate art director <a href="https://adamhaney.co" target="\_blank" rel="noopener" title="Check out Adam Haney's website">Adam Haney</a>, we decided that the design should include **"breadcrumbs"** of the user's search path and **dynamic placeholder** text in the search bar to indicate scope, the **number of results** found, and a **"clear search"** button.

The intended functionality of the breadcrumbs was so every time a user entered a search, their query would show up on the front end, and they could see their path to a narrower scope from left to right. Additionally, the user should be able to click on previous breadcrumbs (or **'tags'** as Adam and I called them) to revert their search scope to a previous state.

All of these elements should appear only after the user submitted a query, and should be removed whenever no searches are active.

### Dynamic placeholder text
This was pretty easy, so I did that first by creating another function expression called `showScope()`. This gets called in the `.change()` function that I already had on the dropdown.
```javascript
var showScope = function() {
  var searchScope = dropdown.find('option:selected').text();
  searchBar.attr('placeholder', 'Search ' + searchScope);
}
```

### Number of results found
Also easy! Inside the `.submit()` function on the search form, I added one line to display the number of results inside a span with the `id='resultCount'`.
```javascript
$('#resultCount').text(results.length + ' results found for "' + query + '"');
```

### Breadcrumbs
Okay this part was a little more intensive to implement and required a little bit of bashing my head against my keyboard to figure out.

It started out well enough. I created a new variable called `tagContainer` to append the `tags`, which were `span` elements. I didn't want the DOM freaking out if the user clicked the most recent tag, so I gave it a differentiating class `is-active`.
```javascript
if (tagContainer.text().length == 0) {
  tagContainer.append('<span class="search-tags-tag is-active">' + query + '</span>');
} else {
  $('.search-tags-tag').removeClass('is-active');
  // add subsequent tag
  tagContainer.append('<span class="search-tags-tag is-active is-sub">' + query + '</span>');
}
```
Now, the click functionality.

In order to keep track of the previous search results, I created a new global array called `session` and pushed `results` to it on each form submission.

```javascript
var session = [];
search.submit(function(e) {
  // ...
  session.push(results);
  // ...
});
```
Then, I wrote a click function for `tags` (that weren't the last/only one) to make them actually do something.

The variable `index` figures out which index the clicked tag holds in the list of `tags`. The function then finds the `results` instance at the corresponding index of `session`, loops through it, and marks them all as matches again.

Here I removed all the `tags` after the one that was clicked and clipped off the `session` array at the value of `index`. I also consolidated the code to show all matched results into a function expression called `showMatched()`.

Then of course, update the text showing the number of results displayed for the reversion of scope.
```javascript
tags.not('.is-active').click(function() {
  var index = tags.index($(this)),
      queryTxt = $(this).text();

  $(this).nextAll().remove();
  session.length = index + 1;

  $.each(session[index], function() {
    $(this).addClass('is-match');
  });

  // display updated number of results
  $('#resultCount').text(session[index].length + ' results found for "' + queryTxt + '"');
  showMatched();
});
```
Whoo! This was actually one of those moments where I couldn't believe how quickly I got that to work and how little code it actually took.

I did some tests by logging `session` to the console every time a new search was performed, as well as when the scope was reverted. Sure enough, the `session` showed a length that matched the number of tags showing, and the corresponding `results` array(s) inside matched up with what the `click` function displayed on the page.

### Clear button

This one was pretty easy compared to the breadcrumbs. While writing this part, I ended up modifying `resetAcademy()` to handle hiding and showing all the assets.

```javascript
resetAcademy = function(sort = true, show = false, hide = false) {

  if (sort) {
    container.find('.asset').sort(function(a, b) { // sort by original index
      return ($(b).data('original-index')) < ($(a).data('original-index')) ? 1 : -1;
    }).appendTo(container);
  }

  if (show) {
    $asset.removeClass('is-match').addClass('is-showing').show();
  }

  if (hide) {
    $asset.removeClass('is-showing is-match').hide();
  }

}
```
The function expression now takes in parameters `sort` `show` and `hide`. I had noticed that every time I called `resetAcademy()`, I was finding the same snippets of code in the same scope, so why not build them in dynamically? I made all the actions inside the function optionally accessible through the parameters, including the original `.sort()` block, allowing me to call only the functionaly needed at the time.

And finally, the `click` function on the 'clear' button.

It hides the `div.search-info` that shows the tags, number of results, and the button, then empties out the `tagContainer` and the `session` array. Then it resets the dropdown and the searchbar and runs `showScope()` to reset the placeholder text.
```javascript
$('.js-clear-search').click(function() {

  $('.search-info').hide();
  tagContainer.empty();
  session = [];
  resetAcademy(show = true);

	// reset dropdown and search bar
  dropdown.val('all');
  searchBar.val('');
  showScope();

});
```
The last thing I had to do was make a couple alterations to the `.change()` function on the dropdown. I wanted the dropdown to take precedence over the search bar, so whenever the user selected a new category, I ran `resetAcademy()`, hid the search area, emptied out the search tags, reset the search bar, and ran `showScope()` to set the placeholder text.
```javascript
dropdown.change(function() {
  //...
  resetAcademy(sort = true, null, hide = true);
  $('.search-info').hide();
  tagContainer.empty();
  searchBar.val('');
  showScope();
});
```

Here's how the UI ended up looking:
<div class="callout">
<div class="callout-content">
<img style="border: 2px solid #eee;" src="/assets/img/projects/adaptiva-academy-search-ui.png" title="UI design for Adaptiva Academy search feature">
</div>
</div>

I added `title` attributes to the `tags` that say `"Revert search scope back to..."` and then whatever the query string they're reverting to, so users could get unique mouseover cues for each clickable tag.

The `.is-active` tags have `pointer-events: none;` so they don't show the same cue.

It's beautiful. * kisses fingertips *

## v1.0

Here's the full script with all the optimizations, variables, etc. I continued to ship new iterations after this, which I'll talk about below, but if you want to skip straight to the live code, that's currently available to see here:

<a class="btn black" href="https://github.com/adaptiveprotocols/adaptiveprotocols.github.io/blob/master/assets/js/academy.js" target="\_blank" rel="noopener" title="Check out the live script">See the Code</a>

{% include html/academy-search.html %}

## v2.0

After the initial launch, I continued to tweak the algorithm and make UI/UX improvements.

### Algorithm Improvements

First, I made adjustments to the scoring system. I realized in my original code, `score++` doesn't actually do anything to the value returned from the loop. Even if it did, adding `1` to the score wouldn't really doing much anyway, so I decided to double the score for each matched word, using the `*=` operator to actually _do_ something to `score`.

I also added a line in case the user types in an exact asset name, to ensure it gets the highest score.
```javascript
if (title.match(reg)) {
	//...
	score += (bonus - i);
	if (title === query) {
		// if exact match, give 2x full bonus
		score += bonus * 2;
	}
	// double score for each matched word
	score *= 2;
}
```
### UX Improvements

The interaction design of the search form needed some work, starting with the "search" button.

When v1.0 shipped, the button was a constant blue and was clickable at all times, allowing the user to submit empty queries. Empty searches essentially reset the results within the current scope, so no harm done, but they also generate empty breadcrumbs, which are _ugly_.

To combat this, I wanted to make the button only clickable when the search bar had contents, and grayed out otherwise.

I set the button to the modifying class `is-active`, only when the user had typed in the search bar and entered a string with a `length` greater than `0`.

Next, a `click` function to prevent default behavior (in this case, form submission) when the search bar was empty.

```JavaScript
searchBar.focus(function() {
	searchBar.on('input', function() {
		if (searchBar.val().length > 0) {
			searchBtn.addClass('is-active');
		} else {
			searchBtn.removeClass('is-active');
		}
	});
});

searchBtn.click(function(e) {
	if (searchBar.val().length === 0) {
		e.preventDefault();
	}
});
```
<div class="callout">
<div class="callout-content">
<img style="border: 2px solid #eee;" src="/assets/img/projects/adaptiva-academy-search-button.gif" title="Interaction design and development for Adaptiva Academy search button">
</div>
</div>

I thought it would be cool if users could sort results by date or relevance after submitting their query, so we created some new UI elements to allow for that.

<div class="callout">
<div class="callout-content">
<img style="border: 2px solid #eee;" src="/assets/img/projects/adaptiva-academy-search-v2.jpg" title="UI design for Adaptiva Academy search feature">
</div>
</div>

To simplify the sorting, I added function expressions to module's global scope called `sortDate()` and `sortRel()` and replaced any instances of duplicate code with calls to these expressions.

Since the page loads with everything sorted by date by default, the `data-original-index` attribute already serves as a great benchmark for chronological sorting, so I used that in `sortDate()`.

`sortRel()` simply sorts results by score, or 'relevance' in user-friendly terms.

```JavaScript
sortDate = function() {
	container.find('.asset').sort(function(a, b) {
		return ($(b).data('original-index')) < ($(a).data('original-index')) ? 1 : -1;
	}).appendTo(container);
},
sortRel = function() {
	container.find('.asset').sort(function(a, b) {
		return ($(b).data('score')) > ($(a).data('score')) ? 1 : -1;
	}).appendTo(container);
}
```
Both sort by buttons have unique `id` attributes and the same CSS classes which I targeted in the variable `sortBy`. I wrote a `click` function that covered both of them and figured out which function to run.

```JavaScript
sortBy.click(function(e) {
	e.preventDefault();
	var clicked = $(this);

	if (clicked.hasClass('is-selected')) {
		// do nothing if already selected
		return false;
	} else {
		// set only clicked button to selected state
		sortBy.removeClass('is-selected');
		clicked.addClass('is-selected');
		// run desired sort function
		if (clicked.is('#sortDate')) {
			sortDate();
		} else if (clicked.is('#sortRel')) {
			sortRel();
		}
	}
});
```
Finally, after collecting some feedback from users and colleagues, it was clear that the narrowing scope was still not crystal clear to users. They were acting in "Google mode" and assuming every search would query all assets.

Though it would be easy to just set the scope to everything and give everyone what they _expected_, I firmly believed a narrowed scope would be more useful, since users would be searching to find something specific in a finite list of assets.

Instead of leaving the user's last query submission in the search bar, I cleared it out after every submission and specified the narrowed scope in the placeholder text.

```JavaScript
if (session.length > 0) {
	// give generic scope message after second query
	searchBar.val('').attr('placeholder', 'Search within previous results');
} else {
	// give specific scope message after first query
	searchBar.val('').attr('placeholder', 'Search within results for "' + query + '"');
}
```
Ah, much better. Now users have to see the UI cue before running subsequent queries.

Check out the latest version of this script on GitHub:

<a class="btn black" href="https://github.com/adaptiveprotocols/adaptiveprotocols.github.io/blob/master/assets/js/academy.js" target="\_blank" rel="noopener" title="Check out the live script">See the Code</a>

## Epilogue

When I rolled this out, everyone I told about it was surprisingly psyched about it. I mean, as a computer nerd who wrote all this code, it's pretty exciting because it was a challenge, but I mean it's a search form for a bunch of tiles, not the next Google.

Still, apparently people _wanted_ this. At the time I'm writing this, there are 98 assets listed in the Academy, which is a lot more than we imagined having when we first launched it.

Some of our marketing people regularly use the Academy as a quick way to retrieve links to our content, and they've told me this has saved them significant time already.

If our own employees were a little overwhelmed by navigating the content on the Academy, then thank Yeezus we got this shipped because the users must've been hurting too.

This project came up as, "Hey this would be nice to have" and ended up as a huge, productive, and experimental learning experience for me, as well as a marked improvement in user experience for the Adaptiva Academy.

You can check out the live code here: [Adaptiva Acdemy](https://adaptiva.com/academy/).

Thanks for reading!

**Jesse**
