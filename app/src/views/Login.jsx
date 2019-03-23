import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { Title, InputLabel, InputField, ButtonFull } from '../components/Styled';
import { login } from '../actions/userActions';

class Login extends Component {
    render() {
        return (
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={values => {
                    console.log(values)
                    this.props.login(values)
                }}
            >
                <Form>
                    <Title>IT Step</Title>
                    <InputLabel>Korisničko ime</InputLabel>
                    <Field type='text' name='username' />
                    <InputLabel>Lozinka</InputLabel>
                    <Field type='password' name='password' />
                    <ButtonFull type='submit'>Prijavi se</ButtonFull>
                </Form>
            </Formik>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch, payload) => ({
    login: login(dispatch, payload)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
