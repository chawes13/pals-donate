var teamSection = document.querySelector("#teamInfo");
var individualSection = document.querySelector("#individualInfo");
var teamInput = document.querySelector("#team");
var individualInput = document.querySelector("#individual");
var pageAddress = document.querySelector("#address");
var firstName = document.querySelector("#firstName");

var testButton = document.querySelector("#test");

individualInput.addEventListener("click", function(){
	individualSection.classList.toggle("hidden");
});

teamInput.addEventListener("click", function(){
	teamSection.classList.toggle("hidden");
});

testButton.addEventListener("click", function(){
	console.log(firstName.value);
	pageAddress.value = firstName.value;

	if(firstName.value && firstName.value.length > 0){
		pageAddress.value = firstName.value;
	} else {
		pageAddress.value = teamName.value;
	}


});
