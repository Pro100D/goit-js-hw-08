import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const LOCALSTORAGE_KEY = "feedback-form-state";
const formData = {};

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

const load = key => {
	try {
		const serializedState = localStorage.getItem(key);

		return serializedState === null ? undefined : JSON.parse(serializedState);
	} catch (error) {
		console.error("Get state error: ", error.message);
	}
};

const storageData = load(LOCALSTORAGE_KEY);

if (storageData) {
	serializedState.email = storageData.email;
	serializedState.message = storageData.message;
}
