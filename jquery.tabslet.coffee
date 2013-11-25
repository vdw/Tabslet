#
# Tabs plugin
#
# @copyright Copyright 2012, Dimitris Krestos
# @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
# @link    http://vdw.staytuned.gr
# @version   v1.3.0


# Sample html structure

# <div class='tabs'>
#   <ul class='horizontal'>
#     <li><a href="#tab-1">Tab 1</a></li>
#     <li><a href="#tab-2">Tab 2</a></li>
#     <li><a href="#tab-3">Tab 3</a></li>
#   </ul>
#   <div id='tab-1'></div>
#   <div id='tab-2'></div>
#   <div id='tab-3'></div>
# </div>

(($, window, undefined_) ->
  "use strict"
  $.fn.tabslet = (options) ->
    defaults =
      mouseevent: "click"
      attribute: "href"
      animation: false
      autorotate: false
      delay: 6000
      active: 1
      controls:
        prev: ".prev"
        next: ".next"

    options = $.extend(defaults, options)
    $(this).each ->

      # ungly
      i = options.active - 1

      forward = ->
        i = ++i % elements.length # wrap around
        (if options.mouseevent is "hover" then elements.eq(i).trigger("mouseover") else elements.eq(i).click())
        t = setTimeout(forward, options.delay)
        $this.mouseover ->
          clearTimeout t

      move = (direction) ->
        i = ++i % elements.length  if direction is "forward" # wrap around
        i = --i % elements.length  if direction is "backward" # wrap around
        elements.eq(i).click()

      $this = $(this)
      $this.find("> div").hide()
      $this.find("> div").eq(options.active - 1).show()
      $this.find("> ul li").eq(options.active - 1).addClass "active"

      fn = ->
        $(this).trigger "_before"
        $this.find("> ul li").removeClass "active"
        $(this).addClass "active"
        $this.find("> div").hide()
        currentTab = $(this).find("a").attr(options.attribute)
        if options.animation
          $this.find(currentTab).animate
            opacity: "show"
          , "slow", ->
            $(this).trigger "_after"

        else
          $this.find(currentTab).show()
          $(this).trigger "_after"
        false

      init = `eval("$this.find('> ul li')." + options.mouseevent + "(fn)");`

      init

      # Autorotate
      elements = $this.find("> ul li")

      setTimeout forward, 0  if options.autorotate

      $(this).find(options.controls.next).click ->
        move "forward"

      $(this).find(options.controls.prev).click ->
        move "backward"

  $(document).ready ->
    $("[data-toggle=\"tabslet\"]").tabslet()

) jQuery