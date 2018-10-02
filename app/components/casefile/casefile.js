var Casefile = function(container) {
  this.container = container;
  this.documents = container.find('.jui-cf__files');
  this.comments = container.find('.jui-cf__document-comments');
  this.documentsButton = container.find('.jui-cf__toolbar-button--documents');
  this.commentsButton = container.find('.jui-cf__toolbar-button--comments');
  this.documentsButton.on('click', $.proxy(this, 'onButtonDocumentsClick'));
  this.commentsButton.on('click', $.proxy(this, 'onButtonCommentsClick'));
  this.showDocuments();
  this.hideComments();
};


Casefile.prototype.hideComments = function() {
  this.comments.hide();
  this.commentsButton.attr('aria-pressed', 'false');
};


Casefile.prototype.hideDocuments = function() {
  this.documents.hide();
  this.documentsButton.attr('aria-pressed', 'false');
};


Casefile.prototype.showComments = function() {
  this.comments.show();
  this.commentsButton.attr('aria-pressed', 'true');
};


Casefile.prototype.showDocuments = function() {
  this.documents.show();
  this.documentsButton.attr('aria-pressed', 'true');
};


Casefile.prototype.onButtonDocumentsClick = function(e) {
  this.showDocuments();
  this.hideComments();
};


Casefile.prototype.onButtonCommentsClick = function(e) {
  this.showComments();
  this.hideDocuments();
};