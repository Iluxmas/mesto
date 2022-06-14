const modal = document.querySelector('.popup');
const openModalBttn = document.querySelector('.profile__edit-button');
const closeModalBttn = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');
// const likeBttn = document.querySelectorAll('.card__like-button');
const popupProfileForm = document.querySelector('.popup__form');

// const toggleLike = function (event) {
//     event.target.classList.toggle('card__like-button_active');
// };

const openModal = function () {
    modal.classList.add('popup_opened');
};

const closeModal = function () {
    modal.classList.remove('popup_opened');
};

const saveFormData = function (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeModal();
};

// likeBttn.forEach(item => item.addEventListener('click', toggleLike));

openModalBttn.addEventListener('click', () => {
    openModal();
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
});
closeModalBttn.addEventListener('click', closeModal);
popupProfileForm.addEventListener('submit', saveFormData);