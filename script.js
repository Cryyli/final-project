const breedDropdown = document.getElementById('breed-dropdown');
const catImage = document.getElementById('cat-image');

const catAPIKey = 'live_EnmKp4JuQb04hWLGrbK00YmSqGzOwrIk4cJzOBIIZm72BylfHIjCNxnlJUxBXBFq';

function getRandomCatImage(breedId) {
  fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': catAPIKey
    }
  })
  .then(response => response.json())
  .then(data => {
    const catImageUrl = data[0].url;
    catImage.src = catImageUrl;
  })
  .catch(error => {
    console.error(error);
  });
}

breedDropdown.addEventListener('change', () => {
  const selectedBreedId = breedDropdown.value;
  if (selectedBreedId) {
    getRandomCatImage(selectedBreedId);
  }
});


function calculateCatFoodAmount(weight, activityLevel, mealType) {
    let factor = 0;

    switch (activityLevel) {
      case 'inactive':
        factor = 0.8;
        break;
      case 'moderately-active':
        factor = 1.0;
        break;
      case 'active':
        factor = 1.2;
        break;
      default:
        throw new Error('Invalid activity level');
    }

    const dailyCaloricNeeds = weight * 20 * factor;
    let foodAmount;

    if (mealType === 'dry') {
      foodAmount = dailyCaloricNeeds / 400;
    } else if (mealType === 'wet') {
      foodAmount = dailyCaloricNeeds / 200;
    } else {
      throw new Error('Invalid meal type');
    }

    return foodAmount.toFixed(2);
  }

  const submitBtn = document.querySelector('#submit-btn');

  submitBtn.addEventListener('click', (event) => {
    event.preventDefault(); // prevent form submission
    const form = document.querySelector('#cat-food-form')
    const resultContainer = document.querySelector('#cat-food-result');

    const weight = parseFloat(form.elements['cat-weight'].value);
    const activityLevel = form.elements['activity-level'].value;
    const mealType = form.elements['meal-type'].value;
    const foodAmount = calculateCatFoodAmount(weight, activityLevel, mealType);

    const name = form.elements['name'].value;
    const resultMessage = `<div class="my-5 py-5"> Hi, I am <strong>${name}</strong>.<br/> I weigh <div class="number number-style">${weight} lbs</div> and live a <strong>${activityLevel}</strong> lifestyle.<br/> Because I eat <strong>${mealType}</strong> food, I should eat <div class="number number-style">${foodAmount}</div> cups of food per day.</div>`;
    form.style.display='none';
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = resultMessage;
  });

  const resetBtn = document.querySelector('#reset-btn');

  resetBtn.addEventListener('click', (event) => {
    const form = document.querySelector('#cat-food-form');
    const resultContainer = document.querySelector('#cat-food-result');
  
    // clear result message
    resultContainer.innerHTML = '';
    resultContainer.style.display = 'none';
    form.style.display = 'block';
  });
