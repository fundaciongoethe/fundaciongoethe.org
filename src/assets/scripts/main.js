// alpine import and initialization
import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.data('sortableList', (defaultSort, datasetAttr) => ({
  activeSort: defaultSort || 'random',

  sortBy(type) {
    this.activeSort = type;

    let items = [...document.querySelectorAll(`[data-${datasetAttr}]`)];

    if (type === 'random') {
      items.sort(() => Math.random() - 0.5);
    } else {
      items.sort((a, b) => {
        let aValue = a.getAttribute(`data-${type}`)?.trim().toLowerCase() || '';
        let bValue = b.getAttribute(`data-${type}`)?.trim().toLowerCase() || '';

        return aValue.localeCompare(bValue, 'es', { sensitivity: 'base', ignorePunctuation: true });
      });
    }

    let container = document.querySelector(`ul[role="list"]`);
    container.innerHTML = '';
    items.forEach((item) => container.appendChild(item));
  },
}));

Alpine.start();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {})
    .catch((error) => console.error('SW registration failed:', error));
}
