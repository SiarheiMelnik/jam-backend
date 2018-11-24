import React, {Component} from 'react'

export class RowQueryTable extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getColumns = () => {
    const rowTable = this.props.rowTable;
        
    return rowTable.map((column, index) => {
      return <td key={index}>{column}</td>;
    });
  }

  render() {
    return (
      <tr>
        {this.getColumns()}
      </tr>
    );
  }
}
