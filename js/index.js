  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.itemsList');
  const items = JSON.parse(localStorage.getItem('items')) || [];

  populateList(items, itemsList);

  function populateList(items, itemsList) {
    itemsList.innerHTML = items.map(function(item, index) {
     return `
      <li>
        <input type="checkbox" id="item${index}" data-index="${index}" ${item.done ? 'checked' : ''} >
        <label for="item${index}">${item.text}</label>
      </li>
      `;
    }).join('');
  }

  addItems.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = e.target.children[0].value;
    const item = {
      text,
      done: false
    };
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
    this.reset();
  })

  itemsList.addEventListener('click', function(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  })