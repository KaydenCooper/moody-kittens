/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {
    id: generateId(),
    img: 'image',
    name: form.name.value,
    mood: '',
    affection: 5

  };
  setKittenMood(kitten);
  kittens.push(kitten);
  saveKittens();

  form.reset();


}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem('kittens', JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem('kittens'))
  if (storedKittens) {
    kittens = storedKittens
  }
};

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensElem = document.getElementById('kitten')
  let kittenElem = ''
  kittens.forEach(kitten => {
    kittenElem += `<div class ='card m-1'> <img src='https://robohash.org/${kitten.name}?set=set4' height="120" alt="kitten" id="image">
              <div class="d-flex space-around"id='name'><b> Name:</b>${kitten.name} </div>
              <div class="d-flex space-around" id='mood'><b>Mood:</b>${mood} </div>
              <div class="d-flex space-around" id='affection'><b>Affection:</b>${affection}</div>
              
            <div class="d-flex space-around">
              <button class="btn-cancel" id='petId' type="button" onclick = "pet(id)">Pet</button>
            <button id="catnipId" type="button" onclick = "catnip(id)">Catnip</button>
            </div>
            </div>
            `
  })
  kittensElem.innerHTML = kittenElem
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  findKittenById(id)
  let i = Math.random()
  if (i > .7) {
    affection++
  } else {
    affection--
  };
  saveKittens();
};


/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  findKittenById(id);
  mood = 'Tolerant'
  affection = 5
  saveKittens();


};

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (affection > 6) {
    mood = 'Happy'
  } else if (affection <= 5) {
    mood = 'Tolerant'
  } else if (affection <= 3) {
    mood = 'Angry'
  } else if (affection <= 0) {
    mood = 'gone'
  }
};
function deleteKittens() {
  kittens.pop();
  saveKittens()

}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
  document.getElementById('kitten').classList.remove('hidden');
}

/**
 * Defines the setKittenMood(); Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */
let kitten = 'id'
let id = 'image'
let mood = 'Tolerant'
let affection = 5

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}1 
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
drawKittens();
loadKittens();