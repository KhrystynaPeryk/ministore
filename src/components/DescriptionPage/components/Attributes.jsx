import React, {Component} from 'react';
import './Attributes.scss';

class Attributes extends Component {
    constructor() {
        super()
        this.state = {
            selectedAttributes: [],
        }
        // this.handleAttributeClick = this.handleClick.bind(this);
    }

    // handleAttributeClick(e) {
    //     const newAttribute = {

    //     }
    // }
    render() {
        //this.props.id
        return (
            <div className='attributes'>
            {this.props.attributes.map((attribute, index) => {
                return (
                    <div key={index} className='attributes-container'>
                        <div className='attributes-container-name'>{attribute.name.toUpperCase()}:</div>
                        <div className='square-item-container'>
                            {attribute.items.map((item, index1) => {
                                return (
                                    <div key={index1} className='square-item' 
                                        style={item.value[0] === '#' ? 
                                            {
                                                backgroundColor: `${item.value}`,
                                                border: `1px solid ${item.value}`,
                                                padding: '2.5%'
                                            } 
                                            : null}
                                        // onClick={(e) => {
                                        //     const newAttribute = {
                                        //         name: attribute.name,
                                        //         value: item.value
                                        //     };
                                        //     this.setState(prevState => ({
                                        //         selectedAttributes: [...prevState.selectedAttributes, newAttribute]
                                        //     }))
                                        //     console.log(this.state.selectedAttributes)
                                        // }}
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