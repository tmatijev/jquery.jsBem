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

But this is not good enough if we want to follow BEM rules. Before showing SCSS code, I will just mention that I am using one handy mixin created for BEM and founded on [CSS Tricks](https://css-tricks.com/snippets/sass/bem-mixins/):

```scss
/// Block Element
/// @access public
/// @param {String} $element - Element's name
@mixin element($element) {
    &__#{$element} {
        @content;
    }
}

/// Block Modifier
/// @access public
/// @param {String} $modifier - Modifier's name
@mixin modifier($modifier) {
    &--#{$modifier} {
        @content;
    }
}
```

Knowing that, example follows:

```scss
.person {
    @include m('tall') {
        .person__hand {
            font-size: 2rem;
        }
        
        .person__leg {
            font-size: 4rem;
        }
    }
}
```

This can be achieved even more better, using parent root:

```scss
.person {
    $root: &;
    
    @include m('tall') {
        #{$root}__hand {
            font-size: 2rem;
        }
        
        #{$root}__leg {
            font-size: 4rem;
        }
    }
}
```

Output would look like this:

```css
.person--tall .person__hand {
    font-size: 2rem;
}
.person--tall .person__leg {
    font-size: 4rem;
}
```

But, I wanted to avoid all of this and use BEM without this fixes ... As you can see, BEM is all about one selector, and this is not the case.

## Main goal ##

Goal was to write natural / default BEM code and apply it only when classes are added. That would look like this:

```scss
.person {
    @include m('tall') {
        @include e('hand') {
            font-size: 2rem;
        }
        
        @include e('leg') {
            font-size: 4rem;
        }
    }
}
```

Which will have the following output:
 
```css
.person--tall__hand {
    font-size: 2rem;
}
.person--tall__leg {
    font-size: 4rem;
}
```

## Solution / Configuration ##

Example HTML code used in this project:

```html
<div class="person" data-bem-block="person">
    <h1>Person title</h1>
    <div class="person__hand bla-class classTest" data-bem="person">
        <h2 class="person__hand--left" data-bem="person">Left hand</h2>
        <h2 class="person__hand--right" data-bem="person">Right hand</h2>
    </div>
    
    <div class="person__leg" data-bem="person">
        <h2 class="person__leg--left" data-bem="person">Left leg</h2>
        <h2 class="person__leg--right" data-bem="person">Right leg</h2>
    </div>
    
    <div class="person--blind" data-bem="person">
        <div class="hand" data-bem-block="hand">
            <div class="hand__left" data-bem="hand">
                <div class="hand__left--open" data-bem="hand"></div>
            </div>
        </div>
    </div>
    
    <div class="person__hand__finger" data-bem="person"></div>
</div>
```

JavaScript init and configuration:

```javascript
$(function () {
    $('body').jsBem({
        bemESeparator: '__',
        bemMSeparator: '--',
        bemBlock: 'person',
        modifierClass: 'mod'
    });
    
    $('body').jsBem({
        bemESeparator: '__',
        bemMSeparator: '--',
        bemBlock: 'hand',
        modifierClass: 'mod'
    });
});
```

## Options ##

* __bemESeparator__ - BEM Element separator. You don't have to use default double underscore as BEM officialy proposed.
* __bemMSeparator__ - BEM Modifier separator. You can use either single underscore (officialy) or any other character. I am using two hyphens as Harry Roberts proposed.
* __bemBlock__ - BEM Block which will be targeted
* __modifierClass__ - Modifier name which will be appended

You can use block inside block just as in example. Important thing is that each block has it's own JavaScript init.

