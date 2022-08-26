import 'antd/dist/antd.min.css';
import { Button, List, Modal, Input } from 'antd';
import { useEffect, useState } from 'react';
import { getDatafromLS } from './getDatafromLS';

function DisplayForm() { // 
    // main array of objects state
    const [users, setUsers] = useState(getDatafromLS())

    // edit data
    const [isEditing, setIsEditing] = useState(false);
    const [editingUsers, setEditingUsers] = useState(null);

    const handleEditUser = (users) => {
        setIsEditing(true);
        setEditingUsers({ ...users });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingUsers(null);
    };

    // remove data
    const handleRemoveUser = (id) => {
        const filteredUsers = users.filter((element,) => {
            return element.id !== id
        })
        setUsers(filteredUsers)
    }

    // saving data to local storage
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])

    return (
        <div className="container">
            {/* display , edit and remove user */}
            <div className="display-form">
                {users.length > 0 && <>
                    <h2>{users.length} items
                        &emsp;
                        <Button className='btnRemoveAll' onClick={() => setUsers([])}>Remove All</Button>
                    </h2>
                    <List className="list"
                        itemLayout="horizontal"
                        dataSource={users}
                        renderItem={(users) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`${users.name} X ${users.email}`}
                                    description={users.description}
                                />
                                <Button onClick={() => handleEditUser(users)}>Edit</Button>
                                <Button onClick={() => handleRemoveUser(users.id)}>Remove</Button>
                            </List.Item>
                        )}
                    />
                    {/* Edit form*/}
                    <Modal
                        title="Edit User"
                        visible={isEditing}
                        onOk={() => {
                            setUsers((pre) => {
                                return pre.map((users) => {
                                    if (users.id === editingUsers.id) {
                                        return editingUsers;
                                    } else {
                                        return users;
                                    }
                                });
                            });
                            resetEditing();
                        }}
                        onCancel={() => {
                            resetEditing();
                        }}
                    >
                        <Input
                            value={editingUsers?.name}
                            onChange={(e) => {
                                setEditingUsers((pre) => {
                                    return { ...pre, name: e.target.value };
                                });
                            }}
                        />
                        <Input
                            value={editingUsers?.email}
                            onChange={(e) => {
                                setEditingUsers((pre) => {
                                    return { ...pre, email: e.target.value };
                                });
                            }}
                        />
                        <Input
                            value={editingUsers?.description}
                            onChange={(e) => {
                                setEditingUsers((pre) => {
                                    return { ...pre, description: e.target.value };
                                });
                            }}
                        />
                    </Modal>
                </>}
                {users.length < 1 && <div><h1><center>NO DATA</center></h1></div>}
            </div>
        </div>
    )
}
export default DisplayForm;
