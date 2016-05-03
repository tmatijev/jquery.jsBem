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

<button>Trigger class <strong>Tall</strong>!</button>
<button>Trigger class <strong>Short</strong>!</button>
```

Use case is that if button is clicked, CSS class should be added on person and add BEM modifier. We want to have 2 different classes - tall, short and medium and each one of them will have different styles for each BEM element (hand & leg). But, if nothing is clicked, default sizes will be applied (in other words, class without modifier in this case is same as "default" or "average").

