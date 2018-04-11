'use strict';

var WIZARD_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var setupWizard = document.querySelector('.setup');
setupWizard.classList.remove('hidden');

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
