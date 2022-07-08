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
