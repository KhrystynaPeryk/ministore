import React, {Component} from 'react';
import './Attributes.scss';

class Attributes extends Component {

    render() {
        return (
            <div>
            {this.props.attributes.map((attribute, index) => {
                return (
                    <div key={index}>
                        <div>{attribute.name}</div>
                            <div className='square-item-container'>
                                {attribute.items.map((item, index1) => {
                                    return (
                                        <div key={index1} className='square-item' 
                                            style={item.value[0] === '#' ? {backgroundColor: `${item.value}` } : null}
                                        >
                                            {item.value[0] === '#' ? null : item.value}
                                        </div>
                                    )
                                })}
                            </div>
                    </div>
                )
            })}
            </div>
        )
    }
}

export default Attributes;