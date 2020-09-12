import React, {Component} from 'react';
import axios from 'axios';

export default class MultipleImageUploadComponent extends Component {
  fileObj = [];
  fileArr = [];

  constructor(props) {
    super(props);
    this.state = {
      imgCollection: '',
      inputKey: '',
    };
    this.fileInput = React.createRef();
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadMultipleFiles(e) {
    this.fileArr = [];
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArr.push(URL.createObjectURL(this.fileObj[0][i]));
    }

    this.setState({imgCollection: e.target.files});

    console.log(this.fileArr);
  }

  uploadFiles(e) {
    e.preventDefault();
    if (this.fileArr.length === 0) {
      return;
    }

    let formData = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append('imgCollection', this.state.imgCollection[key]);
    }
    axios
      .post('http://localhost:4000/api/upload-images', formData, {})
      .then((res) => {
        console.log('POSTED' + res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    this.setState({imgCollection: '', inputKey: Date.now()});
    this.fileObj = [];
    this.fileArr = [];
  }

  render() {
    return (
      <form>
        <div className='form-group multi-preview'>
          {(this.fileArr || []).map((url, idx) => (
            <img key={idx} src={url} alt='...' />
          ))}
        </div>

        <div className='form-group'>
          <input
            key={this.state.inputKey}
            type='file'
            className='form-control'
            name='imgCollection'
            onChange={this.uploadMultipleFiles}
            multiple
          />
        </div>
        <button className='btn btn-danger btn-block' onClick={this.uploadFiles}>
          Upload
        </button>
      </form>
    );
  }
}
