import './App.css';
import React from 'react';
import AddForm from './Component/AddForm.js'
import DisplayForm from './Component/DisplayForm'
import { Col, Row } from 'antd';
import 'antd/dist/antd.min.css';

function App() {
  return (
    <div className="App">
      <Row gutter={[24, 32]}>
        <Col span={12}><DisplayForm /></Col>
        <Col span={12}><AddForm /></Col>
      </Row>
    </div>
  );
}

export default App;
