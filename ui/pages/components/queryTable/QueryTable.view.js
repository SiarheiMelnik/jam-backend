import React, {Component} from 'react'
import { Table } from 'react-bootstrap';
import RowQueryTable from '../rowQueryTable';

const END_POINT = 'https://klgmnlmaxb.execute-api.us-east-1.amazonaws.com/Prod/v1';

const thList = [
  'e-mail', 'ФИО', 'Адрес', 'Тема обращения', 'Порода дерева', 
  'Вид повреждения', 'Тип жалобы', 'Статус обращения', 'Время обращения'];

export class QueryTable extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getRows = (rowsTable) => {
    return rowsTable.map((row, index) => {
      return <RowQueryTable key={index} rowTable={row} />;
    });
  }

  getHeaderLine = () => {
    return thList.map((elem, index) => {
      return <th key={index}>{elem}</th>
    })
  }

  render() {
    return (
      <Table striped bordered hover className="w-100">
        <thead>
          <tr>
            {this.getHeaderLine()}
          </tr>
        </thead>
        <tbody>
          {this.getRows(this.props.table)}
        </tbody>
      </Table>
    );
  }
}
