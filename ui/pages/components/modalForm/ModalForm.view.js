import React, {Component} from 'react'
import { Modal, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';

const END_POINT = 'https://klgmnlmaxb.execute-api.us-east-1.amazonaws.com/Prod/v1';
export class ModalForm extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.dataSend = {
      email: '',
      fio: '',
      adress: '',
      messageSubject: '',
      treeType: '',
      damageType: '',
    }

    this.state = {
      show: false,
    };
  }

  async sendData() {
    console.log(this.data); 

    const responce = await fetch(`${END_POINT}/treatment`, {method: 'POST'});
    const data = await responce.json();
    console.log(data); 
  }

  handlerChangeEmail = (evt) => {
    this.data.email = evt.target.value;
  }

  handlerChangeFIO = (evt) => {
    this.data.fio = evt.target.value;
  }

  handlerChangeAdress = (evt) => {
    this.data.adress = evt.target.value;
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClickSubmit = (evt) => {
    evt.preventDefault();
    this.sendData();
  }

  render() {
    return (
      <div className="modal-form">
        <Button variant="primary" onClick={this.handleShow}>
          Отправить обращение
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Новое обращение</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Ваш e-mail</Form.Label>
                <Form.Control type="email" onChange={this.handlerChangeEmail} />
              </Form.Group>

              <Form.Group controlId="formBasicFIO">
                <Form.Label>Фамилия, имя, отчество гражданина</Form.Label>
                <Form.Control type="text"  onChange={this.handlerChangeFIO}/>
              </Form.Group>

              <Form.Group controlId="formBasicAdress">
                <Form.Label>Адрес места жительства либо места пребывания гражданина</Form.Label>
                <Form.Control type="text" onChange={this.handlerChangeAdress}/>
              </Form.Group>

              <div className="dropdown-option mt-3">
                <label>Тема сообщения</label>
                <DropdownButton 
                  id="dropdown-message" 
                  title="Хочу уведомить об опасном дереве"
                >
                  <Dropdown.Item>Тема сообщения 2</Dropdown.Item>
                  <Dropdown.Item>Тема сообщения 3</Dropdown.Item>
                </DropdownButton>
              </div>
              
              <div className="dropdown-option mt-3">
                <label>Порода дерева</label>
                <DropdownButton 
                  id="dropdown-message" 
                  title="Неизвестно"
                >
                  <Dropdown.Item>Клен</Dropdown.Item>
                  <Dropdown.Item>Дуб</Dropdown.Item>
                </DropdownButton>      
              </div> 

              <div className="dropdown-option mt-3">
                <label>Вид повреждения</label>
                <DropdownButton 
                  id="dropdown-message" 
                  title="Надломленные ветви"
                >
                  <Dropdown.Item>Вид повреждения 2</Dropdown.Item>
                  <Dropdown.Item>Вид повреждения 3</Dropdown.Item>
                </DropdownButton>      
              </div> 



              <Button 
                onClick={this.handleClickSubmit} 
                variant="primary" 
                className="w-100 mt-3" 
                type="submit">
                Отправить обращение
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
