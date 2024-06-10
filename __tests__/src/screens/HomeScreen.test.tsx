import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {createStore} from 'redux';
import {HomeScreen} from '../../../src/screens/HomeScreen';
import {useGetAllProducts} from '../../../src/hooks';
import {Screens} from '../../../src/type.ts';
import {setProductId} from '../../../src/state/action.ts';
import {Props} from "../../../src/screens/LoginScreen";

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
    useGetAllProducts: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});

jest.mock('../../../src/state/action.ts', () => ({
    setProductId: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
}));

const mockStore = createStore(() => ({
    productId: 0,
    user: 'jobin',
    cartCount: 0,
    cart: [],
    productsInCart: [],
}));

const spyConsole = jest.spyOn(console, 'error');
describe('HomeScreen', () => {
    beforeEach(() => {
        (useGetAllProducts as jest.Mock).mockReturnValue({
            result: [
                {
                    id: 1,
                    title: 'Product 1',
                    description: 'Description 1',
                    price: 10,
                    image: 'https://example.com/product1.jpg',
                },
                {
                    id: 2,
                    title: 'Product 2',
                    description: 'Description 2',
                    price: 20,
                    image: 'https://example.com/product2.jpg',
                },
            ],
            error: null,
        });
    });

    it('renders products correctly', async () => {
        // @ts-ignore
        const {getByText, getAllByText} = render(<HomeScreen {...props}/>);

        await waitFor(() => {
            expect(getByText('$10')).toBeTruthy();
            expect(getByText('Product 1')).toBeTruthy();
            expect(getByText('Description 1')).toBeTruthy();
            expect(getByText('$20')).toBeTruthy();
            expect(getByText('Product 2')).toBeTruthy();
            expect(getByText('Description 2')).toBeTruthy();
        });
    });

    it('navigates to product detail screen on product selection', async () => {
        // @ts-ignore
        const {getByText, getAllByText} = render(<HomeScreen {...props}/>);

        await waitFor(() => {
            fireEvent.press(getByText('Product 1'));
            expect(mockDispatch).toHaveBeenCalledWith(setProductId(1));
            expect(MockNavigation.navigate).toHaveBeenCalledWith(Screens.PRODUCT_DETAIL);
        });
    });

    it('handles error state correctly', async () => {
        (useGetAllProducts as jest.Mock).mockReturnValueOnce({
            result: null,
            error: 'Failed to fetch products',
        });

        // @ts-ignore
        const {getByText, getAllByText} = render(<HomeScreen {...props}/>);

        await waitFor(() => {
            expect(spyConsole).toHaveBeenCalledWith('HomeScreen: ', 'Failed to fetch products')
        });
    });
});
