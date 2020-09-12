import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MultipleImageUploadComponent from './components/multiple-image-upload.component';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Multiple Image Upload Preview</div>
              <div className='card-body'>
                <MultipleImageUploadComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
