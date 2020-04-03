import Vue from 'vue';

Vue.directive('drag', {
  bind(el, binding) {
    el.addEventListener('dragenter', function (event) {
      event.stopPropagation();
      event.preventDefault();
    })
    el.addEventListener('dragover', function (event) {
      event.stopPropagation();
      event.preventDefault();
    })
    el.addEventListener('dragleave', function (event) {
      event.stopPropagation();
      event.preventDefault();
    })
    el.addEventListener('drop', function (event) {
      event.stopPropagation();
      event.preventDefault();
      binding.value(event)
    })
  }
})
