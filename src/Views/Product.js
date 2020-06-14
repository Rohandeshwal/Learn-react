import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Loader from '../Components/loader';

function Product() {
    const { id } = useParams()
    // mockApi Url
    const URL = `https://5ee4a7e9ddcea00016a36e5b.mockapi.io/ap/v1/products/${id}`; 
    const [product, setProduct] = useState({
        loading: false,
        data: null,
        error: false
    })
    let content = null;
    // useFeect hooks ract
    useEffect(() => {
        setProduct({
            loading: true,
            data: null,
            error: false
        })
        // axios used for routing
        axios.get(URL).then(response => {
            setProduct({
                loading: false,
                data: response.data,
                error: false
            })

        }).catch(() => {
            setProduct({
                loading: false,
                data: null,
                error: true,
            })
        })
    }, [URL]);
    if (product.error) {
        content = <p> Try Again later</p>
    }
    if (product.loading) {
        content = <Loader> </Loader>
    }

    //getData for Mocks API
    if (product.data) {
        return (
            content =
            <div>
                <h1 className="text-2xl font-bold mb-3"> {product.data.name} </h1>

                <div>
                    <img
                        src={product.data.images[0].imageUrl} alt={product.data.name} />
                </div>
                <div className="font-bold text-xl mb-3">
                    $ {product.data.price}
                </div>
                <div>
                    {product.data.description}
                </div>
            </div>
        );
    }

    return (
        <div>
            {content}
        </div>

    );
}


export default Product;
