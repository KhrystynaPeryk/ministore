// export const LOAD_ITEMS = gql`
//     query {
//         categories{products{
//             name}
//         }
// }`;

// query {
//   product(id: "jacket-canada-goosee") {
//     id
// 		name
//   }
// }

export const GET_CATEGORIES = {
    query: `
        query {
            categories{name}
        }
    `
}

export const GET_CURRENCIES = {
    query: `
        query {
            currencies {
                label
                symbol
            }
        }
    `
}

export const GET_CLOTHES = {
    query: `
        query {
            category(input: { title: "clothes" }) {
                products {
                    name
                    id
                    prices {
                        currency {
                            symbol
                        }
                        amount
                    }
                }
            }
        }
    `
}

export const GET_ALL = {
    query: `
        query {
            category(input: { title: "all" }) {
                products {
                    name
                    id
                    prices {
                        currency {
                            symbol
                        }
                        amount
                    }
                }
            }
        }
    `
}

export const GET_TECH = {
    query: `
        query {
            category(input: { title: "tech" }) {
                products {
                    name
                    id
                    prices {
                        currency {
                            symbol
                        }
                        amount
                    }
                }
            }
        }
    `
}

// does not work, we need to use variables argument
export function getProducts(category) {
    return {
        query: `
            query getProducts($category : String!) {
                category(input: { title: $category }) {
                    products {
                        name
                        id
                        prices {
                            currency {
                                symbol
                            }
                        amount
                    }
                }
            }
        }
    `,
    variables : { category }
}
}