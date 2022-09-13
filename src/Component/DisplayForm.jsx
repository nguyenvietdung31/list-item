import React from 'react';
import 'antd/dist/antd.min.css';
import { Button, List, Modal, Input } from 'antd';
import { useState } from 'react';

export const DisplayForm = ({ users, setUsers }) => {
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
        const filteredUsers = users.filter((value) => {
            return value.id !== id;
        })
        setUsers(filteredUsers);
    };

    return (
        <div className="container">
            {/* display , edit and remove user */}
            <div className="display-form">
                {users.length > 0 && <>
                    <h1>{users.length} items
                        &emsp; {/* tab character */}
                        <Button className="btnRemoveAll" onClick={() => setUsers([])}>Remove All</Button>
                    </h1>
                    <List
                        className="list"
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
                            addonBefore="Name"
                            placeholder='type name'
                            maxLength={20}
                            value={editingUsers?.name}
                            onChange={(e) => {
                                setEditingUsers((pre) => {
                                    return { ...pre, name: e.target.value };
                                });
                            }}
                        />
                        <Input
                            addonBefore="Email"
                            placeholder='type email'
                            value={editingUsers?.email}
                            onChange={(e) => {
                                setEditingUsers((pre) => {
                                    return { ...pre, email: e.target.value };
                                });
                            }}
                        />
                        <Input.TextArea
                            placeholder='type description'
                            maxLength={256}
                            rows={4}
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
