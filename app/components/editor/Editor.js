var Editor = function(container) {
  this.container = container;
  this.keys = { left: 37, right: 39, up: 38, down: 40 };
  this.visuallyHidden = 'govuk-visually-hidden';
};


Editor.prototype.setupHTML = function() {

  alert('Done');

  this.setupHtml();
};


// function Editor(el) {
//   var textarea = el;
//   var container = $(el).parent();

//   var html = `
//     <div class="jui-editor">
//       <div class="jui-editor__toolbar" role="toolbar">
//         <button type="button" class="jui-editor__toolbar-button jui-editor__toolbar-button--bold" data-command="bold" tabindex="0"><span class="govuk-visually-hidden">Bold</span></button>
//         <button type="button" class="jui-editor__toolbar-button jui-editor__toolbar-button--italic" data-command="Italic" tabindex="-1"><span class="govuk-visually-hidden">Italic</span></button>
//         <button type="button" class="jui-editor__toolbar-button jui-editor__toolbar-button--underline" data-command="underline" tabindex="-1"><span class="govuk-visually-hidden">Underline</span></button>
//         <span class="jui-editor__toolbar-seperator"></span>
//         <button type="button" class="jui-editor__toolbar-button jui-editor__toolbar-button--unordered-list" data-command="insertUnorderedList" tabindex="-1"><span class="govuk-visually-hidden">Unordered list</span></button>
//         <button type="button" class="jui-editor__toolbar-button jui-editor__toolbar-button--ordered-list" data-command="insertOrderedList" tabindex="-1"><span class="govuk-visually-hidden">Ordered list</span></button>
//       </div>
//       <div class="jui-editor__content govuk-textarea" contenteditable></div>
//     </div>
//   `

//   container.append(html);

//   $(textarea).addClass('govuk-visually-hidden');

//   container.find('.jui-editor__toolbar-button').click(function(e) {
//     var command = $(this).data('command');
//     document.execCommand($(this).data('command'), false, null);
//   });

//   container.find('.jui-editor__content ').on('input', function() {
//     textarea.val(this.innerHTML);
//   })
// }


// new Editor($('.trevor'));