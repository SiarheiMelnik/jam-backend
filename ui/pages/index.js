import './index.css'; 
import React, {Component} from 'react'
import ModalForm from './components/modalForm';
import QueryTable from './components/queryTable';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { END_POINT } from '../config';
import moment from 'moment';

export default class AdministrationPage extends Component  {
  constructor(props, context) {
    super(props, context);

    this.sendData = this.sendData.bind(this);

    this.state = {
      table: [],
    };
  }

  async sendData(dataSend) {
    try {
      const req = await fetch(`${END_POINT}/treatment`, {
        method: 'POST',
        body: JSON.stringify({...dataSend, ...{ coords: [53.933726, 27.71324] }} ),
      });

      const resp = await req.json()
      console.log(resp);
    } catch (e) {
      console.log(e);
    }

    const table = await this.getTableData();

    this.setState({table});
  }

  async getTableData() {
    const responce = await fetch(`${END_POINT}/treatments`, {method: 'GET'});
    const data = await responce.json();

    const table = data.map((obj) => {
      return [
        obj.email, obj.name, `${obj.coords[0]}, ${obj.coords[1]}`, obj.title, obj.complaint.tree,
        obj.complaint.damage, obj.complaint.type, obj.status, moment(obj.timestamp).format('lll'),
      ]
    });

    return table;
  }

  async componentDidMount() {
    const table = await this.getTableData();

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
                  <ModalForm sendData={this.sendData}/>
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
