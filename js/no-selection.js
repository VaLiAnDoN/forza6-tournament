/* Отмена выделения интерфейса; действия в полях редактирования не блокируются. */
(function () {
  function editable(node) {
    var el = node && (node.nodeType === 1 ? node : node.parentElement);
    return !!(el && (el.isContentEditable || (el.closest && el.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]'))));
  }
  document.addEventListener('selectstart', function (event) {
    if (!editable(event.target)) event.preventDefault();
  });
  document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'a' && !editable(event.target)) {
      event.preventDefault();
      var selection = window.getSelection && window.getSelection();
      if (selection) selection.removeAllRanges();
    }
  });
})();
