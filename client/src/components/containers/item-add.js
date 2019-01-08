import React, {Component} from 'react';
import * as ItemApi from '../../api/item-api'
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {createItem} from "../../api/item-api";


class ItemAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    handleNameChange = event => {
        this.setState({name: event.target.value})
    }
    handlePriceChange = event => {
        this.setState({price: event.target.value})
    }
    handleSubmit = event => {
        event.preventDefault();

        const user = {
            BookName: this.state.name,
            Price: this.state.price
        };
        ItemApi.createItem(user)
        this.props.history.push('/');
    }

    render() {

        return (
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Add Books</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>
                            Person Name:
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={this.handleNameChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Price Offer:
                            <input
                                type="number"
                                name="price"
                                onChange={this.handlePriceChange}/>
                        </label>
                        <div className="form-group">
                            <button type="submit">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}

const mapStateToProps = (store) => ({
    prod: store.products.items,
    auth: store.auth
})

export default connect(mapStateToProps, {createItem})(withRouter(ItemAdd));