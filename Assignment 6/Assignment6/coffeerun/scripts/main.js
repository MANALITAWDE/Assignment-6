(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var SLIDER_SELECTOR = '[data-slider-element="slider"]';
    var MODAL_SELECTOR = '[class="btn btn-primary"]';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    console.log(formHandler);
    var formSliderHandler = new FormHandler(SLIDER_SELECTOR);
    formSliderHandler.addSliderHandler();
    var modalHandler = new FormHandler(MODAL_SELECTOR);
    modalHandler.addModalHandler();

})(window);
