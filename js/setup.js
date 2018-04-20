'use strict';

var WIZARD_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

var wizards = [];
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

// открытие окна с настройками:

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var setupName = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
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
var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// проверка мин. кол-ва символов (для Edge)
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// Настройка персонажа:
var setupWizard = setup.querySelector('.setup-player');

// Изменение цвета глаз персонажа по нажатию:
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesInput = document.getElementsByName('eyes-color');

wizardEyes.addEventListener('click', function () {
  wizardEyesInput[0].value = getRandomArrayElement(WIZARD_EYES_COLOR);
  wizardEyes.style.fill = wizardEyesInput[0].value;
});

// Изменение цвета фаерболов по нажатию:
var wizardFireball = setupWizard.querySelector('.setup-fireball-wrap');
var wizardFireballInput = document.getElementsByName('fireball-color');

wizardFireball.addEventListener('click', function () {
  wizardFireballInput[0].value = getRandomArrayElement(WIZARD_FIREBALL_COLOR);
  wizardFireball.style.background = wizardFireballInput[0].value;
});
