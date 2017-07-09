//Basic Info Section
var teamInputSection = document.querySelector("#teamInfo");
var individualInputSection = document.querySelector("#individualInfo");
var teamRadioButton = document.querySelector("#team");
var individualRadioButton = document.querySelector("#individual");
var teamName = document.querySelector("#teamName");
var firstName = document.querySelector("#firstName");
var lastName = document.querySelector("#lastName");
var pageAddress = document.querySelector("#address");

//Personalize Section
var photoRadioButton = document.querySelector("#photoRadio");
var videoRadioButton = document.querySelector("#videoRadio");
var photoInputSection = document.querySelector("#photoSection");
var videoInputSection = document.querySelector("#videoSection");
var photoInput = document.querySelector("#photoSection input");
var videoInput = document.querySelector("#videoSection input");

//Basic Info Interactions
teamRadioButton.addEventListener("click", function(){
	if(this.checked){
		teamInputSection.classList.remove("hidden");
		individualInputSection.classList.add("hidden");
		firstName.required = false;
		lastName.required = false;
		teamName.required = true;
		firstName.value = "";
		lastName.value = "";
		pageAddress.value = "";
	}
});

individualRadioButton.addEventListener("click", function(){
	if(this.checked){
		individualInputSection.classList.remove("hidden");
		teamInputSection.classList.add("hidden");
		teamName.required = false;
		firstName.required = true;
		lastName.required = true;
		teamName.value = "";
		pageAddress.value = "";
	}
});

firstName.addEventListener("input", updatePageAddress);

lastName.addEventListener("input", updatePageAddress);

teamName.addEventListener("input", updatePageAddress);

pageAddress.addEventListener("input", function(){
	pageAddress.value = pageAddress.value.toLowerCase();	
});

//Personalize Interactions
photoRadioButton.addEventListener("click", function(){
	if(this.checked){
		photoInputSection.classList.remove("hidden");
		videoInputSection.classList.add("hidden");
		photoInput.required = true;
		videoInput.required = false;
	}
});

videoRadioButton.addEventListener("click", function(){
	if(this.checked){
		videoInputSection.classList.remove("hidden");
		photoInputSection.classList.add("hidden");
		videoInput.required = true;
		photoInput.required = false;
	}
});

function updatePageAddress(){
	var address = "";
	if(teamName){
		address = teamName.value;	
	} else {
		address = firstName.value + lastName.value;
	}
	
	pageAddress = address.toLowerCase();
}