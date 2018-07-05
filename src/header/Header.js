import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import {
    submitDonation
} from "../actions";

export class Header extends Component {

    handleDonateClick = () => {
        this.props.submitDonation(this.props.submitValues)
    };

    buttonClassName = () => {
        return this.props.isUserSettingIllegalManualValue ? 'error' : '';
    };

    render() {
        return (
                <header className='header display--flex'>
                    <div className={'container display--flex'}>
                        <h1 className="logo text--indent align-self--center">
                            <a className={'display--block'}
                               title={'Little Zebra Foundation'}
                               href={'./'}>Little Zebra Foundation
                            </a>
                        </h1>
                        <nav className={'align-self--center'}>
                            <ul className={'display--flex text-transform--capitalize'}>
                                <li className={'align-self--center'}><a href={''}>What we do</a></li>
                                <li className={'align-self--center'}><a href={''}>Get Involved</a></li>
                                <li className={'align-self--center'}><a href={''}>Shop</a></li>
                                <li className={'align-self--center'}><a href={''}>News</a></li>
                            </ul>
                        </nav>
                        <form className={'align-self--center'}>
                            <input className={'search'} type={'search'} placeholder={'Search here'}/>
                        </form>
                        <button
                            onClick={this.handleDonateClick}
                            className={`${this.buttonClassName()} cta text-transform--uppercase align-self--center`}>
                            Donate now
                        </button>
                    </div>
                </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        submitValues: state,
        isUserSettingIllegalManualValue: state.isUserSettingIllegalManualValue
    }
};

const mapDispatchToProps = dispatch => ({
    submitDonation: state => dispatch(submitDonation(state))
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);