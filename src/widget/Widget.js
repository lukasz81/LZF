import React, { Component } from 'react';
import {DONATION_VALUES} from './donationValues';
import { connect } from 'react-redux';
import {
    changeAnimalType,
    setDonationValues,
    setToRegularDonations,
    rememberLastDonationValue,
    submitDonation
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

    checkUpdatedValues = inputValue => {
        let {value,isSetManually} = this.props.donation ? this.props.donation : {value: DONATION_VALUES.defaultValue, isSetManually: true};
        return inputValue === value && !isSetManually
    };

    showExpectedValue = () => {
        let {value,isSetManually} = this.props.donation ? this.props.donation : {value: DONATION_VALUES.defaultValue, isSetManually: true};
        return isSetManually ? Number(value) : ''
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.submitDonation(this.props.submitValues)
    };

    render() {
        let state = this.props;
        return (
            <React.Fragment>
                <h2 className={'text-transform--uppercase text-align--center text-weight--bold page-header'}>Donate today</h2>
                <p className={'text-align--center page-paragraph'}> Help protecting the planet today, become a Little Zebra ambassador</p>
                <section className={'widget display--flex space-between'}>
                    <div className={'form-container'}>
                        <h3 className={'text-transform--uppercase text-align--center text-weight--bold form-header'}>Make a donation</h3>
                        <form className={'form'} onSubmit={this.handleSubmit}>
                            <div className={'display--flex space-between'}>
                                <span className={'align-self--center'}>I want to help:</span>
                                <select className={'select donation-input'}
                                        value={state.animal}
                                        onChange={this.handleSelectChange}>
                                    <option value="giraffe">a giraffe</option>
                                    <option value="rhino">a rhino</option>
                                    <option value="tiger">a tiger</option>
                                </select>
                            </div>
                            <span className={'donation-span'}>I want to donate:</span>
                            <div className={'display--flex space-between'}>
                                {DONATION_VALUES.values.map( value => {
                                    return (
                                        <label key={value}
                                               className={`radio-label display--inline-block text-align--center donation-input is-checked-${this.checkUpdatedValues(value)}`}>
                                            <input className={'radio'} type='radio'
                                                   value={value}
                                                   onChange={this.handleDonationChange}
                                                   checked={this.checkUpdatedValues(value)}
                                            />
                                            <span>£{value}</span>
                                        </label>
                                    )
                                })}
                                <span className={'align-self--center'}>Or</span>
                                <input className={state.isUserSettingIllegalManualValue ? 'error donation-input manual-input' : 'donation-input manual-input'}
                                       type="number"
                                       min='11'
                                       value={this.showExpectedValue()}
                                       placeholder={'£'}
                                       onChange={this.handleManualInput}/>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox"
                                           className={'checkbox'}
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
        animal: state.animal,
        donation: state.donation,
        isUserSettingIllegalManualValue: state.isUserSettingIllegalManualValue,
        isRegularDonation: state.isRegularDonation,
        lastRememberedDonationValue: state.lastRememberedDonationValue,
        submitValues: {
            animal: state.animal,
            value: state.donation ? state.donation.value : DONATION_VALUES.defaultValue,
            isRegularDonation: state.isRegularDonation
        }
    }
};

const mapDispatchToProps = dispatch => ({
    changeAnimalType: animal => dispatch(changeAnimalType(animal)),
    setDonationValues: donation => dispatch(setDonationValues(donation)),
    setToRegularDonations: isSet => dispatch(setToRegularDonations(isSet)),
    rememberLastDonationValue: value => dispatch(rememberLastDonationValue(value)),
    submitDonation: submitValues => dispatch(submitDonation({...submitValues}))
});

export default connect(mapStateToProps,mapDispatchToProps)(Widget);