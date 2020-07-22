export default class Section {
    constructor ({ data, renderer }, container) { //renderer — это функция, которая отвечает за создание и отрисовку данных на странице. 
        this._items = data;
        this._renderer = renderer; 
        this._container = document.querySelector(container);
    }

    renderItems() { 
        this._items.forEach((item) => {
            this._renderer(item);
        } 
        )}

    addItem(element) { 
        this._container.prepend(element);
        //принимает DOM-элемент и добавляет его в контейнер.
    }

}
