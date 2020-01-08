$(function() {
console.log( "ready!" );

var apiGatewayUrl = "http://localhost:8081";

'use strict';

$("#paymentSection").hide();

$("#buyCert").click(function(){
	$("#paymentSection").show();
});

var today = new Date();
$("#providers").attr("data-number", today/100000000 + Math.floor(Math.random() * 10) * 100);
$("#countries").attr("data-number", today/100000000000 + 7 + Math.floor(Math.random() * 10));
$("#users").attr("data-number", today/1000000 + Math.floor(Math.random() * 100000) + 432);
$("#cities").attr("data-number", today/10000000000 + Math.floor(Math.random() * 10) + 34);
			

// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
var style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d",
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Create a token or display an error when the form is submitted.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  var errorElement = document.getElementById('card-errors');
  errorElement.textContent = '';

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error.
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
	  console.log(result.token);
	  console.log(result.token.id);
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
  
  var certInfoForm = document.getElementById('certificateInfoForm');
  
  var dataContent = {
	  amount: $("#certAmout").val(),
	  currencyType: 1,
	  email: $("#certEmail").val(),
	  cardHash: token.id
  }
  
  var errorElement = document.getElementById('card-errors');
  
  console.log(dataContent);
  
  $.ajax({
  type: "POST",
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  url: apiGatewayUrl + "/createCertificate",
  data: JSON.stringify(dataContent),
  success: function(data, textStatus){
     console.log("data: " + data);
	 console.log("textStatus: " + textStatus);
	 errorElement.textContent = textStatus;
  },
  error: function(data, textStatus, errorThrown){
    console.log("data: " + data);
	console.log("textStatus: " + textStatus);
	console.log("errorThrown: " + errorThrown);
    errorElement.textContent = textStatus;
  }  
});
  
}

});