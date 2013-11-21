Reaktion JS
========

Reaktion JS is a simple, lightweight jQuery plugin for generating responsive navigation menus. It allows developers to get up and running extremely quickly and is completely customizable through CSS and plugin options.


Usage
------

Add the css file to the head of your document (Font Awesome is optional but recommended):

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

