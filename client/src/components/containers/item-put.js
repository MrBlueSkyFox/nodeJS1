import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import * as ItemApi from "../../api/item-api";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";


class ItemPut extends Component {
    constructor(props) {
        super(props);
        let prod = this.props.product[localStorage.editBook];
        let BookName = ''
        let Price = 0
        let lastId = localStorage.editBookId
        if (prod !== undefined) {
            BookName = prod.BookName
            Price = prod.Price
            lastId = prod.idbooks
        }
        this.state = {
            nameD: BookName,
            //this.props.product[localStorage.editBook].BookName,
            priceD: Price,
            name: '',
            price: 0,
            id: lastId
            //num:this.props.
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange = event => {
        this.setState({name: event.target.value})
    }
    handlePriceChange = event => {
        this.setState({price: event.target.value})
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const itemm = {
            BookName: this.state.name,
            Price: this.state.price,
            idbooks: this.state.id
        }
        //ItemApi.updateItems(item)
        console.log(`sumbit`, itemm)
        this.props.actions.upItems(itemm)
        this.props.history.push('/');
    }

    render() {

        // console.log(this.props.product[localStorage.editBook])
        return (
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Edit</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder={this.state.nameD}
                            name="name"
                            onChange={this.handleNameChange}
                            //value={this.state.name}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder={this.state.priceD}
                            name="price"
                            onChange={this.handlePriceChange}

                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Edit book
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    // console.log(`this is `, store);
    return {
        product: store.products.items,
        auth: store.auth,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ItemApi, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ItemPut));