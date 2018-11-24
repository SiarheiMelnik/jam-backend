import React, {Component} from 'react';
import { Form } from 'react-bootstrap';


export class FormItem extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
        return (
            <Form.Group controlId={this.props.controlId}>
                <Form.Label>{this.props.labelsTitle}</Form.Label>
                <Form.Control type={this.props.type} />
            </Form.Group>
        );
    }
}