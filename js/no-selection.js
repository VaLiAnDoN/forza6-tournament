/* Отмена выделения интерфейса; поля ввода остаются редактируемыми. */
(function () {
  function editable(node) {
    var el = node && (node.nodeType === 1 ? node : node.parentElement);
    return !!(el && (el.isContentEditable || (el.closest && el.closest('input, textarea, [contenteditable=""], [contenteditable="true"]'))));
  }
  function clear() {
    var s = window.getSelection && window.getSelection();
    if (s && s.rangeCount && !editable(s.anchorNode)) s.removeAllRanges();
  }
  document.addEventListener('selectstart', function (e) { if (!editable(e.target)) e.preventDefault(); }, true);
  document.addEventListener('dragstart', function (e) { if (!editable(e.target)) e.preventDefault(); }, true);
  document.addEventListener('contextmenu', function (e) { if (!editable(e.target)) e.preventDefault(); }, true);
  document.addEventListener('mouseup', clear, true);
  document.addEventListener('touchend', function () { setTimeout(clear, 0); }, true);
  document.addEventListener('selectionchange', clear);
  document.addEventListener('dblclick', function (e) { if (!editable(e.target)) { e.preventDefault(); clear(); } }, true);
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && !e.altKey && String(e.key).toLowerCase() === 'a' && !editable(e.target)) {
      e.preventDefault(); clear();
    }
  }, true);
})();
