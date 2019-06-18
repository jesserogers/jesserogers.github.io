---
layout: projects
title: Destiny 2 Clan Website
meta: A custom coded website built on Jekyll and the Bungie API for my Destiny 2 PC Clan, Reign of Iron.
excerpt: Using Jekyll and the Bungie API to make a better group gaming experience
image: destiny-2-clan-website--thumb.jpg
featured: true
category: projects
permalink: /projects/destiny-2-clan-website
posted: April 17 2018
tag: development
---
As I mentioned in an earlier [post](/journal/2018/01/29/kuro-plays-games/), I've been playing quite a bit of video games on my PC lately (still need to write about that beautiful machine), and I play with a great group of people in the Destiny 2 clan Reign of Iron.

This clan is a big positive in my life lately, and I thought that building a website that served real use cases for members would help make Reign of Iron _the_ clan to be in, and help us grow our active roster with more cool people.

As of now, I've got a really solid build of this site in production at [reignofiron.org](https://ascendant.gg/), and I will continue to iterate and build new features. But here's what I've got so far!

**Update**: Reign of Iron is now called Λscendant. This website has gone through several major iterations since I wrote this, and I've even released an [open source](https://github.com/jesserogers/clan-app) version of one of them, if you'd like to set up your own Destiny 2 clan website.

## The Plan
I decided the requirements were as follows:
- The site should hook into the Bungie API to get and display the current clan roster
- The site should display individual profiles for each member with his/her Crucible (PvP) stats
- The site should store a library of PvP maps for reference during competitive play
- The site should allow members to submit a form to sign up for raids and see who else is signed up

To keep the cost of maintaining this website as close to $0 as possible, I again went with Github Pages and Jekyll, routed through Cloudflare for that nice SSL.

## The Clan Roster

First on the list was getting the clan roster from the Bungie API. Lucky for me, Bungie's API is well documented and super easy to work with. I guess AAA devs are pretty good or something.

So, with a simple `ajax` request, I got the roster up and running. Bungie sends me back a nice object with a ton of data in it for me to do with as I please.
```javascript
// get list of members and populate roster table
$.ajax({
  url: "https://www.bungie.net/platform/GroupV2/" + groupID + "/Members/",
  headers: {
    "X-API-Key": apiKey
  }
}).done(function(json) {
  var members = json.Response.results;
  console.log('Member list:', members);
  listMembers(members);
});
```
I really need to add something that handles an erroneous server response, like when Bungie is doing maintenance or big updates. Next version!

Once we get the roster, we run a function called `listMembers()` on the section of the returned object I want to access.
```javascript
function listMembers(rsp) {
  var
  list = $('.memberList-list'),
  sortMembers = function(method) {
    // sort by date joined
    if (method = joined) {
      list.find('.member').sort(function(a, b) {
        return ($(b).data('joined')) < ($(a).data('joined')) ? 1 : -1;
      }).appendTo(list);
    } else if (method = username) {
      list.find('.member').sort(function(a, b) {
        return ($(b).data('username')) < ($(a).data('username')) ? 1 : -1;
      }).appendTo(list);
    }
    list.find('.member.online').prependTo(list);
  };

  for (var i = 0; i < rsp.length; i++) {
    var
    profile = rsp[i].bungieNetUserInfo,
    member = $('<a></a>');
    // check for valid profile
    // some users don't have Bungie profiles somehow and it breaks function
    if (typeof profile != 'undefined') {
      // store response data in semantic variables
      var
      name = rsp[i].destinyUserInfo.displayName,
      joinDate = rsp[i].joinDate,
      joined = joinDate.substring(0, joinDate.indexOf('T')),
      online = rsp[i].isOnline,
      icon = profile.iconPath,
      memberId = profile.membershipId,
      memberType = rsp[i].destinyUserInfo.membershipType,
      destinyId = rsp[i].destinyUserInfo.membershipId,
      rank = rsp[i].memberType;
      // configure DOM node and add to page
      member
      .attr({
        'class': 'j-row vertical-center-row member',
        'href': '/player/?bungieId=' + memberId + '&destinyId=' + destinyId + '&joined=' + joined + '&rank=' + rank,
        'title': 'See player profile for ' + name,
        'data-joined' : joined.replace(/-/g, ''),
        'data-username': name,
        'data-online' : 'false',
        'data-searchable' : name,
      })
      .html(
        '<div class="j-col j-col-1 member-icon"><img src="https://bungie.net/' + icon + '"></div>' +
        '<div class="j-col j-col-3 member-name"><h3>' + name + '</h3></div>' +
        '<div class="j-col j-col-3 member-joined" data-label="Joined">' + joined.replace(/-/g, '/') + '</div>' +
        '<div class="j-col j-col-3 member-status" data-label="Status"><span class="member-online" id="status-' + memberId + '">' + online + '</span></div>' +
        '<div class="j-col j-col-3 member-button"><a class="button outline gold full-width">' + 'View Stats' + '</a></div>'
      )
      .appendTo(list);
      // indicate online/offline status
      if (String(online) === 'true') {
        $('#status-' + memberId)
        .text('Online')
        .addClass('online')
        .closest('.member')
        .attr('data-online', true)
        .addClass('online');
      } else {
        $('#status-' + memberId).text('Offline').removeClass('online');
      }
      sortMembers(joined); // sort members by join date
    }
  }
}
```
This function takes in an array of objects provided by Bungie as a parameter, loops through it, and creates a list that includes each player's Bungie profile icon, their username, the date they joined the clan, their real-time online/offline status, and a button to view their profile/statistic.

The variable `member` is an `<a>` element that gets a `href` attribute with some URL parameters that provide the information needed to populate that player's profile. Since I'm not using a server and the roster is always updating, I needed to create these pages entirely on the front end.

I created a function expression within `listMembers()` called `sortMembers()` that can take in different sorting "methods" as a parameter. The idea is that later on, I can add controls to the list to allow users to sort the roster based on whatever table column they want. For now, it sorts by join date, with online members automatically added to the front of the list.

<div class="callout">
<div class="callout-content">
<div class="j-row">
<div class="j-col j-col-9">
<img src="/assets/img/projects/destiny-2-clan-website-roster.png" alt="Destiny 2 Clan Reign of Iron Roster from Bungie API">
</div>
<div class="j-col j-col-3">
<img src="/assets/img/projects/destiny-2-clan-website-roster-mobile.png" alt="Destiny 2 Clan Reign of Iron Roster on mobile device">
</div>
</div>
</div>
</div>

## The Player Profiles
Cool, so I have a list of people who are in my clan on the website. Now to make it more useful.

Bungie's API provides a plethora of data on each player's performance, like their Kill/Death Ratio, Kill + Assist/Death Ratio, total number of kills, total time played, etc.

Most of my clanmates are pretty into PvP gameplay, and some of us are pretty strong players who like to track how we're doing out there.

I started off with a pretty blank template for the player page, `player.html`, which would be populated by JavaScript based on the URL parameters included in each member's row on the roster.
```html
<section class="color-block lighter-gray">
  <div class="content">
    <div class="j-col j-col-3 playerProfile-meta">
      <img src="" alt="" class="player-icon">
      <h4 id="player-rank"></h4>
      <p class="gray">Joined clan <span class="gray" id="player-join-date"></span></p>
      <p>Total time played:<br><span class="type-large" id="player-clock"></span></p>
    </div>
    <div class="j-col j-col-9">
      <h2>Averages</h2>
      <div class="playerProfile-content">
        <div class="j-row grid-container">
          <div class="j-col j-col-4">
            <h4>KDA</h4>
            <span class="type-larger" id="player-kda"></span>
          </div>
          <div class="j-col j-col-4">
            <h4>KD</h4>
            <span class="type-larger" id="player-kd"></span>
          </div>
          <div class="j-col j-col-4">
            <h4>Efficiency</h4>
            <span class="type-larger" id="player-efficiency"></span>
          </div>
        </div>
      </div>
      <h2>Totals</h2>
      <div class="playerProfile-content">
        <div class="j-row grid-container">
          <div class="j-col j-col-4">
            <h4>Kills</h4>
            <span class="type-larger" id="player-kills"></span>
          </div>
          <div class="j-col j-col-4">
            <h4>Assists</h4>
            <span class="type-larger" id="player-assists"></span>
          </div>
          <div class="j-col j-col-4">
            <h4>Precision Kills</h4>
            <span class="type-larger" id="player-precision-kills"></span>
          </div>
        </div>
      </div>
      <h2>Bests</h2>
      <div class="playerProfile-content">
        <div class="j-row grid-container">
          <div class="j-col j-col-6">
            <h4>Best Single Game Kills</h4>
            <span class="type-larger" id="player-most-kills"></span>
          </div>
          <div class="j-col j-col-6">
            <h4>Longest Kill Spree</h4>
            <span class="type-larger" id="player-kill-spree"></span>
          </div>
          <div class="j-col j-col-6">
            <h4>Most Precision Kills</h4>
            <span class="type-larger" id="player-most-precision"></span>
          </div>
          <div class="j-col j-col-6">
            <h4>Best Weapon Type</h4>
            <span class="type-larger" id="player-weapon"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```
Next, I created a function called `checkParams()` to parse the URL parameters and store their values as variables in my script.
```javascript
function checkParams(param) {
  var
  pageURL = window.location.search.substring(1),
  urlParams = pageURL.split('&');

  if (urlParams.length > 0) {
    for (var i = 0; i < urlParams.length; i++) {
      var pair = urlParams[i].split('=');
      if (pair[0] == param) {
        return pair[1];
      }
    }
  }
}
```
Then to store them in variables:
```javascript
var
// ...
bungieId = checkParams('bungieId'),
destinyId = checkParams('destinyId'),
joined = checkParams('joined'),
rank = checkParams('rank');
```
I nested the bulk of the `player.js` code in an `if` statement that required values for `bungieId`, `destinyId`, `joined`, and `rank` to proceed. If those parameters aren't present in the URL, I don't even want to fire the `ajax` request and waste resources.

But, as long as the URL parameters are there, it'll proceed to get both the member's player stats and their profile info from the Bungie API.
```javascript
if (bungieId && destinyId && joined && rank) {
    $.ajax({
      url: "https://www.bungie.net/Platform/Destiny2/4/Account/" + destinyId + "/Character/0/Stats/",
      headers: {
        "X-API-Key": apiKey
      },
      success: function(data) {
        var
        stats = data.Response.allPvP.allTime,
        efficiency = stats.efficiency.basic.displayValue,
        kd = stats.killsDeathsRatio.basic.displayValue,
        kda = stats.killsDeathsAssists.basic.displayValue,
        kills = stats.kills.basic.displayValue,
        deaths = stats.deaths.basic.displayValue,
        assists = stats.assists.basic.displayValue,
        precisionKills = stats.precisionKills.basic.displayValue,
        combatRating = stats.combatRating.basic.displayValue,
        mostKills = stats.bestSingleGameKills.basic.displayValue,
        killSpree = stats.longestKillSpree.basic.displayValue,
        mostPrecision = stats.mostPrecisionKills.basic.displayValue,
        weapon = stats.weaponBestType.basic.displayValue,
        clock = stats.allParticipantsTimePlayed.basic.displayValue,
        hours = clock.match(/\d+/g);

        totalHours = (Number(hours[0]) * 24) + Number(hours[1]);

        console.log('Player stats:', data);

        // Populate stats
        $('#player-clock').text(totalHours + 'h');
        $('#player-efficiency').text(efficiency);
        $('#player-kd').text(kd);
        $('#player-kda').text(kda);
        $('#player-kills').text(kills);
        $('#player-assists').text(assists);
        $('#player-precision-kills').text(precisionKills);
        $('#player-weapon').text(weapon);
        $('#player-kill-spree').text(killSpree);
        $('#player-most-kills').text(mostKills);
        $('#player-most-precision').text(mostPrecision);
      },
      error: function(data) {
        console.log('Error loading player stats:', data);
      }
    });

    $.ajax({ // get Bungie Profile
      url: "https://www.bungie.net/Platform/User/GetBungieNetUserById/" + bungieId + "/",
      headers: {
        "X-API-Key": apiKey
      },
      success: function(data) {
        console.log('Player profile:', data);
        var
        response = data.Response,
        about = response.about,
        banner = response.profileThemeName,
        blizzard = response.blizzardDisplayName,
        icon = response.profilePicturePath,
        name = blizzard.substring(0, blizzard.indexOf('#'));

        // Populate profile
        $('.hero#player-hero').css({
          'background-image': 'url("https://bungie.net/img/UserThemes/' + banner + '/header.jpg")'
        })
        $('#player-title').text(name);
        $('.player-icon').attr({
          'src': 'https://www.bungie.net' + icon
        });
        $('#player-join-date').text(joined.replace(/-/g, '/'));
        switch(rank) {

          case '3': $('#player-rank').text('Iron Officer')
          break;

          case '5': $('#player-rank').text('Iron General');
          break;

          default: $('#player-rank').text('Iron Brigaider');
        }
      },
      error: function(data) {
        console.log('Error loading player profile:', data);
      }
    });
  }
```
Originally, I stored a lot more data in URL parameters to avoid making a second ajax request, but I learned that I could use the Bungie Profile endpoint in the API to customize each profile to match the theme in the corresponding Bungie account. Pretty cool.

<div class="callout">
<div class="callout-content">
<div class="j-row">
<div class="j-col j-col-9">
<img src="/assets/img/projects/destiny-2-clan-website-player-profile.png" alt="Destiny 2 Clan Reign of Iron player profile and statistics from Bungie API">
</div>
<div class="j-col j-col-3">
<img src="/assets/img/projects/destiny-2-clan-website-player-profile-mobile.png" alt="Destiny 2 Clan Reign of Iron player profile and statistics on mobile device">
</div>
</div>
</div>
</div>

## PvP Maps
This part was easy.

I downloaded all of [r3likt](https://twitter.com/r3likt)'s maps and made a simple `_data` file in Jekyll for each one with a title and image path.

Then on `maps.html`, I made a `for` loop in Jekyll.
```html
{%raw%}{% for map in site.data.maps %}
  <div class="roiMap" data-searchable="{{map.title}}">
    <h2>{{map.title}}</h2>
    <img src="/assets/img/maps/{{map.img}}-destiny-2-map.jpg" alt="">
    <a href="/assets/img/maps/original/{{map.img}}-destiny-2-map.jpg" class="button gold" target="_blank" rel="noopener" title="View full size, original image">View Large</a>
  </div>
{% endfor %}{%endraw%}
```
Jekyll generates markup with a title, an optimized image, and a button that links to the huge, original image file for each map.

<div class="callout">
<div class="callout-content">
<div class="j-row">
<div class="j-col j-col-9">
<img src="/assets/img/projects/destiny-2-clan-website-pvp-maps.png" alt="Destiny 2 Clan Reign of Iron PvP Maps">
</div>
<div class="j-col j-col-3">
<img src="/assets/img/projects/destiny-2-clan-website-pvp-maps-mobile.png" alt="Destiny 2 Clan Reign of Iron PvP Maps">
</div>
</div>
</div>
</div>

## Search/Filter Function
You might've noticed that both the roster and the map list have search bars. I created a little reusable search component for this site that I think is pretty slick.

The HTML is extremely simple. The `input` element the user types in has `data` attributes that define the scope: what the function is searching, and where to search for it.

So for example, the PvP map search `input` looks like this:

```html
<input type="text" data-scope="roiMap" data-container="roiMap-container" class="search" placeholder="Search maps">
```
`data-scope` declares the class name(s) of the DOM node to be evaluated for the search query, and `data-container` tells the search function where to look for that class.

The specified class name's DOM nodes will always have a `data` attribute called `searchable` that stores the string to be matched against the query.

As the user types, the JavaScript stores these values in variables `container` and `scope`. Then, we loop through the class name for `scope` and evaluate whether or not the `searchable` string matches what the user has typed in so far.

As soon as the `searchable` attribute no longer matches what's in the search bar, it's hidden.
```javascript
$('input.search').on('input', function() {
  var
  filter = $(this).val().toLowerCase(),
  container = $(this).data('container'),
  scope = $(this).data('scope');

  $('.' + scope).each(function() { // loop through current scope
    var
    $this = $(this),
    name = $this.data('searchable').toLowerCase();
    // loop through query words
    for (var i = 0; i < scope.length; i++) {
      // hide as soon as name != filter
      if (name.indexOf(filter) > -1) {
        $this.show()
      } else {
        $this.hide();
      }
    }
  }); // end scope loop

});
```
Pretty simple, lightweight, highly functional, and easily reusable. That's the kind of code I like to write.

## Raid Signups

Okay, this section could probably be its own entire post, so I'm gonna try to keep this short.

Raid signups required _storing data_ somewhere and _keeping it_, which is kinda antithetical to the whole static site/front-end only thing I've been doing here. I don't have a server, so how can I record these signups without sending the user away from the site to a third party application?

Enter Google Sheets.

Basically, I created a bunch of Google Sheets docs, one for each day of the week. Google Sheets allows me to read and write to and from the same sheet using `ajax` and a little bit of Google Apps Scripts.

### Displaying Signups
This was probably one of the easier parts to get working. After making my Google Sheet publicly accessible to anyone with the link and publishing it to the web, I wrote some `ajax` stuff to display the contents of the sheet.

Again, I stored the data needed to make the `ajax` request in `data` attributes on the DOM node for each signup sheet.
```html
{%raw%}<div class="signupSheet" id="{{include.day}}" data-sheet="{{include.sheet}}"></div>{%endraw%}
```
Then for each signup sheet, I made an `ajax` request to Google Sheets, using the data from the `data` attributes.

Once we get the data back from Google, I parsed it into an object with a format that was easier to work with.

Then, so long as the parsed data actually had contents, I created a table-esque row for each signed up member, showing their username and when they're available to play.
```javascript
$('.signupSheet').each(function() {
  var
  day = $(this).attr('id'),
  sheet = $(this).data('sheet'),
  $this = $(this),
  url = 'https://spreadsheets.google.com/feeds/list/' + sheet + '/od6/public/basic?alt=json';

  $.ajax({
    url: url,
    success: function(response) {
      var
      data = response.feed.entry,
      parsedData = [];
      // parse Google sheets data into more manageable format
      $.each(data, function(i) {
        parsedData.push({
          name: data[i].title.$t,
          available: data[i].content.$t.replace('timeframe: ', ''),
        });
      });
      // if anyone is signed up
      if (parsedData.length > 0) {
        // hide the "no one signed up" thing
        $this.find('.signupSheet-empty').hide();
        // populate data for signup
        $.each(parsedData, function(i) {
          console.log('Player signed up for ' + day + ':', parsedData[i]);
          $this.find('.signupSheet-content').append(
            '<div class="j-row signupSheet-entry">' +
            '<div class="j-col j-col-6" data-th="Player"><span class="signupSheet-player">' + parsedData[i].name + '</span></div>' +
            '<div class="j-col j-col-6" data-th="Available"><span class="signupSheet-availability">' + parsedData[i].available + '</span></div>' +
            '</div>'
          );
        });
      }
    }
  });
});
```
Next, I wrote a little somethin' somethin' to make sure the signup sheets showed up with the current day first. To do that, I made some variables to evaluate the day of the week.
```javascript
var
// ...
days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
today = new Date().getDay(),
sortedDays = days.slice(today).concat(days.slice(0, today)),
// ...
```
Next, sort the signup sheets based on the `sortedDays` array.
```javascript
$('.signupSheet').sort(function(a, b) {
  return sortedDays.indexOf($(a).attr('id')) > sortedDays.indexOf($(b).attr('id'));
}).appendTo('#raid-signup');
```
Awesome. If there's data in the Google Sheet, it shows up in a nice fashion. Now to make it so members can actually post data to the sheet directly from the website.

### Posting Signups to Google Sheets

Okay, so each signup sheet has a form at the bottom of it where the player enters their username and selects any of the three time slots we schedule raids for: 8:00 AM, 1:00 PM, and 6:00 PM Pacific Time.

```html
{%raw%}<form class="signupForm" data-postto="{{include.postto}}">
  <div class="j-row vertical-center-row">
    <div class="j-col j-col-4">
      <label for="player_name" title="Your Battletag">Name</label>
      <input type="text" name="player_name" placeholder="xROI_fanGurl69x" required>
    </div>
    <fieldset class="signupForm-checkboxes j-col j-col-6" style="border: 0; padding: 0;">
      <div class="j-col j-col-3">
        <legend>Raid Times</legend>
      </div>
      <div class="j-col j-col-3">
        <label for="8am">
        <input type="checkbox" class="signupForm-checkbox" name="8am" id="8am-raid" value="8:00 PM">
          8:00 AM
        </label>
      </div>
      <div class="j-col j-col-3">
        <label for="1pm">
        <input type="checkbox" class="signupForm-checkbox" name="1pm" id="1pm-raid" value="1:00 PM">
          1:00 PM
        </label>
      </div>
      <div class="j-col j-col-3">
        <label for="6pm">
        <input type="checkbox" class="signupForm-checkbox" name="6pm" id="6pm-raid" value="6:00 PM">
            6:00 PM
        </label>
      </div>
    </fieldset>
    <div class="j-col j-col-2 push-1">
      <button type="submit" class="button full-width">Sign Up</button>
    </div>
    </div>
  <input type="hidden" name="time_frame">
</form>{%endraw%}
```
I decided that users needed to enter a valid username that belongs to a clan member in order to sign up. Otherwise, I'm sure these weirdos would've started making up funny meme names that would've been amusing, yes, but more confusing than anything else.

So, I immediately get the clan roster on this page, then I wrote a function expression called `checkName()` to loop through the roster and make sure there's a match, returning a boolean value.

```javascript
var checkName = function(name) {

  var m = false; // flag
  console.log('Checking to see if ' + name + ' is a Reign of Iron Member...');
  // loop through clan usernames and check for a match
  $.each(userNames, function(i) {
    // make case insensitve
    if (name.toLowerCase() === userNames[i].toLowerCase()) {
      console.log('Confirmed, ' + userNames[i] + ' is in Reign of Iron');
      m = true;
    }
  });

  if (m) {
    return true;
  } else {
    return false;
  }

};

// Store member list immediately so we only make one AJAX request to Bungie API
$.ajax({
  url: "https://www.bungie.net/platform/GroupV2/" + groupID + "/Members/",
  headers: {
    "X-API-Key": apiKey
  }
}).done(function(json) {
  var members = json.Response.results;
  $.each(members, function(i) {
    userNames.push(members[i].destinyUserInfo.displayName);
  });
});
```
Pretty self explanatory. Then I wrapped basically everything inside the submit function on the signup sheet forms in an `if` statement based on what gets returned by `checkName()`.

So on submit, we `.preventDefault()` to stop page reloading. I stored the values of form's inputs in variables immediately inside the `submit` function.

Then, so long as the name entered belongs to a real clan member, the magic happens. I take the values of the checked time slots, push them to an array called `available`, then turn that array into a nice string that lists the available times separated by comma if there are multiple.

Then, we push the form's data as an object to Google Sheets with `ajax`. Then a loading screen comes up while the process works so users don't try to double click, and it disappears on success or error.

If the name is valid and we get a successful response from Google, we alert the user of success, then immediately add a row with their entered data to the signup sheet for which they submitted.

The data goes to Google, and if they reload the page, their name and time is still there, but this time coming from the script above that displays Google's data.
```javascript
$('form.signupForm').submit(function(e) {
  // stop form from reloading the page
  e.preventDefault();
  // Show loading screen
  $('#loading').fadeIn();

  var
  available = [],
  name = $(this).find('input[name="player_name"]').val(),
  postTo = $(this).data('postto'),
  timeFrame = $(this).find('input[name="time_frame"]'),
  $form = $(this);

  if (checkName(name)) { // if entered name exists in current roster
    // find the raid time(s) the user has selected and push their values to an array
    $form.find('input[type="checkbox"]').each(function() {
      if ($(this).is(':checked')) {
        available.push($(this).val());
      }
    });
    // turn the array into a string to and put it in the input that goes to Google
    available = available.join(', ');
    timeFrame.val(available);
    // Turn form into object and send to Google
    $.ajax({
      url: 'https://script.google.com/macros/s/' + postTo + '/exec',
      method: "GET",
      dataType: "json",
      // .serializeObject() requires some prerequisite code, FYI
      data: $form.serializeObject(),
      success: function(response) {
        console.log(response);
        // get rid of loading animation
        $('#loading').fadeOut();
        // alert user of successful registration
        alert(
          'Nice, you\'ve been added to the list for '
          + $form.closest('.signupSheet').attr('id') +
          ', ' + name + '!'
        );
        // add to signup sheet immediately
        $form.closest('.signupSheet')
          // first get rid of "no one signed up" message if user is first to register
          .find('.signupSheet-empty')
          .hide()
          .end()
          // create new row in table and append entered data
          .find('.signupSheet-content')
          .append(
            '<div class="j-row signupSheet-entry">' +
            '<div class="j-col j-col-6" data-th="Player"><span class="signupSheet-player">' + name + '</span></div>' +
            '<div class="j-col j-col-6" data-th="Available"><span class="signupSheet-availability">' + timeFrame.val() + '</span></div>'
          );
      },
      error: function(response) {
        console.log(response);
        alert('Sorry, looks like there was an error signing you up. Please try again, and if the issue persists, get a hold of kuro.');
        // get rid of loading animation
        $('#loading').fadeOut();
      }
    });

	} else { // if user entered an invalid name

    console.log('Error: no record of ' + name + ' in Reign of Iron roster.');
    alert('Sorry, no record of ' + name + ' in the Reign of Iron roster. Please make sure you\'re using your Battletag and that you\'ve spelled it correctly.');
    // get rid of loading animation
    $('#loading').fadeOut();
  }

});
```
Cool! Oh, yeah, on the back end, I basically pasted together some code I found on Stack Overflow to make Google Apps Scripts handle external write requests and reset the sheets every week.
```javascript
function doGet(e){
  return handleResponse(e);
}
var SHEET_ID = ""; // whatever the sheet ID was for this signup sheet
var SHEET_NAME = "Sheet1";

var SCRIPT_PROP = PropertiesService.getScriptProperties();

function handleResponse(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);

  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(SHEET_NAME);
    var headRow = e.parameter.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row = [];
    // loop through the header columns
    for (i in headers){
      if (headers[i] == "Timestamp"){ // special case if you include a 'Timestamp' column
        row.push(new Date());
      } else { // else use header name to get data
        row.push(e.parameter[headers[i]]);
      }
    }
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    // return json success results
    return ContentService
          .createTextOutput(JSON.stringify({"result":"success", "row": nextRow}))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function setUp() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}

function clearRaid() {  
  var sheetActive = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  sheetActive.getRange('A2:B').clearContent();
}
```
I'd say I understand like 80% of this. It's remarkably similar to JavaScript, but still, I haven't fully read the documentation yet. StackOverflow is your friend though.

Regardless, it works! And it works well.

<div class="callout">
<div class="callout-content">
<div class="j-row">
<div class="j-col j-col-9">
<img src="/assets/img/projects/destiny-2-clan-website-raid-signup.png" alt="Destiny 2 Clan Reign of Iron Raid Signups">
</div>
<div class="j-col j-col-3">
<img src="/assets/img/projects/destiny-2-clan-website-raid-signup-mobile.png" alt="Destiny 2 Clan Reign of Iron Raid Signups">
</div>
</div>
</div>
</div>

## The Results

Feedback from the clan is overwhelmingly positive. People love being able to search for their name and see their stats, and the raid signup system is a _hit_. We have people signing up a week in advance, and seeing that other people are signed up encourages more to sign up, meaning _more raids_!

I had a lot of fun coding this site, and I'm glad my clanmates are having fun using it.

If you want to see us play Destiny 2, follow me on Twitch at [@KuroNoShinigami](https://twitch.tv/KuroNoShinigami).
