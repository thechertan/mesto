import initialCards from "./cards.js";

//const popup = document.querySelector(".popup"); // Находим наш попапчик в dom дереве ;)
const popupTypeEdit = document.querySelector(".popup_type_edit"); // select popup where type edit;
const popupTypeAddcard = document.querySelector(".popup_type_add-card"); // select popup where type add-card
const popupTypeImage = document.querySelector(".popup_type_image");
const popupSrcImage = document.querySelector(".popup__image-full");
const popupTextImage = document.querySelector(".popup__text");

const popupEditBtn = document.querySelector(".profile__item-button-edit");
const popupAddCard = document.querySelector(".profile__item-button-add");
const popupCloseBtn = ".popup__close"; //close button

//const formElement = document.querySelector(".popup__form");
const formElementEdit = document.querySelector(".popup__form_edit"); // for button edit
const FormElementAddCard = document.querySelector(".popup__form_add-card"); // for button eddit card

const nameInput = document.getElementById("form-title"); //  for profile
const jobInput = document.getElementById("form-subtitle"); // for profile

const inputLink = document.getElementById("form-link"); // for card
const inputName = document.getElementById("form-name"); //for card

const youName = document.querySelector(".profile__title");
const youJob = document.querySelector(".profile__subtitle");

const cardContainer = document.querySelector(".card-grid");

popupEditBtn.addEventListener("click", () => {
  profileSubmitForm();
  openPopup(popupTypeEdit);
  formElementEdit.addEventListener("submit", formSubmitHandler); // for popupTypeEdit
});

popupAddCard.addEventListener("click", () => {
  openPopup(popupTypeAddcard);
  FormElementAddCard.addEventListener("submit", formSubmitAddCard);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");

  popup
    .querySelector(popupCloseBtn)
    .addEventListener("click", () => closePopup(popup));
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function formSubmitAddCard(evt) {
  evt.preventDefault();
  const name = inputName.value;
  const link = inputLink.value;
  FormElementAddCard.removeEventListener("submit", formSubmitAddCard);
  addCard(link, name, "prepend");
  closePopup(popupTypeAddcard);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  youName.textContent = nameInput.value;
  youJob.textContent = jobInput.value;
  formElementEdit.removeEventListener("submit", formSubmitHandler); // delete even lister for clear memory
  closePopup(popupTypeEdit);
}

function profileSubmitForm() {
  nameInput.value = youName.textContent;
  jobInput.value = youJob.textContent;
}

initialCards.forEach((element) => {
  addCard(element.name, element.link, "append");
});

function createCard(name, link) {
  const cardTemplate = document.querySelector("#card-grid-template").content;
  const cardElement = cardTemplate
    .querySelector(".card-grid__item")
    .cloneNode(true);

  const cardDelete = cardElement.querySelector(
    ".card-grid__button-remove-card"
  );
  cardDelete.addEventListener("click", function () {
    cardElement.remove();
  });
  const popupOpenImage = cardElement.querySelector(".card-grid__image");
  popupOpenImage.addEventListener("click", function () {
    popupSrcImage.src = link;
    popupTextImage.textContent = name;
    openPopup(popupTypeImage);
  });


  const like = cardElement.querySelector(".card-grid__like");
  like.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card-grid__like_activate");
  });
  cardElement.querySelector(".card-grid__image").src = link;
  cardElement.querySelector(".card-grid__subtitle").textContent = name;
  return cardElement; // back arr in a createCard
}

function addCard(name, link, appOrPre = "append") {
  switch (appOrPre) {
    case "append":
      cardContainer.append(createCard(name, link));
      break;
    case "prepend":
      cardContainer.prepend(createCard(name, link));
      break;
  }
}
