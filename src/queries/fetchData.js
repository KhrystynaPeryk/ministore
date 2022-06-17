// export function itemsFetchData(url) {
//     return (dispatch) => {
//         dispatch(itemsIsLoading(true));
//         fetch(url)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }
//                 dispatch(itemsIsLoading(false));
//                 return response;
//             })
//             .then((response) => response.json())
//             .then((items) => dispatch(itemsFetchDataSuccess(items)))
//             .catch(() => dispatch(itemsHasErrored(true)));
//     };
// }
import { getProducts } from "./Queries"
import { fetchParams } from "../helpers/fetchParams"
import { fetchProducts, productsHasErrored } from "../redux/actions/actions";

export function productsFetchData(currCategory) {
    return (dispatch) => {
        fetch('http://localhost:4000', fetchParams(getProducts(currCategory)))
        .then((response) => response.json())
        .then((productList) => dispatch(fetchProducts(productList.data.category.products))
        .catch(() => dispatch(productsHasErrored(true)))
        );
    }
}