/**
 * Draft Tests using QUnit
 *
 */

// Initialization
$('.tabs').tabslet();
$('.tabs_2').tabslet();
$('.tabs_3').tabslet({ active: 2 });
$('.tabs_4').tabslet();
$('.tabs_5').tabslet({ attribute: 'data-ref' });

// Tests
test( 'Initialization', function() {
  equal($('.tabs').find('DIV').is(':hidden'), true, 'Tabs are hidden');
  equal($('.tabs').find('DIV:first').is(':visible'), true, 'First tab is visible');
});

test( 'Default functionality', function() {
  $('.tabs_2').find('UL LI:first').next().find('A').click();

  equal($('.tabs_2').find('DIV:first').is(':hidden'), true, 'The first tab is hidden');
  equal($('.tabs_2').find('DIV:first').next().is(':visible'), true, 'Second tab is visible');
});

test( 'Option "active: 2"', function() {
  equal($('.tabs_3').find('DIV:first').is(':hidden'), true, 'The first tab is hidden');
  equal($('.tabs_3').find('DIV:first').next().is(':visible'), true, 'Second tab is visible');
  equal($('.tabs_3').find('DIV:first').next().next().is(':hidden'), true, 'The last tab is hidden');
});

test( 'Option "controls: { next: .next }"', function() {
  $('.next').click();

  equal($('.tabs_4').find('DIV:first').is(':hidden'), true, 'The first tab is hidden');
  equal($('.tabs_4').find('DIV:first').next().is(':visible'), true, 'Second tab is visible');
  equal($('.tabs_4').find('DIV:first').next().next().is(':hidden'), true, 'The last tab is hidden');
});

test( 'Option "attribute: data-ref"', function() {
  $('.tabs_5').find('UL LI:first').next().find('A').click();

  equal($('.tabs_5').find('DIV:first').is(':hidden'), true, 'The first tab is hidden');
  equal($('.tabs_5').find('DIV:first').next().is(':visible'), true, 'Second tab is visible');
  equal($('.tabs_5').find('DIV:first').next().next().is(':hidden'), true, 'The last tab is hidden');
});