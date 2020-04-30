export type extraToppings = 'Pepperoni' | 'Mushrooms' |'Onions' |'Sausage' |'Bacon' |'Extra cheese' |'Black olives' |'Green peppers' |'Pineapple' |'Spinach'

export interface order {
    size: 'small' | 'medium' | 'large' | undefined;
    crustType: 'thin' | 'thick' | undefined;
    extraToppings: extraToppings[];
}

