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
            categories {
                name
            }
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

export function getProducts(category) {
    return {
        query: `
            query getProducts($category : String!) {
                category(input: { title: $category }) {
                    products {
                        id
                        name
                        brand
                        inStock
                        gallery
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

export function getProduct(productId) {
    return {
        query: `
            query getProduct($productId: String!) {
                product(id: $productId ) {
                    id
                    name
                    inStock
                    gallery
                    description
                    category
                    attributes {
                        name
                        type
                    items {
                        displayValue
                        value
                    }
                    }
                    brand
                    prices {
                        currency {
                            symbol
                        }
                        amount
                        }
                    }
                }
        `,
        variables : { productId }
    }
}

// export function getProducts(category) {
//     return {
//         query: `
//             query getProducts($category : String!) {
//                 category(input: { title: $category }) {
//                     products {
//                         name
//                         id
//                         inStock
//                         description
//                         gallery
//                         brand
//                         attributes {
//                             name
//                             type
//                             items {
//                             displayValue
//                             value
//                             }
//                         }

//                     }
//                 }
//             }
//         `,
//         variables : { category }
//     }
// }

