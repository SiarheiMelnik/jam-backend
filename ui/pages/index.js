import './index.css'; 
import { Button } from 'react-bootstrap';
import TreatmentView from './components/treatment';
import ModalForm from './components/modalForm';

export default () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <ModalForm /> 
        </div>
      </div>  
      
      {/* <TreatmentView /> */}
    </div>
  );
}
