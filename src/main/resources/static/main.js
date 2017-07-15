eval(load('util/option.js'));
eval(load('board/board.js'));

const constructors = {
  ListBoard: element => new ListBoard(element)
};
const components = new Map();
const register = function(component) {
  let id = component.id;
  let instance = constructors[component.dataset.class](component);
  components.set(id, instance);
};

const main = function() {
  for (let component of document.getElementsByClassName('component')) {
    try {
      register(component);
    } catch (e) {
      console.error(e.stack);
    }
  }
};
