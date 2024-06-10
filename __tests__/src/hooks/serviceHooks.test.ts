import { renderHook, act } from '@testing-library/react-hooks';
import { useLogin, useGetAllProducts, useGetProduct } from '../../../src/hooks';

// Mock the fetch function
global.fetch = jest.fn();

describe('useLogin', () => {
    it('should set result on successful login', async () => {
        const mockResponse = { token: '12345' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useLogin(1, 'user', 'pass'));

        await waitForNextUpdate();

        expect(result.current.result).toEqual(mockResponse);
        expect(result.current.error).toBeNull();
    });

    it('should set error on failed login', async () => {
        const mockError = new Error('Failed login');
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({}),
        });

        const { result, waitForNextUpdate } = renderHook(() => useLogin(1, 'user', 'wrongpass'));

        await waitForNextUpdate();

        expect(result.current.error).toBeTruthy();
        expect(result.current.result).toBeNull();
    });
});

describe('useGetAllProducts', () => {
    it('should set result on successful fetch', async () => {
        const mockProducts = [{ id: 1, name: 'Product 1' }];
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProducts,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllProducts());

        await waitForNextUpdate();

        expect(result.current.result).toEqual(mockProducts);
        expect(result.current.error).toEqual({});
    });

    it('should set error on failed fetch', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({}),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllProducts());

        await waitForNextUpdate();

        expect(result.current.error).toBeTruthy();
        expect(result.current.result).toEqual([]);
    });
});

describe('useGetProduct', () => {
    it('should set result on successful fetch', async () => {
        const mockProduct = { id: 1, name: 'Product 1' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetProduct(1));

        await waitForNextUpdate();

        expect(result.current.result).toEqual(mockProduct);
        expect(result.current.error).toEqual({});
    });

    it('should set error on failed fetch', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({}),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetProduct(1));

        await waitForNextUpdate();

        expect(result.current.error).toBeTruthy();
        expect(result.current.result).toEqual({});
    });
});
