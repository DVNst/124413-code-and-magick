'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var WIZARD_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = [];

var getRandomArrayElement = function (arr) {
  var RandomNumber = Math.round(Math.random() * (arr.length - 1));
  return arr[RandomNumber];
};

var getName = function () {
  return getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES);
};

var createWizard = function () {
  return {
    'name': getName(),
    'coatColor': getRandomArrayElement(WIZARD_COAT_COLOR),
    'eyesColor': getRandomArrayElement(WIZARD_EYES_COLOR)
  };
};

for (var i = 0; i < WIZARD_QUANTITY; i++) {
  wizards.push(createWizard());
}

var renderWizards = function () {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < WIZARD_QUANTITY; j++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizards[j].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[j].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[j].eyesColor;

    fragment.appendChild(wizardElement);
  }

  return fragment;
};

similarListElement.appendChild(renderWizards());
document.querySelector('.setup-similar').classList.remove('hidden');

// -------НАСТРОЙКИ ПЕРСОНАЖА-------

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var setupName = setup.querySelector('.setup-user-name');
var userNameInput = setup.querySelector('.setup-user-name');

var setupWizard = setup.querySelector('.setup-player');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesInput = document.getElementsByName('eyes-color');
var wizardFireball = setupWizard.querySelector('.setup-fireball-wrap');
var wizardFireballInput = document.getElementsByName('fireball-color');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// открытие окна с настройками:
setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// закрытие окна с настройками:
setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// отменяем отслеживания нажатия Esc, при фокусе на поле с именем
setupName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

// возвражаем отслеживания нажатия Esc, при потере фокуса на поле с именем
setupName.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

// проверка валидности заполнения имени:
userNameInput.addEventListener('invalid', function () {
  var errorText = '';
  if (userNameInput.validity.tooShort) {
    errorText = 'Имя должно состоять минимум из 2-х символов';
  } else if (userNameInput.validity.tooLong) {
    errorText = 'Имя не должно превышать 25-ти символов';
  } else if (userNameInput.validity.valueMissing) {
    errorText = 'Обязательное поле';
  }
  userNameInput.setCustomValidity(errorText);
});

// проверка мин. кол-ва символов (для Edge)
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  var errorText = (target.value.length < 2) ? 'Имя должно состоять минимум из 2-х символов' : '';
  target.setCustomValidity(errorText);
});

// Настройка персонажа:
// Изменение цвета глаз персонажа по нажатию:
wizardEyes.addEventListener('click', function () {
  var eyesColor = getRandomArrayElement(WIZARD_EYES_COLOR);
  wizardEyesInput[0].value = eyesColor;
  wizardEyes.style.fill = eyesColor;
});

// Изменение цвета фаерболов по нажатию:
wizardFireball.addEventListener('click', function () {
  var fireballColor = getRandomArrayElement(WIZARD_FIREBALL_COLOR);
  wizardFireballInput[0].value = fireballColor;
  wizardFireball.style.background = fireballColor;
});
