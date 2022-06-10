import {gql} from '@apollo/client';

export const LOAD_ITEMS = gql`
    query {
        categories{products{
            name}
        }
}`;

// query {
//   product(id: "jacket-canada-goosee") {
//     id
// 		name
//   }
// }

export const GET_CATEGORIES = gql`
    query {
        categories{name}
    }
`;