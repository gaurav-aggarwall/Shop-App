import React, { Component } from 'react';
import axios from 'axios';

import './ProductPage.css';

class ProductPage extends Component {
    state = { 
        isLoading: true, 
        product: null 
    };

    componentDidMount() {
        axios.get('/products/' + this.props.match.params.id)
        .then(productResponse => {
            this.setState({ isLoading: false, product: productResponse.data });
        })
        .catch(err => {
            this.setState({ isLoading: false });
            console.log(err);
            this.props.onError('Loading the product failed. Please try again later');
        });
    }

    render() {
        let content = <p className="Error-msgs">Is loading...</p>;

        if (!this.state.isLoading && this.state.product) {
            content = (
            <main className="product-page">
                <h1>{this.state.product.name}</h1>
                <h2>{this.state.product.price}</h2>
                <div
                className="product-page__image"
                style={{
                    backgroundImage: "url('" + this.state.product.image + "')"
                }}
                />
                <p>{this.state.product.description}</p>
            </main>
            );
        }
        if (!this.state.isLoading && !this.state.product) {
            content = (
            <main>
                <p className="Error-msgs">No product found. Try again later.</p>
            </main>
            );
        }

    return content;
    }
}

export default ProductPage;
