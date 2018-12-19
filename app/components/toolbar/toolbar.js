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
  this.items = $('.jui-cf__files');
  this.comments = $('.jui-cf__document-comments');
  this.commentsButton = this.container.find('.jui-toolbar__menu-item--show-comments')
  this.itemsButton = this.container.find('.jui-toolbar__button--items');
  this.itemsButton.on('click', $.proxy(this, 'onButtonItemsClick'));
  this.commentsButton.on('click', $.proxy(this, 'onShowCommentsButtonClick'));
};

Toolbar.prototype.setupMenus = function() {
  this.menuContainers.each($.proxy(function(index, el){
    new ToolbarMenu($(el));
  }, this));
};

Toolbar.prototype.onShowCommentsButtonClick = function(e) {
  if(this.commentsButton.attr('aria-pressed') === 'true') {
    this.hideComments();
    this.showItems();
  } else {
    this.showComments();
    this.hideItems();
  }
  this.commentsButton.parents('.jui-toolbar__menu-content').addClass('js-hidden');
};

Toolbar.prototype.onButtonItemsClick = function(e) {
  if(this.itemsButton.attr('aria-pressed') === 'true') {
    this.hideItems();
    this.showComments();
  } else {
    this.hidewComments();
    this.showItems();
  }
};

Toolbar.prototype.hideComments = function() {
  $('.jui-cf').removeClass('jui-cf--show-comments');
  this.comments.hide();
  this.commentsButton.attr('aria-pressed', 'false');
};


Toolbar.prototype.hideItems = function() {
  this.items.hide();
  this.itemsButton.attr('aria-pressed', 'false');
};


Toolbar.prototype.showComments = function() {
  $('.jui-cf').addClass('jui-cf--show-comments');
  this.comments.show();
  this.commentsButton.attr('aria-pressed', 'true');
};


Toolbar.prototype.showItems = function() {
  this.items.show();
  this.itemsButton.attr('aria-pressed', 'true');
};


Toolbar.prototype.onButtonItemsClick = function(e) {
  this.showItems();
  this.hideComments();
};


Toolbar.prototype.onButtonCommentsClick = function(e) {
  this.showComments();
  this.hideItems();
};