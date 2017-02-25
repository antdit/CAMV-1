import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Modal, Button } from 'react-bootstrap';

const {dialog} = require('electron').remote;
const fs = require('fs');
const zlib = require('zlib');

var ModalFileSelectionBox = React.createClass({
  getInitialState: function() {
    return {
      fileChosen: false,
      data: [],
      peptideData: [],
      fileName: ''
    }
  },

  setStateFromText: function(data) {
    let inputData = JSON.parse(data);
    this.setState({
      data: inputData.scanData,
      peptideData: inputData.peptideData
    });
  },

  update: function() {
    var component = this;

    dialog.showOpenDialog(
      {
        filters: [{
          name: 'text',
          extensions: ['camv', 'camv.gz']
        }]
      },
      function (fileNames) {
        if (fileNames === undefined) return;

        var fileName = fileNames[0];
        var compressed = fileName.endsWith(".gz");

        fs.readFile(
          fileName,
          (compressed ? null : 'utf-8'),
          (err, data) => {
            if (err) { console.log(err); }

            if (compressed) {
              zlib.gunzip(data, (err, out) => {
                if (err) { console.log(err); }
                component.setStateFromText(out);
              })
            } else {
              component.setStateFromText(data);
            }
          }
        );

        component.setState({
          fileChosen: true,
          fileName: fileName
        })
      }.bind(this)
    )
  },

  submit: function() {
    this.props.setData(this.state.data)
    this.props.setPeptideData(this.state.peptideData)
    this.props.setSubmitted(true, this.state.fileName)
  },

  render: function() {
    return (
      <Modal show={this.props.showModal} onHide={this.submit}>
        <Modal.Header>
          <Modal.Title>
            <div></div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button
            id="fileSelect"
            onClick={this.update}
            >
            Choose File
          </button>
          {this.state.fileName}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.submit}
            disabled={!this.state.fileChosen}
            >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
});

module.exports = ModalFileSelectionBox