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
```
