// Span focusable not li

var Tree = function(container) {
  this.container = container;
  this.item = container.find('.jui-tree__item');
  this.folder = container.find('.jui-tree__folder');
  this.folderGroup = container.find('.jui-tree__folder-group');
  this.doc = container.find('.jui-tree__doc');
  this.docLink = container.find('.jui-tree__doc-link');
  this.keys = {left: 37, right: 39, up: 38, down: 40, enter: 13};
  this.container.on('click', '.jui-tree__folder', $.proxy(this, 'onFolderClick'));
  this.container.on('keydown', '.jui-tree__item', $.proxy(this, 'onContainerKeydown'));
  this.prepareTree();
};


Tree.prototype.prepareTree = function() {
  this.container.attr('role', 'tree');
  this.item.attr('role', 'treeitem');
  this.item.attr('tabindex', '-1');
  this.folderGroup.attr('role', 'group');
  this.docLink.attr('role', 'treeitem');
  this.item.each($.proxy(function(i, el) {
    if ($(el).hasClass('jui-tree__item--open')) {
      $(el).attr('aria-expanded', 'true');
    } else {
      $(el).attr('aria-expanded', 'false');
    }
  }, this));
  var firstLink = this.item.first();
  firstLink.attr('tabindex', '0');
};


Tree.prototype.onContainerKeydown = function(e) {
  var currentItem;
  switch(e.keyCode) {
    case this.keys.right:
    case this.keys.down:
      currentItem = this.getCurrentItem();
      var nextLink = currentItem.next('li');
      if(nextLink[0]) {
        nextLink.focus();
        currentItem.attr('tabindex', '-1');
        nextLink.attr('tabindex', '0');
      }
      break;
    case this.keys.left:
    case this.keys.up:
      currentItem = this.getCurrentItem();
      var previousLink = currentItem.prev('li');
      if(previousLink[0]) {
        previousLink.focus();
        currentItem.attr('tabindex', '-1');
        previousLink.attr('tabindex', '0');
      }
      break;
    case this.keys.enter:
      currentItem = this.getCurrentItem();
      this.onEnterKeyPressed(currentItem);
      break;
  }
};


Tree.prototype.onFolderClick = function(e) {
  var item = $(e.target).parent();
  if (item.hasClass('jui-tree__item--open')) {
    this.hide(item);
  } else {
    this.show(item);
  }
};


Tree.prototype.onEnterKeyPressed = function(currentItem) {
  if (currentItem.hasClass('jui-tree__item--open')) {
    this.hide(currentItem);
  } else {
    this.show(currentItem);
  }
};


Tree.prototype.getCurrentItem = function() {
  return this.container.find('.jui-tree__item[tabindex=0]');
};


Tree.prototype.show = function(item) {
  $(item).addClass('jui-tree__item--open');
  $(item).attr('aria-expanded', 'true');
};


Tree.prototype.hide = function(item) {
  $(item).removeClass('jui-tree__item--open');
  $(item).attr('aria-expanded', 'false');
};