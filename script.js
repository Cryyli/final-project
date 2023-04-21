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

  const form = document.querySelector('#cat-food-form');
  const resultMessage = document.querySelector('#cat-food-result');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent form submission
    const weight = parseFloat(form.elements['cat-weight'].value);
    const activityLevel = form.elements['activity-level'].value;
    const mealType = form.elements['meal-type'].value;
    const foodAmount = calculateCatFoodAmount(weight, activityLevel, mealType);
    const name = form.elements['name'].value;
    
    resultMessage.innerHTML = `<strong>${name}</strong> should eat <div class="number number-style">${foodAmount}</div> cups of <strong>${mealType}</strong> food per day`;
    resultMessage.style.display ='block';
  });

  function resetForm() {
    resultMessage.style.display = 'none';
    resultMessage.innerHTML = '';

    document.getElementById('cat-food-form').reset();
  }
