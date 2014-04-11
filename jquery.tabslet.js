/**
 * Tabs plugin
 *
 * @copyright	Copyright 2012, Dimitris Krestos
 * @license		Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link		http://vdw.staytuned.gr
 * @version		v1.4.2
 */

	/* Sample html structure

	<div class='tabs'>
		<ul class='horizontal'>
			<li><a href="#tab-1">Tab 1</a></li>
			<li><a href="#tab-2">Tab 2</a></li>
			<li><a href="#tab-3">Tab 3</a></li>
		</ul>
		<div id='tab-1'></div>
		<div id='tab-2'></div>
		<div id='tab-3'></div>
	</div>

	*/

;(function($, window, undefined) {
	"use strict";

	$.fn.tabslet = function(options) {

		var defaults = {
			mouseevent:    'click',
			attribute:     'href',
			animation:     false,
            		animationrate: 400,
			autorotate:    false,
			pauseonhover:  true,
			delay:         2000,
			active:        1,
			controls:      {
				prev: '.prev',
				next: '.next'
			}
		};

		var options = $.extend(defaults, options);

		return this.each(function() {

			var $this = $(this);

			// Ungly overwrite
			options.mouseevent    = $this.data('mouseevent') || options.mouseevent;
			options.attribute     = $this.data('attribute') || options.attribute;
			options.animation     = $this.data('animation') || options.animation;
			options.autorotate    = $this.data('autorotate') || options.autorotate;
			options.pauseonhover 	= $this.data('pauseonhover') || options.pauseonhover;
			options.delay 				= $this.data('delay') || options.delay;
			options.active 				= $this.data('active') || options.active;

			$this.find('> div').hide();
			$this.find('> div').eq(options.active - 1).show();
			$this.find('> ul li').eq(options.active - 1).addClass('active');

			var fn = eval(

				function() {

					$(this).trigger('_before');

					$this.find('> ul li').removeClass('active');
					$(this).addClass('active');
					var currentTab = $(this).find('a').attr(options.attribute),
			                    contents = $this.find('> div'),
			                    currentContent = $this.find(currentTab);
			
					if (options.animation) {
						contents.animate({opacity: 0}, options.animationrate).promise().done(function(){
							contents.css('display', 'none');
							currentContent.css('display', 'block');
							currentContent.animate( { opacity: 1 }, options.animationrate, function() {
								$(this).trigger('_after');
							});
						});
					} else {
						contents.hide();
						currentContent.show();
						$(this).trigger('_after');
					}

					return false;

				}

			);

			var init = eval("$this.find('> ul li')." + options.mouseevent + "(fn)");

			init;

			// Autorotate
			var elements = $this.find('> ul li'), i = options.active - 1; // ungly

			function forward() {

				i = ++i % elements.length; // wrap around

				options.mouseevent == 'hover' ? elements.eq(i).trigger('mouseover') : elements.eq(i).click();

				var t = setTimeout(forward, options.delay);

				$this.mouseover(function () {

					if (options.pauseonhover) clearTimeout(t);

				});

			}

			if (options.autorotate) {

				setTimeout(forward, 0);

				if (options.pauseonhover) $this.on( "mouseleave", function() { setTimeout(forward, 1000); });

			}

			function move(direction) {

				if (direction == 'forward') i = ++i % elements.length; // wrap around

				if (direction == 'backward') i = --i % elements.length; // wrap around

				elements.eq(i).click();

			}

			$this.find(options.controls.next).click(function() {
				move('forward');
			});

			$this.find(options.controls.prev).click(function() {
				move('backward');
			});

			$this.on ('destroy', function() {
				$(this).removeData();
			});

		});

	};

	$(document).ready(function () { $('[data-toggle="tabslet"]').tabslet(); });

})(jQuery);
