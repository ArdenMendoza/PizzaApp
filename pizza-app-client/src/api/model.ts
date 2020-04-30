export type extraToppings = 'Pepperoni' | 'Mushrooms' |'Onions' |'Sausage' |'Bacon' |'Extra cheese' |'Black olives' |'Green peppers' |'Pineapple' |'Spinach'
export type pizzaSize = 'small' | 'medium' | 'large' | undefined;
export type crustType = 'thin' | 'thick' | undefined;
export interface order {
    size: pizzaSize;
    crustType: crustType;
    extraToppings: extraToppings[];
}

