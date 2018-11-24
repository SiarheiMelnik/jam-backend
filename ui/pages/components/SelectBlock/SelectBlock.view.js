import React, {Component} from 'react';
import { Form } from 'react-bootstrap';

export class SelectBlock extends Component {
    constructor(props, context) {
      super(props, context);

    }

    choseOption = (e) => {
        this.props.onChoose(e);
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.props.onSelect(e.target.value);
    }

    render() {
        const { theme, options } = this.props;
        return (
            <div className="dropdown-option mt-3">
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>{theme}</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange}>
                    
                        {options.map(item => 
                        <option key={item.idOfTree}>{item.name}</option>)}
                    </Form.Control>
                </Form.Group>
                </div>
        );
    }
}



