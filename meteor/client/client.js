/**
* Created with URLcomment.
* User: cesar2535
* Date: 2014-07-19
* Time: 04:43 AM
* To change this template use Tools | Templates.
*/

Template.hello.greeting = function () {
    return "Welcome to meteor.";
};

Template.hello.events({
    'click input': function () {
        // template data, if any, is available in 'this'
        // if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
});