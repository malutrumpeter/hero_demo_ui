// LoginScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import {LoginScreen, Props} from '../../../src/screens/LoginScreen';
import { Screens } from '../../../src/type';
import {useLogin} from '../../../src/hooks';

let navOptions: any;
// Mock the navigation prop
const MockNavigation: any = {
    navigate: jest.fn(),
    setOptions: jest.fn((options) => (navOptions = options)),
    getOptions: jest.fn(() => navOptions),
    goBack: jest.fn(),
}

const navigation = {
    navigate: MockNavigation,
};
const props: Props = {
    navigation: MockNavigation,
}

jest.mock('../../../src/hooks', () => ({
    useLogin: jest.fn(),
}));
const mockUseLogin = useLogin as jest.Mock;
mockUseLogin.mockReturnValue({
    result: { success: true },
    error: null,
});
describe('LoginScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();

    });
    it('renders correctly', () => {
        // @ts-ignore
        const { getByPlaceholderText, getByText } = render(<LoginScreen {...props} />);

        expect(getByPlaceholderText('Username')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText('Login')).toBeTruthy();
    });

    it('updates username and password states on input change', () => {

        // @ts-ignore
        const { getByPlaceholderText } = render(<LoginScreen {...props} />);

        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'testpass');

        expect(usernameInput.props.value).toBe('testuser');
        expect(passwordInput.props.value).toBe('testpass');
    });

    it('calls handleSignIn and triggers login process on valid input', async () => {
        // @ts-ignore
        const { getByPlaceholderText, getByText } = render(<LoginScreen {...props}  />);
        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByText('Login');

        fireEvent.changeText(usernameInput, 'validuser');
        fireEvent.changeText(passwordInput, 'validpass');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(MockNavigation.navigate).toHaveBeenCalledWith(Screens.HOME);
        });
    });

    it('does not navigate to home screen if input validation fails', async () => {
        mockUseLogin.mockReturnValue({
            result: null,
            error: { message: 'Invalid login' },
        });
        // @ts-ignore
        const { getByPlaceholderText, getByText } = render(<LoginScreen {...props}  />);

        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByText('Login');

        fireEvent.changeText(usernameInput, 'use');
        fireEvent.changeText(passwordInput, 'pas');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(MockNavigation.navigate).not.toHaveBeenCalledWith(Screens.HOME);
        });
    });

});
