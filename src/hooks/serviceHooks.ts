import {useEffect, useState} from "react";

// fetch('https://fakestoreapi.com/products')

//fetch('https://fakestoreapi.com/products/1')

// fetch('https://fakestoreapi.com/carts',{
//     method:"POST",
//     body:JSON.stringify(
//         {
//             userId:5,
//             date:2020-02-03,
//             products:[{productId:5,quantity:1},{productId:1,quantity:5}]
//         }
//     )
// })
export const useLogin = (trigger: number, userName: string, password: string) => {
    const [result, setResult] = useState<any>({});
    const [error, setError] = useState<any>({});

    const login = async () => {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                password: password
            })
            // body: JSON.stringify({
            //     username: 'mor_2314',
            //     password: '83r5^_'
            // })
        });
        if (response.ok) {
            const res = await response.json();
            setResult(res);
        } else {
            setError(new Error(JSON.stringify(response)));
        }

    }

    useEffect(() => {
        if (trigger && userName && password) {
            console.log('user ', userName, ' password ', password);
            login();
        }

    }, [trigger]);

    return {result, error}
}

export const useGetAllProducts = () => {
    const [result, setResult] = useState<any[]>([]);
    const [error, setError] = useState<any>({});

    const getAllProducts = async () => {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const res = await response.json();
            setResult(res);
        } else {
            setError(new Error(JSON.stringify(response)));
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);
    return {result, error};
}

export const useGetProduct = (id: number) => {
    const [result, setResult] = useState<any>({});
    const [error, setError] = useState<any>({});

    const getProduct = async () => {
        const response = await fetch('https://fakestoreapi.com/products/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('getProduct Response', JSON.stringify(response));
        if (response.ok) {
            const res = await response.json();
            console.log('Response', res);
            setResult(res);
        } else {
            setError(new Error(JSON.stringify(response)));
        }
    }
    useEffect(() => {
        if (id) {
            console.log('Get ProductID', id);
            getProduct();
        }
    }, [id]);
    return {result, error};
}


