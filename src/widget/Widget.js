import React, { Component } from 'react';
import {DONATION_VALUES} from './donationValues';
import { connect } from 'react-redux';
import {
    changeAnimalType,
    setDonationValues,
    setToRegularDonations,
    rememberLastDonationValue
} from '../actions';
import './Widget.css';

export class Widget extends Component {

    handleSelectChange = (event) => {
        this.props.changeAnimalType(event.target.value);
    };

    handleDonationChange = event => {
        let value = event.target.value;
        this.props.setDonationValues({value: value, isSetManually: false});
        this.props.rememberLastDonationValue(value);
    };

    handleManualInput = event => {
        let value = event.target.value;
        let rememberedValue = this.props.lastRememberedDonationValue;
        this.props.setDonationValues({value: value === '' ?  rememberedValue : value, isSetManually: value !== ''});
    };

    handleCheckBoxChange = event => {
        this.props.setToRegularDonations(event.target.checked);
    };

    resetRadioButtons = value => {
        this.props.setDonationValues({value: value, isSetManually: false});
    };

    //setState is async. Had to move the checking method to a function as the update to the state was step behind
    checkUpdatedValues = inputValue => {
        let {value,isSetManually} = this.props.donation;
        return inputValue === value && !isSetManually
    };

    reset = () => {
        let {value,isSetManually} = this.props.donation;
        return isSetManually ? Number(value) : ''
    };

    handleSubmit = event => {
        event.preventDefault();
        alert(`State: ${JSON.stringify(this.props)}`);
    };

    render() {
        let {state} = this.props;
        return (
            <React.Fragment>
                <h2 className={'text-transform--uppercase text-align--center text-weight--bold page-header'}>Donate today</h2>
                <p className={'text-align--center page-paragraph'}> Help protecting the planet today, become a Little Zebra ambassador</p>
                <section className={'widget display--flex space-between'}>
                    <div className={'form-container'}>
                        <h3 className={'text-transform--uppercase text-align--center text-weight--bold form-header'}>Make a donation</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className={'display--flex space-between'}>
                                <span className={'align-self--center'}>I want to help:</span>
                                <select className={'select donation-input'} value={state.animal} onChange={this.handleSelectChange}>
                                    <option value="giraffe">a giraffe</option>
                                    <option value="rhino">a rhino</option>
                                    <option value="tiger">a tiger</option>
                                </select>
                            </div>
                            <span className={'donation-span'}>I want to donate:</span>
                            <div className={'display--flex space-between'}>
                                {DONATION_VALUES.values.map((value,i) => {
                                    return (
                                        <label key={i} className={`radio-label display--inline-block text-align--center donation-input is-checked-${this.checkUpdatedValues(value)}`}>
                                            <input type="radio"
                                                   value={value}
                                                   onChange={this.handleDonationChange}
                                                   checked={this.checkUpdatedValues(value)}/>
                                            <span>£{value}</span>
                                        </label>
                                    )
                                })}
                                <span className={'align-self--center'}>Or</span>
                                <input className={state.isUserSettingIllegalManualValue ? 'error donation-input' : 'donation-input'}
                                       type="number"
                                       min='11'
                                       value={this.reset()}
                                       placeholder={'£'}
                                       onChange={this.handleManualInput}/>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox"
                                           onChange={this.handleCheckBoxChange}
                                           checked={state.isRegularDonation}/>
                                    <span className={'donation-span'}>I want to do a monthly donation</span>
                                </label>
                            </div>
                            <input type="submit"
                                   className={state.isUserSettingIllegalManualValue ? 'cta error':'cta'}
                                   disabled={state.isUserSettingIllegalManualValue}
                                   value="Donate now"/>
                        </form>
                    </div>
                    <div className={`image-container ${state.animal} align-self--flex-end`}>
                        <img alt={`${state.animal}`} src={`./images/${state.animal}-image.jpg`}/>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        state,
        animal: state.animal,
        donation: state.selectedDonation,
        isUserSettingIllegalManualValue: state.isUserSettingIllegalManualValue,
        isRegularDonation: state.isRegularDonation,
        lastRememberedDonationValue: state.lastRememberedDonationValue
    }
};

const mapDispatchToProps = dispatch => ({
    changeAnimalType: animal => dispatch(changeAnimalType(animal)),
    setDonationValues: donation => dispatch(setDonationValues(donation)),
    setToRegularDonations: isSet => dispatch(setToRegularDonations(isSet)),
    rememberLastDonationValue: value => dispatch(rememberLastDonationValue(value))
});

export default connect(mapStateToProps,mapDispatchToProps)(Widget);