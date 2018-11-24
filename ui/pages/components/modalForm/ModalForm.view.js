import React, {Component} from 'react';
import { 
  Modal, 
  Button,
  Form,
} from 'react-bootstrap';

import FormItem from '../FormItem';
import SelectBlock from '../SelectBlock';
import  { 
  LABELS, 
  SELECT_BLOCK,
  APPEALS, 
  TREES,
  DEMAGES,
} from '../../constants/constants';

const END_POINT = 'https://klgmnlmaxb.execute-api.us-east-1.amazonaws.com/Prod/v1';
export class ModalForm extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.dataSend = {
      email: '',
      name: '',
      adress: '',
      messageSubject: '',
      complaint: {
        tree : '',
        damage : '',
        type : ''
      }
    }

    this.state = {
      show: false,
      validated: false
    };
  }

  async sendData() {
    if (this.state.validated) {
      console.log(this.dataSend)
      const responce = await fetch(`${END_POINT}/treatment`, 
      {method: 'POST'});
      // const data = await responce.json();
    }
  }

  handlerChangeEmail = (e) => {
    this.dataSend.email = e.target.value;
  }

  handlerChangeFIO = (e) => {
    this.dataSend.name = e.target.value;
  }

  handlerChangeAdress = (e) => {
    this.dataSend.adress = e.target.value;
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleSelectType = (value) => {
    this.dataSend.complaint.type = value;
  }

  handleSelectTypeTree = (value) => {
    this.dataSend.complaint.tree = value;
  }

  handleSelectDamage = (value) => {
    this.dataSend.complaint.damage = value;
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
    this.sendData();
  }

  render() {
    const { validated } = this.state;
    return (
      <div className="modal-form">
        <Button variant="primary" onClick={this.handleShow}>
          {LABELS.SEND_APPLY}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{LABELS.NEW_APPLY}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form 
              noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}
            >
              <FormItem 
                controlId="formBasicEmail" 
                labelsTitle={LABELS.EMAIL} 
                type="email" 
                onChange={this.handlerChangeEmail}/>

              <FormItem 
                controlId="formBasicFIO" 
                labelsTitle={LABELS.FIO} 
                type="text" 
                onChange={this.handlerChangeFIO}/>

              <FormItem 
                controlId="formBasicAdress" 
                labelsTitle={LABELS.ADDRESS}
                type="text" 
                onChange={this.handlerChangeAdress}
              />

              <SelectBlock
                theme={SELECT_BLOCK.LETTER_THEME}
                options={APPEALS}
                onSelect={this.handleSelectType} 
              />

              <SelectBlock
                theme={SELECT_BLOCK.TREE_NAME}
                options={TREES} 
                onSelect={this.handleSelectTypeTree}
              />

              <SelectBlock
                theme={SELECT_BLOCK.DAMAGE}
                options={DEMAGES}
                onSelect={this.handleSelectDamage}
              /> 

              <Button
                variant="primary" 
                className="w-100 mt-3"
                type="submit">
                {LABELS.SEND_APPLY}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
