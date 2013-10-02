/**
 * Draft Tests using QUnit
 *
 */

$(".tabs").tabslet();

test( "Initialization", function() {
  equal($('.tabs').find('DIV').is(':hidden'), true, "Tabs are hidden");
  equal($('.tabs').find('DIV:first').is(':visible'), true, "First tab is visible");
});

