import 'antd/dist/antd.min.css';
import { Form, Input, Button, } from 'antd';
import { useEffect, useState } from 'react';
import { getDatafromLS } from './getDatafromLS';

function AddForm() {
    // main array of objects state
    const [users, setUsers] = useState(getDatafromLS());
    //
    const Max_item = 15
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
        setUsers((pre) => {
            return [...pre, user]
        })
        setName("");
        setEmail("");
        setDescription("");
        form.resetFields();
    }
    const { confirm } = Modal;

    const showConfirm = () => {
        confirm({
            title: 'Đã tạo tối đa item, bạn có muốn tiếp tục tạo mới item hay không?',
            okText: 'Confirm',
            onOk() {

            },

            onCancel() {
            },
        });
    };


    // saving data to local storage
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

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
                            disabled={users.length === Max_item}>
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
                            disabled={users.length === Max_item}>
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
                            disabled={users.length === Max_item}>
                        </Input>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className='btnAdd'
                            type="primary"
                            htmlType="submit"
                            // onClick={() => handleAddUser()}
                            onClick={handleAddUser}
                            disabled={users.length === Max_item}
                        >Add to list</Button>
                        <Button
                            className='btnCancel'
                            onClick={showConfirm}
                        >Cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default AddForm;
