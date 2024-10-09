export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags?: string; 
    strYoutube?: string; 
    strSource?: string; 
    strIngredient: string[]; 
    strMeasure: string[]; 
    [key: string]: any; 
  }
  