import React, {Component} from 'react';
import './Attributes.scss';
import { getSiblings } from '../../../helpers/getSiblingDOMElements';

//https://stackoverflow.com/questions/69597917/how-to-make-sure-array-has-object-items-only-with-unique-keys

class Attributes extends Component {
    constructor() {
        super()
        this.state = {
            obj: {}
        }
    }

    render() {
        const obj = {};
        const updateSelectedItemsObj = (key, value) => {
            // const newObj = {[key] : value}
            // this.setState(
            //     prev => ({
            //         obj: {
            //             ...newObj,
            //             ...prev.obj,
            //         }
            //     })
            // )
            obj[key] = value;
        };

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
                                                padding: '3%'
                                            } 
                                            : null }
                                        onClick={(e) => {
                                            const siblingsArray = getSiblings(e.target);
                                            if (e.target.innerHTML) {
                                                siblingsArray.forEach(sibling => {
                                                    if (sibling.classList.contains('clicked-text')) {
                                                        sibling.classList.remove('clicked-text')
                                                    }
                                                })
                                                e.target.classList.add('clicked-text')
                                            } else {
                                                siblingsArray.forEach(sibling => {
                                                    if (sibling.classList.contains('clicked-swatch')) {
                                                        sibling.classList.remove('clicked-swatch')
                                                    }
                                                })
                                                e.target.classList.add('clicked-swatch')
                                            }
                                            updateSelectedItemsObj(attribute.name, item.value)
                                            console.log(obj)
                                            // this.setState({allAttributesSelected: this.props.attributes.length === Object.keys(obj).length});
                                            // this.props.ifAttributesSelected(this.state.allAttributesSelected);
                                            this.props.attributesFromUser(obj);
                                        }}
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