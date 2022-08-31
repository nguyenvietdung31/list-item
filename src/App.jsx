import './App.css';
import React, { useState, useEffect } from 'react';
import AddForm from './Component/AddForm.jsx'
import DisplayForm from './Component/DisplayForm.jsx'
import { Col, Row } from 'antd';
import 'antd/dist/antd.min.css';
import { getDatafromLS } from './Component/getDatafromLS';
function App() {
  // main array of objects state
  const [users, setUsers] = useState(getDatafromLS())
  // saving data to local storage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const handleSetUser = (user) => {
    setUsers([...users, user])
  }

  const handleResetUser = (users) => {
    setUsers(users)
  }
  return (
    <div className="App">
      <Row gutter={[24, 32]}>
        <Col span={12}><DisplayForm users={users} setUsers={handleResetUser} /></Col>
        <Col span={12}><AddForm users={users} setUsers={handleSetUser} /></Col>
      </Row>
    </div>
  );
}
export default App;
