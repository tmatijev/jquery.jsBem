jquery.jsBem
==========================

This jQuery plugin allows you to use BEM properly with JavaScript class addition.

## Issue Explanation ##

I will take a quick example and try to explain why in the first place I needed this plugin ... Often you need to add a class to HTML element after certain event / interaction (click, hover, focus etc.). If you are not using BEM, these things are very easy. But, if you want to use BEM properly, this could be really pain.

Let's take a look at this HTML code:

```html
<div class="person">
    <div class="person__hand">
        Person hand
    </div>
    
    <div class="person__leg">
        Persona leg
    </div>
</div>

<button class="js-trigger" data-prop="tall">Trigger class <strong>Tall</strong>!</button>
<button class="js-trigger" data-prop="short">Trigger class <strong>Short</strong>!</button>
```

Use case is that if button is clicked, CSS class should be added on person and add BEM modifier. We want to have 2 different classes - tall, short and medium and each one of them will have different styles for each BEM element (hand & leg). But, if nothing is clicked, default sizes will be applied (in other words, class without modifier in this case is same as "default" or "average").

So, problem with BEM is that you need to have pre-entered CSS values all the time. If we want person to be "tall", HTML would look like this:

```html
<div class="person person--tall">
    <div class="person__hand person--tall__hand">
        Person hand
    </div>
    
    <div class="person__leg person--tall__leg">
        Persona leg
    </div>
</div>
```

So, person would share default styles for the hand & leg and just add different size for tall modifier. Problem is, that person--tall__hand shouldn't exist in the HTML at this point because CSS styles will applied before click. If we click on the button and trigger "tall" class, modifier will be added like this:

```html
<div class="person person--tall">
    <div class="person__hand">
        Person hand
    </div>
    
    <div class="person__leg">
        Persona leg
    </div>
</div>
```

But this is not good enough if we want to follow BEM rules. CSS output for tall person hand would be:

```scss
.person {
    
}
```
