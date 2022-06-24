import React, {Component} from 'react';
import './Attributes.scss';

class Attributes extends Component {

    render() {
        return (
            <div>
            {this.props.attributes.map((attribute, index) => {
                console.log(attribute.name)
                return (
                    <div key={index}>
                        <div>{attribute.name}</div>
                        {attribute.type === 'text' ? (
                            <div className='square-item-container'>
                                {attribute.items.map((item, index1) => {
                                    return (
                                        <div key={index1} className='square-item'>
                                            <div>{item.value}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : 'swatch'}
                    </div>
                )
            })}
            </div>
        )
    }
}

export default Attributes;