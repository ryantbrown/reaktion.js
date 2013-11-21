Reaktion JS
========

Reaktion JS is a simple, lightweight but flexible jQuery plugin for generating responsive, nested navigation menus. It allows developers to get up and running extremely quickly and is completely customizable through CSS and plugin options. For more information including documentation and integration examples please visit the [Reaktion JS website](http://reaktionjs.com)

Demo
------

You can view several different demo's on the Reaktion JS [Project Website](http://reaktionjs.com/demos)

Usage
------

Add the css file to the `<head>` of your document (Font Awesome is optional but recommended):

```html
<link rel="stylesheet" href="/css/reaktion.css" />
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" >
```

Add jQuery and Reaktion JS at the bottom of your document before the end `</body>` tag:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="reaktion.min.js"></script>
```

Create the navigation menu markup:

```html
<div class="nav">
	<ul>
		<li><a href="#">Menu Item</a></li>
		<li><a href="#">Menu Item</a>
			<ul>
				<li><a href="#">Sub Menu Item</a></li>
				<li><a href="#">Sub Menu Item</a></li>
				<li><a href="#">Sub Menu Item</a></li>
			</ul>
		</li>
		<li><a href="#">Menu Item</a></li>
		...
	</ul>
</div>
```

And finally call the plugin:

```html
<script>
$(function(){ 
	$('.nav').reaktion(); 
});
</script>
```

Customization
------

There are 2 ways to customize Reaktion JS, one is through plugin options and the other is through CSS:

### Options


| Option | Default | Type | Description |
| -------| --------| -----| ------------|
| breakPoint | `768` | int | Refers to the viewport width and determines when the navigation changes to the "mobile" form.|
| navIcon | `<i class="fa fa-bars"></i>` | string | The HTML (or text) that represents the mobile icon. The mobile is icon is what gets clicked to reveal the menu |
| arrows | `true` | bool | Whether or not to include the arrows for the sub menus. If `false` the arrows will not be visible. If you want to only include the arrows on the "mobile" version of the menu then you can use CSS to hide them for the default menu. |


```html
<script>
$(function(){ 
	$('.nav').reaktion({
		breakPoint: 768, // Refers to the viewport width
	    navIcon: '<i class="fa fa-bars"></i>',
	    arrows: true,
	    arrowIcon: '<i class="fa fa-chevron-down"></i>',
	    arrowsToggleOnly: true,
	    animate: true,
	    effect: 'slide',
	    speed: 300,
	    animateSubNav: true,
	    subNavEffect: 'slide',
	    subNavSpeed: 300
	});
});
</script>
```


### CSS





