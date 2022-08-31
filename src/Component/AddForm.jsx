import React from 'react';
import 'antd/dist/antd.min.css';
import { Form, Input, Button, Modal } from 'antd';
import { useState } from 'react';

export const AddForm = ({ users, setUsers }) => {
    const [form] = Form.useForm();
    // input field state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    // add data
    const handleAddUser = (event) => {
        event.preventDefault();
        // create object
        const randomNumber = parseInt(Math.random() * 1000);
        const user = {
            id: randomNumber, /// đặt id = 1 số ngẫu nhiên để cho thao tác edit remove
            name: name,
            email: email,
            description: description
        }
        setUsers(user);
        setName("");
        setEmail("");
        setDescription("");
        form.resetFields();
        setIsConfirmClick(false)
    }
    //check data when user length = max item
    const Max_item = 15
    const [visible, setVisible] = useState(false);
    const [isConfirmClick, setIsConfirmClick] = useState(false)
    const showModal = () => {
        setVisible(true);
    };

    const handleConfirm = () => {
        setIsConfirmClick(true);
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <div className="container">
            {/* Add a new user */}
            <h1>Add New Item</h1>
            <div className="add-form">
                <Form
                    layout='vertical'
                    autoComplete='off'
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{
                            required: true,
                            message: "cannot be blank"
                        }]}>
                        <Input
                            placeholder='type name'
                            maxLength={20}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            disabled={users.length >= Max_item && !isConfirmClick}>
                        </Input>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description">
                        <Input.TextArea
                            placeholder='type description'
                            maxLength={256}
                            rows={4}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            disabled={users.length >= Max_item && !isConfirmClick}>
                        </Input.TextArea>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "cannot be blank"
                            },
                            {
                                type: 'email',
                                message: "Enter a valid email"
                            }
                        ]}>
                        <Input
                            placeholder='type email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            disabled={users.length >= Max_item && !isConfirmClick}>
                        </Input>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className='btnAdd'
                            type="primary"
                            htmlType="submit"
                            onClick={handleAddUser}
                            disabled={users.length >= Max_item && !isConfirmClick}
                        >Add to list</Button>
                        <Button
                            className='btnCancel'
                            onClick={showModal}
                        >Cancel</Button>
                    </Form.Item>
                </Form>
            </div>

            {/* Modal cảnh báo khi max item*/}
            <Modal
                title="Warning"
                visible={visible}
                okText="Confirm"
                onOk={handleConfirm}
                onCancel={handleCancel}
            ><p>Đã tạo tối đa item, bạn có muốn tiếp tục tạo mới item hay không?</p>
            </Modal>
        </div>
    )
}
export default AddForm;
