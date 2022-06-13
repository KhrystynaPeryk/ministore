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