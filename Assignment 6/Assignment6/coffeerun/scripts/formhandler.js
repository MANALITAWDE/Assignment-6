(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var emailAddressArray = [];

    function FormHandler(selector) {
        if (!selector) {
            throw new Error("No selector provided");
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }
    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            if (data.size == "coffee-zilla" && data.strength >= 75) {
                $('#coffeeModal .modal-body').text("Congratulations!!! Would you like to use achievement?");
                $('#coffeeModal').modal('show');
                emailAddressArray.push(data.emailAddress);
                window.activeEmailAddress = data.emailAddress;
            }
            console.log(data);
            fn(data);
            if (data['powerUp'] != "") {
                this.reset();
                this.elements[0].focus();
            }
        });
        this.$formElement.on('reset', function(event) {
            $("#strengthLevelValue").removeClass();
            $("#strengthLevelValue").addClass('strengthLevelColorGreen');
            $("#strengthLevelValue").text(this.elements['strength'].defaultValue);
        })
    };

    FormHandler.prototype.addSliderHandler = function() {
        this.$formElement.on('change', function(event) {
            event.preventDefault();
            var sliderValue = this.value;
            $('#strengthLevelValue').empty();
            if (sliderValue <= 40) {
                $('#strengthLevelValue').append(sliderValue).addClass('strengthLevelColorGreen');
            } else if (sliderValue >= 41 && sliderValue <= 65) {
                $('#strengthLevelValue').append(sliderValue).addClass('strengthLevelColorYellow');
            } else {
                $('#strengthLevelValue').append(sliderValue).addClass('strengthLevelColorRed');
            }
        });
    };
    FormHandler.prototype.addModalHandler = function() {
        this.$formElement.on('click', function(event) {
            $('#coffeeModal').modal('hide');
            if (window.activeEmailAddress != "") {
                $('#powerUpOptions').show();
            }
        });
    };
    $("#emailInput").on('change', function() {
        var emailAddress = $("#emailInput").val();
        if (emailAddressArray.includes(emailAddress)) {
            $('#powerUpOptions').show();
        }

    });

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
