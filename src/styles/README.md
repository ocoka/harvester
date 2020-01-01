adopted from https://github.com/doot0/compago

###### Style composure
As long as you're not writing an [utils](#utils) or a [generic](#generics),
you should use [BEM](#bem) to compose your styles.

###### Variables & private variables
A good starting point would be the `01-settings` file. You should place all
your variables that you'll need global access to in here.

In some cases, you will need to define private variables on a per-file basis.
You should try and avoid using too many of these as they will make your
components less re-usable.

---

### Documentation

##### Namespaces

Namespacing your styles is important. It provides instant feedback about what a
given classname does and what it is likely to affect.

- `o-` - Object
- `c-` - Component
- `i-` - Immutable
- `u-` - Utilitary style
- `is-, has-` - Stateful (used for stateful styling, also in utils level)
- `js-` - JS binding (for targeting with JavaScript)

One added bonus you get from namespacing your classnames is that while you are
authoring your UI, most auto-complete features in editors will hint all classes
belonging to a given namespace.

##### Structure
The structure is as follows.

```
styles/
├─ 01-settings
├─ 02-tools
same level of ITCSS triangle
├─ 031-generics (resets for example)
├─ 032-base (typography and standard elements styling)
├─ 033-vendors (some third parties)
├─ 04-objects
├─ 05-components
same level of ITCSS triangle
├─ 061-immutables (utils that has !importnant modifier)
├─ 062-utils
```

##### Configuration
> `01-settings` - *Variables 'n such*

You should place variables for your project in this folder. If you have lots of
sets of similar data, for example a colour palette, or margins/paddings, then
it's a good idea to define them as a map;

``` stylus
$settings = {
  colors: {
    'primary': #2dd3d3,
    'negative': #b3343a,
    'positive': #5ada55
  }
}
```
``` scss
$settings_colors: (
    'primary': #2dd3d3,
    'negative': #b3343a,
    'positive': #5ada55
  )
```

##### Tools
> `02-tools` - *Mixins and functions that consume the configs*

Most of the mixins/functions that you write should help retrieve values from
your configuration files.

##### Generics
> `031-generics` - *Resets*

Generics have the possibility of imposing very
greedy styles and should be added as little as possible. A reset is perhaps
the only acceptable use case where far-reaching & greedy styles are acceptable.
Grid systems are also classed as a generic.

##### Base
> `032-base` - *Element styles e.g. h1, p, ul*

Base styles should also be used at a minimum, as most of your base element
styling should take place in your reset, with the exception of typography.
Attaching styles to base elements can severely reduce their re-usability.


##### Objects
> `05-objects` - *Re-usable UI patterns*

*Namespace:* `o-`

Objects represent a repeatable UI pattern that should work in any given
context, regardless of its scope. You should author objects with immutability
and extensibility in mind. Once you have authored an object, you should never
modify the core styles related to it, as refactoring an object that is already
widely used will most likely cause unexpected behaviour.

You should only extend an object using a BEM modifier
(`_` delimited classname). This way you can change the behaviour of an
object class without worrying about it affecting the base object.

##### Components
> `06-components` - *Bespoke UI implementations*

*Namespace:* `c-`

Components are bespoke, implementation-specific pieces of UI. In most cases,
you should use component classes to structure the layout of a given piece of
UI. Components can be used in conjunction with [atomics](#atomics) and
[objects](#objects) to add context-specific modifications.

An example:

``` html
<div class="o-avatar c-profile-avatar">
  This is a base avatar layout (.o-avatar) with additional modifications
  imposed by the component-specific implementation (.c-profile-avatar).
</div>
```

##### Utils
> `071-immutables`, `072-utils` - *Atomic style classes, without the terseness*

*Namespace:* `u-`

This is where you should write classes that do one thing and one thing only.
It is a good idea to generate your atomics based on the contents of your
configuration files, using mixins & functions that you author in the tools
folder.

##### Immutables
> `071-immutables` - *Stuff with `!important` in it.*

*Namespace:* `i-`

It's pretty common knowledge that using `!important` is bad practice, as it
is a very ham-fisted way of ensuring that a property does exactly what you
want. There is however, one use-case for `!important` being acceptable, and
this is for proactive use, as opposed to reactive use.

An almost painfully simple example:

``` css
.i-hidden {
  display: none !important;
}
```
---

### Influences

##### Atomic
Atomic's style presents you with many classes that all serve a single
purpose. They obey the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
(SRP), which is a paradigm of good-practice programming. Using this in CSS
seems absolutely sensible.

This framework's [atomics](#atomics) are inspired by Atomic and also follow
the SRP, but does away with the extremely terse nature of their classnames,
which make readability and their implied effects difficult to read at a glance.

##### BEM
BEM is [Block, Element, Modifier](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).
Acceptable classname composure is below;

``` css
.block {}
.block_modifier {}
.block__element {}
.block__element_modifier {}
```

BEM is used when building components & objects, but does not apply to atomics
within the purview of this framework. BEM-built class composure is still
very re-usable, but doesn't come close to the re-usability of
[atomics](#atomics).

##### ITCSS
The structure of this framework is greatly influenced by Harry Roberts'
[ITCSS](http://csswizardry.net/talks/2014/11/itcss-dafed.pdf).

##### OTHER READING NOT USED HERE

OOCSS/Atomic CSS are Responsive Web Design ‘anti-patterns’ – Ben Frain [LINK](https://benfrain.com/oocss-atomic-css-responsive-web-design-anti-pattern/)

BEM & Atomic Design: A CSS Architecture Worth Loving | Lullabot [LINK](https://www.lullabot.com/articles/bem-atomic-design-a-css-architecture-worth-loving)

Learn about CSS Architecture: Atomic CSS - SitePoint [LINK](https://www.sitepoint.com/atomic-css/)

Let’s Define Exactly What Atomic CSS is | CSS-Tricks [LINK](https://css-tricks.com/lets-define-exactly-atomic-css/)

The Problem with Atomic CSS – Simple = Human – Medium [LINK](https://medium.com/simple-human/the-problem-with-atomic-css-d0c09c7aa38e)

On the Growing Popularity of Atomic CSS | CSS-Tricks [LINK](https://css-tricks.com/growing-popularity-atomic-css/)

How to write better CSS in teams with ACSS — A dynamic Atomic CSS library [LINK](https://medium.freecodecamp.org/acss-a-dynamic-atomic-css-library-402dff9756e0)

Modules - MaintainableCSS - an approach to writing modular, scalable and maintainable CSS | By Adam Silver [LINK](https://maintainablecss.com/chapters/modules/)

Why is Vertical Rhythm an Important Typography Practice? [LINK](
https://zellwk.com/blog/why-vertical-rhythms/)
