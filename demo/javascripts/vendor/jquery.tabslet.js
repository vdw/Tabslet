/**
 * Tabs plugin
 *
 * @copyright	Copyright 2012, Dimitris Krestos
 * @license		Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link		http://vdw.staytuned.gr
 * @version		v1.2.0
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
			mouseevent: 'click',
			attribute:  'href',
			animation:  false,
			autorotate: false,
			delay:      6000,
			active:     1
		};

		var options = $.extend(defaults, options);

		$(this).each(function() {

			var $this = $(this);

			$this.find('> div').hide();
			$this.find('> div').eq(options.active - 1).show();
			$this.find('> ul li').eq(options.active - 1).addClass('active');

			var fn = eval(

				function() {

					$(this).trigger('_before');

					$this.find('> ul li').removeClass('active');
					$(this).addClass('active');
					$this.find('> div').hide();

					var currentTab = $(this).find('a').attr(options.attribute);

					if (options.animation) {

						$this.find(currentTab).animate( { opacity: 'show' }, 'slow', function() {
							$(this).trigger('_after');
						});

					} else {

						$this.find(currentTab).show();
						$(this).trigger('_after');

					}

					return false;

				}

			);

			var init = eval("$this.find('> ul li')." + options.mouseevent + "(fn)");

			init;

			// Autorotate
			var elements = $this.find('> ul li'), i = options.active - 2; // ungly

			function next() {

				i = ++i % elements.length; // wrap around

				options.mouseevent == 'hover' ? elements.eq(i).trigger('mouseover') : elements.eq(i).click();

				var t = setTimeout(next, options.delay);

				$this.mouseover(function () {
					clearTimeout(t);
				});

			}

			if (options.autorotate) {

				setTimeout(next, 0);

			}

		});

	};

	$(document).ready(function () { $('[data-toggle="tabslet"]').tabslet(); });

})(jQuery);