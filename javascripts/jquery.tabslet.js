/**
 * Tabs plugin
 *
 * @copyright	Copyright 2012, Dimitris Krestos
 * @license		Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link		http://vdw.staytuned.gr
 * @version		v1.0.0
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

(function($) {

	$.fn.tabslet = function(options) {

		var defaults = {
			mouseevent: 'click',
			attribute: 'href',
			animation: false
		};

		var options = $.extend(defaults, options)

		$(this).each(function() {

			var $this = $(this);

			$this.find('> div').hide()
			$this.find('> div:first').show()
			$this.find('> ul li:first').addClass('active')

			var fn = eval(

				function() {

					$this.find('> ul li').removeClass('active')
					$(this).addClass('active')
					$this.find('> div').hide()

					var currentTab = $(this).find('a').attr(options.attribute)

					if (options.animation) {

						$this.find(currentTab).animate( { opacity: 'show' }, 'slow' )

					} else {

						$this.find(currentTab).show()

					}

					return false

				}

			)

			var init = eval("$this.find('> ul li')." + options.mouseevent + "(fn)")

			init

		})

	}

	$(document).ready(function () { $('[data-toggle="tabslet"]').tabslet() })

})(jQuery);