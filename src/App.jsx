import './App.css';
import 'antd/dist/antd.min.css';
import React from 'react'
import { useState, useEffect } from 'react';
import AddForm from './Component/AddForm.jsx'
import DisplayForm from './Component/DisplayForm.jsx'
import { getDatafromLS } from './Component/getDatafromLS';
import { Col, Row } from 'antd';
function App() {
  // main array of objects state
  const [users, setUsers] = useState(getDatafromLS())
  // saving data to local storage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])
  // update and display data to DOM after submit
  const handleSetUser = (user) => {
    setUsers([...users, user])
  }
  const handleResetUser = (users) => {
    setUsers(users)
  }

  return (
    <div className="App">
      <Row gutter={[24, 32]}>
        <Col span={12}><DisplayForm users={users} setUsers={handleResetUser}/></Col>
        <Col span={12}><AddForm users={users} setUsers={handleSetUser}/></Col>
      </Row>
    </div>
  );
}
export default App;
