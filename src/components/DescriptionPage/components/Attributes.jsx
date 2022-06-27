import React, {Component} from 'react';
import './Attributes.scss';

//https://stackoverflow.com/questions/69597917/how-to-make-sure-array-has-object-items-only-with-unique-keys

class Attributes extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        //this.props.id
        // console.log(this.props.attributes)
        const obj = {};
        const updateSelectedItemsObj = (key, value) => {
            obj[key] = value;
        };
        const getSiblings = (e) => {
            let siblings = []; 
            if(!e.parentNode) {
                return siblings;
            }
            let sibling  = e.parentNode.firstChild;
            while (sibling) {
                if (sibling.nodeType === 1 && sibling !== e) {
                    siblings.push(sibling);
                }
                sibling = sibling.nextSibling;
            }
            return siblings;
        }
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