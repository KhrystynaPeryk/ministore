import React, {Component} from 'react';
import './CartModalItem.scss';

class CartModalItem extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
        <div className='modal'>
            <h4>{this.props.brand}</h4>
        </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   cart: state.cart
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     ...bindActionCreators({addAttributes, incrementCartCount}, dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CartModalItem);

export default CartModalItem;