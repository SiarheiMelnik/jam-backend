import React, {Component} from 'react';
import { Form } from 'react-bootstrap';

import  { LABELS } from '../../constants/constants';


export class FormItem extends Component {
    constructor(props, context) {
      super(props, context);
    }

    handlerChange = (evt) => {
        this.props.onChange(evt);
    }

    render() {
        return (
            <Form.Group controlId={this.props.controlId}>
                <Form.Label>{this.props.labelsTitle}</Form.Label>
                <Form.Control 
                    type={this.props.type}
                    onChange={this.handlerChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {LABELS.FIELD_REQUIRE}
                </Form.Control.Feedback>
            </Form.Group>
        );
    }
}