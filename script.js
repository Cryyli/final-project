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
  const resultDiv = document.querySelector('#result');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent form submission
    const weight = parseFloat(form.elements['cat-weight'].value);
    const activityLevel = form.elements['activity-level'].value;
    const mealType = form.elements['meal-type'].value;
    const foodAmount = calculateCatFoodAmount(weight, activityLevel, mealType);

    const message = `Your cat should eat ${foodAmount} cups of ${mealType} food per day.`;
    resultDiv.textContent = message;
  });