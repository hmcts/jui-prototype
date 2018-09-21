// Check for contenteditable support
var isContentEditableSupported = 'contentEditable' in document.documentElement;


// If supported replace with enhanced textarea
if(isContentEditableSupported == true) {

  var Editor = function(container) {
    this.container = $(container).parent();
    this.createToolbar();
    this.hideDefault();
    this.configureToolbar();
    this.container.on('click', '.jui-editor__toolbar-button', $.proxy(this, 'onButtonClick'));
    this.container.on('input', '.jui-editor__content', $.proxy(this, 'updateTextarea'));

    this.keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40
    };

  };


  var html = `<div class="jui-editor__toolbar" role="toolbar">
                <button class="jui-editor__toolbar-button jui-editor__toolbar-button--bold" data-command="bold"><span class="govuk-visually-hidden">Bold</span></button>
                <button class="jui-editor__toolbar-button jui-editor__toolbar-button--italic" data-command="italic"><span class="govuk-visually-hidden">Italic</span></button>
                <button class="jui-editor__toolbar-button jui-editor__toolbar-button--underline" data-command="underline"><span class="govuk-visually-hidden">Underline</span></button>
                <span class="jui-editor__toolbar-seperator"></span>
                <button class="jui-editor__toolbar-button jui-editor__toolbar-button--unordered-list" data-command="insertUnorderedList"><span class="govuk-visually-hidden">Unordered list</span></button>
                <button class="jui-editor__toolbar-button jui-editor__toolbar-button--ordered-list" data-command="insertOrderedList"><span class="govuk-visually-hidden">Ordered list</span></button>
              </div>
              <div class="jui-editor__content govuk-textarea" contenteditable="true" spellcheck="false"></div>`;

  Editor.prototype.hideDefault = function() {

    this.label = this.container.find('label')[0];
    this.label.classList.add('govuk-visually-hidden');
    this.label.setAttribute('aria-hidden', true);

    this.textarea = this.container.find('textarea')[0];
    this.textarea.classList.add('govuk-visually-hidden');
    this.textarea.setAttribute('aria-hidden', true);
    this.textarea.setAttribute('tabindex', '-1');

  };


  Editor.prototype.createToolbar = function() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'jui-editor';
    this.toolbar.innerHTML = html;
    this.container.append(this.toolbar);
  };


  Editor.prototype.configureToolbar = function() {
    this.buttons = this.container.find('.jui-editor__toolbar-button');
    this.buttons.prop('type', 'button');
    this.buttons.prop('tabindex', '-1');

    var firstTab = this.buttons.first();
    firstTab.prop('tabindex', '0');

  };



  Editor.prototype.onTabKeydown = function(e) {
    switch(e.keyCode) {
      case this.keys.left:
      case this.keys.up:
        alert('Previous button');
        break;
      case this.keys.right:
      case this.keys.down:
        alert('Next button');
        break;
    }
  };





  Editor.prototype.onButtonClick = function(e) {
    document.execCommand($(e.currentTarget).data('command'), false, null);
  };


  Editor.prototype.getContent = function() {
    return this.container.find('.jui-editor__content')[0].innerHTML;
  };


  Editor.prototype.updateTextarea = function(e) {
    var content = this.getContent();
    var textarea = this.container.find('.js-editor');
    document.execCommand('defaultParagraphSeparator', false, 'p');
    textarea.val(content);
  };


}