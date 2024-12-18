export const filters = [
    {
        id: "colors",
        name: "Color",
        options: [
            {value: "white" , label: "White"},
            {value: "beige" , label: "Beige"},
            {value: "blue" , label: "Blue"},
            {value: "brown" , label: "Brown"},
            {value: "green" , label: "Green"},
            {value: "purple" , label: "Purple"},
            {value: "yellow" , label: "Yellow"},
        ]
    },
    {
        id: "size",
        name: "Size",
        options: [
            { value: "s", label:"S"},
            { value: "m", label:"M"},
            { value: "l", label:"L"}
        ]
    }
];

export const singleFilter = [
    {
        id: "price",
        name: "Price",
        options: [
            { value: "159-399" , label: "₹159 To ₹399"},
            { value: "399-999" , label: "₹399 To ₹999"},
            { value: "999-1999" , label: "₹999 To ₹1999"},
            { value: "1999-2999" , label: "₹1999 To ₹2999"},
            { value: "2999-4999" , label: "₹2999 To ₹4999"},
            { value: "4999-9999" , label: "₹4999 To ₹9999"},
            { value: "9999-19999" , label: "₹9999 To ₹19999"}
        ]
    },
    {
        id: "discount",
        name: "Discount Range",
        options: [
            { value: "10" , label: "10% And Above"},
            { value: "20" , label: "20% And Above"},
            { value: "30" , label: "30% And Above"},
            { value: "40" , label: "40% And Above"},
            { value: "50" , label: "50% And Above"},
            { value: "60" , label: "60% And Above"},
            { value: "70" , label: "70% And Above"},
            { value: "80" , label: "80% And Above"},
        ]
    },
    {
        id: "stock",
        name: "stock",
        options: [
            { value: "in_stock" , label: "In-Stock"},
            { value: "out_of_stock" , label: "Out-Of-Stock"}            
        ]
    }
]