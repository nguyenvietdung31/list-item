import 'antd/dist/antd.min.css';
import { Form, Input, Button, } from 'antd';
import { useEffect, useState } from 'react';
import { getDatafromLS } from './getDatafromLS';

function AddForm() {
    // main array of objects state
    const [users, setUsers] = useState(getDatafromLS());
    // input field state

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    // add data

    const handleAddUser = () => {
        // create object
        const randomNumber = parseInt(Math.random() * 1000);
        let user = {
            id: randomNumber, /// đặt id = 1 số ngẫu nhiên để cho thao tác edit remove
            name: name,
            email: email,
            description: description
        }
        setUsers(pre => [...pre, user]);
        setName('');
        setEmail('');
        setDescription('');
    }
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
                            required onChange={(e) => setName(e.target.value)}
                            value={name}>
                        </Input>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description">
                        <Input.TextArea
                            placeholder='type description'
                            maxLength={256}
                            rows={4}
                            required onChange={(e) => setDescription(e.target.value)}
                            value={description}>
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
                            required onChange={(e) => setEmail(e.target.value)}
                            value={email}>
                        </Input>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className='btnAdd'
                            type="primary"
                            htmlType="submit"
                            onClick={() => handleAddUser()}
                        >Add to list</Button>
                        <Button className='btnCancel' htmlType="reset" >Cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default AddForm;
