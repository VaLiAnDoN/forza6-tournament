/* Не мешаем копированию данных и редактированию полей. */
(function () {
  function allowed(node) {
    var el = node && (node.nodeType === 1 ? node : node.parentElement);
    return !!(el && (el.isContentEditable || (el.closest && el.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), .pw .tbl td'))));
  }
  document.addEventListener('selectstart', function (event) {
    if (!allowed(event.target)) event.preventDefault();
  });
  document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && !event.altKey && String(event.key).toLowerCase() === 'a' && !allowed(event.target)) {
      event.preventDefault();
    }
  });
})();
