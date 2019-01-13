import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../api/auth'
import {withRouter} from 'react-router-dom';
import i18next from "i18next";
import {withNamespaces} from "react-i18next";
import {setLocale} from "react-redux-i18n";
import store from "../../store";

const I18n = require('react-redux-i18n').I18n;

withNamespaces()

class Navbar extends Component {
    constructor(props) {
        super(props)


    }

    /*  setLanguage(language) {
          i18next.init({
              lng: language,
              resources: require(`json!./${language}.json`)
          });

          this.props.actions.changeLanguage(i18next);
      }*/
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <Link className="itemButton" to="/add">{I18n.t('buttons.buy')}</Link>
                <h5>{user.name}</h5>
                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                    {/* <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />*/}
                    {I18n.t('controlElem.signOut')}
                </a>
            </ul>
        )
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">{I18n.t('controlElem.signUp')}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">{I18n.t('controlElem.signIn')}</Link>
                </li>
            </ul>
        )
        const {t, i18n} = this.props;
        console.log(this);
        console.log(`--`,t)
        console.log(i18n);
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">{I18n.t('welcome.title')}</Link>
                <button onClick={() => store.dispatch(setLocale('ru'))}>ru</button>
                <button onClick={() => store.dispatch(setLocale('en'))}>en</button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
//store.dispatch(setLocale('en'));
const mapStateToProps = (state) => ({
    auth: state.auth,
    i18n: state.i18n
})

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));