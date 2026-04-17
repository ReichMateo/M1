document.addEventListener('DOMContentLoaded', () => {
  const modal = createModal();
  document.body.appendChild(modal);

  const buttons = document.querySelectorAll('.compare-button');
  buttons.forEach(button => button.addEventListener('click', handleCompareClick));

  const searchInput = document.getElementById('gpu-search');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  const closeButton = modal.querySelector('.modal-close');
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function handleCompareClick(event) {
    event.preventDefault();
    const card = event.currentTarget.closest('.card');
    if (!card) return;

    const title = card.querySelector('h2')?.textContent.trim() || 'GPU';
    const description = card.querySelector('p')?.textContent.trim() || '';
    const specs = Array.from(card.querySelectorAll('.spec')).map(spec => ({
      label: spec.querySelector('strong')?.textContent.trim() || '',
      value: spec.querySelector('span')?.textContent.trim() || ''
    }));

    populateModal(title, description, specs);
    modal.classList.add('active');
  }

  function populateModal(title, description, specs) {
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-description').textContent = description;

    const list = modal.querySelector('.modal-list');
    list.innerHTML = '';

    specs.forEach(spec => {
      const item = document.createElement('li');
      item.innerHTML = `<strong>${spec.label}</strong><span>${spec.value}</span>`;
      list.appendChild(item);
    });
  }

  function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const isVisible = query === '' || text.includes(query);
      card.style.display = isVisible ? '' : 'none';
    });
  }

  function closeModal() {
    modal.classList.remove('active');
  }
});

function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3 class="modal-title">Comparación</h3>
        <button class="modal-close" aria-label="Cerrar ventana">×</button>
      </div>
      <div class="modal-body">
        <p class="modal-description"></p>
        <ul class="modal-list"></ul>
      </div>
    </div>
  `;
  return modal;
}
