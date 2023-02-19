import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const LOCALSTORAGE_KEY = "feedback-form-state";
const formData = {};




populateTexr();

form.addEventListener("submit", onSubmitForm);

form.addEventListener(
	"input",
	throttle(event => {
		formData[event.target.name] = event.target.value;
		localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
	}, 500),
);

function onSubmitForm(event) {
	event.preventDefault();

	console.log(formData);

	event.target.reset();

	localStorage.removeItem(LOCALSTORAGE_KEY);
}

function populateTexr() {
	const savadMessage = localStorage.getItem(LOCALSTORAGE_KEY);
	const parseSavedMessage = JSON.parse(savadMessage);

	if (savadMessage) {
		form.elements.message.value === parseSavedMessage.message || '';
		form.elements.email.value = parseSavedMessage.email || '';
	}
}