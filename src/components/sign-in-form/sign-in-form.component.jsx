import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break
                default:
                    console.log(error);
            }

        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    required
                />

                <FormInput
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    required
                />

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;