var ToolbarMenu = function(container) {
  this.container = container;
  this.button = container.find('.jui-toolbar__menu-button');
  this.menu = container.find('.jui-toolbar__menu-content');
  this.button.on('click', $.proxy(this, 'onButtonClick'));
};

ToolbarMenu.prototype.onButtonClick = function() {
  if(this.menu.hasClass('js-hidden')) {
    this.menu.removeClass('js-hidden');
    this.button.attr('aria-expanded', 'true');
  } else {
    this.menu.addClass('js-hidden');
    this.button.attr('aria-expanded', 'false');
  }
};

var Toolbar = function() {
  this.container = $('.jui-toolbar');
  this.menuContainers = this.container.find('.jui-toolbar__menu');
  this.setupMenus();
};

Toolbar.prototype.setupMenus = function() {
  this.menuContainers.each($.proxy(function(index, el){
    new ToolbarMenu($(el));
  }, this));
};