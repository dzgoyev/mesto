export default class Section {
    constructor ({ data, renderer }, container) { //renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
        this._items = data;
        this._renderer = renderer; 
        this._container = document.querySelector(container);
       //data, renderer: при создании экз Section в index.js в его свойство (переменную) data попадает InitialCards (data: InitialCards)), а в св-во  renderer функция, которая принимает на вход объект
    }

    renderItems() { 
        this._items.forEach(item => { //взять  каждый элемент массива и применить к нему функцию которая отвечает за создание и отрисовку на странице
            this._renderer(item); //item - это каждый отдельный элемент массива
        });
        //отрисовка всех элементов
        // Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    }

    addItem(element) {
        this._container.prepend(element);
        //принимает DOM-элемент и добавляет его в контейнер.
    }

}
