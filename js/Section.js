class Section {
    constructor ({ data, renderer }, container) {
        this._items = data;
        this._renderer = renderer;
        this._container = document.querySelector(container);
        //data - object: items (array - данных), renderer (function вставка array в разметку)
        //container - туда нужно добавлять элементы (селектор)
    }

    drawAllItems() {
        this._items.forEach(element => {
            this._renderer(element);
        });
        //отрисовка всех элементов
        // Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    }

    addItem(element) {
        this._container.prepend(element);
        //принимает DOM-элемент и добавляет его в контейнер.
    }


}