import React, { useState } from "react";
import axios from 'axios'
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

const Login = props => {
  const [username, setUsername] = useState({
    username: 'Lambda School',
    password: 'i<3Lambd4'
  })

  const handleSubmit = e => {
    e.preventDefault();
    axios
    .post('http://localhost:5000/api/login', username)
    .then (res => {
      console.log(res);
      localStorage.setItem('token', res.data.payload);
      props.history.push('/bubbles');
    })
    .catch(err => console.log(err))
  }

  const handleChanges = e => {
    setUsername({...username, [e.target.name]: e.target.value})
  }

  return (
    <div className="wrapper">
     <Container className="abra">
     <h2>Log In</h2>
     <Form className="form">
     <Col>
     <FormGroup>
     <Label>Username</Label>
      <Input
      type="text"
      placeholder="User Name"
      name="username"
      value={username.username}
      onChange={handleChanges}
      />
      </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
      <Input
      type="password"
      name="password"
      placeholder="Password"
      value={username.password}
      onChange={handleChanges}
      />
       </FormGroup>
          </Col>
          <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
    </div>
  );
};

export default Login;
