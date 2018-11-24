import './index.css'; 
import React, {Component} from 'react'
import ModalForm from './components/modalForm';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { END_POINT } from '../config';
import moment from 'moment';

import QueryTable from './components/queryTable';
export default class AdministrationPage extends Component  {
  constructor(props, context) {
    super(props, context);

    this.state = {
      table: [],
    };
  }

  async componentDidMount() {
    const responce = await fetch(`${END_POINT}/treatments`, {method: 'GET'});
    const data = await responce.json();

    console.log(data);

    const table = data.map((obj) => {
      return [
        obj.email, obj.name, `${obj.coords[0]}, ${obj.coords[1]}`, obj.title, obj.complaint.tree,
        obj.complaint.damage, obj.complaint.type, obj.status, moment(obj.timestamp).format('lll'),
      ]
    });

    this.setState({table});
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Городской лесничий</Navbar.Brand>
        </Navbar >
        <Container fluid>
          <Row>
              <Col className="d-flex justify-content-between">
                <h3 className="align-self-end pb-1">Список обращений</h3>
                <div className="mt-3 mb-3">
                  <ModalForm />
                </div> 
              </Col>
          </Row>
          <Row>
            <QueryTable table={this.state.table}/>
          </Row>
        </Container>
      </div>
    );
  }
}
