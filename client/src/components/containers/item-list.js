import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as ItemApi from '../../api/item-api'
import {Link} from 'react-router-dom'
import {bindActionCreators} from "redux";
import {deleteItem} from "../../api/item-api";
const I18n = require('react-redux-i18n').I18n;

class ItemList extends Component {
    constructor(props) {
        super(props)


        //this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItemFromList(prod, e) {
        deleteItem(prod.idbooks);
    }



    componentWillMount() {
        ItemApi.getItems();
    }


    renderContent(prod, index) {
        //  const prod=this.props.product;
        const {isAuthenticated} = this.props.auth;
      //  console.log(this.props.auth);
        const refCallBack=node=>{
            localStorage.setItem("editBook",index);
            localStorage.setItem("editBookId",prod.idbooks)
        }
        const authButton = (
            <div>
            <p className='itemButton'>
                <button
                    onClick={this.deleteItemFromList.bind(this, prod)}
                    className='btn btn-primary'
                >
                    {I18n.t('buttons.delete')}
                </button>
            </p>
            <p className='itemButton'>
                <Link className="itemButton" to="/add">{I18n.t('buttons.buy')   }</Link>
                <Link className="itemButton" to={{
                    pathname: "/edit",
                    state: {index}
                }}
                      onClick={refCallBack}>{I18n.t('buttons.edit')}</Link>
            </p>
            </div>
        )
        const guestButton = (
            <h5>{I18n.t('welcome.mock')}</h5>
        )
        return (
            <div className='col-sm-2 col-lg-2 col-md-2 book-list' key={index}>
                <div className='thumbnail'>
                    <img
                        className='mb-2'
                        src={prod.Images}
                        alt={`EMPTY`}
                    />
                    <div className='caption'>
                        <h4 className='pull-right'>${prod.Price}</h4>
                        <h4>
                            <Link to={`/items/${prod.idbooks}`}>
                                {prod.BookName}
                            </Link>
                        </h4>

                        {isAuthenticated ? authButton : guestButton}
                    </div>
                </div>
            </div>
        )

    }

    render() {
        const prod = this.props.product;


        return (
            <div>
                <div className="books row">
                    {prod.map((prod, index) =>
                        this.renderContent(prod, index))}
                </div>
            </div>
        );
    }


}

const mapStateToProps = (store) => {
//    console.log(`this is `, store);
    return {
        product: store.products.items,
        auth: store.auth,
        i18n: store.i18n
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ItemApi, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);


