import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ProductDetail} from '../../../src/screens/ProductDetail';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../../src/state/types.ts';
import {SetCart} from "../../../src/state/action.ts";

const mockUseSelector = useSelector as unknown as jest.Mock;

const product = {
    id: 1,
    title: 'Sample Product',
    description: 'This is a sample product description.',
    price: 10.99,
    image: 'https://example.com/sample-product.jpg',
};
jest.mock('../../../src/hooks', () => ({
    useGetProduct: jest.fn(() => ({
        result: product,
        error: null,
    })),
}));
describe('ProductDetail', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseSelector.mockImplementation((selector: (state: AppState) => AppState) => {
            const state: AppState = {
                user: '',
                productId: 0,
                cartCount: 0,
                cart: [],
                productsInCart: [],
            } as unknown as AppState
            return selector(state);
        });
    });
    it('renders product details correctly', async () => {
        const {getByText, getByTestId} = render(<ProductDetail/>);

        // Assert that product details are rendered
        expect(getByText('Sample Product')).toBeTruthy();
        expect(getByText('This is a sample product description.')).toBeTruthy();
        expect(getByText('$10.99')).toBeTruthy();
        expect(getByTestId('product-image')).toBeTruthy();
        expect(getByTestId('add-to-cart')).toBeTruthy();
    });

    it('add items to cart', () => {
        const {getByText, getByTestId} =
            render(<ProductDetail/>);
        const addToCartButton = getByTestId('add-to-cart');
        fireEvent.press(addToCartButton);
        expect(addToCartButton).toBeTruthy();
        expect(useDispatch).toBeCalledTimes(2);
    });

});
