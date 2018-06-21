import React, { Component } from 'react';
import {DONATION_VALUES} from './donationValues';
import { connect } from 'react-redux';
import {changeAnimalType} from '../actions';
import './Widget.css';

export class Widget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDonation: DONATION_VALUES.defaultValue,
            lastSelectedDonation: DONATION_VALUES.defaultValue,
            manualInputValue: '',
            isManualInputInError: false,
            hasSetMonthlyDonation: true
        };
    }

    handleSelectChange = (event) => {
        this.props.changeAnimalType(event.target.value);
    };

    handleDonationChange = event => {
        this.resetManualInputField(event);
        this.setState({
            selectedDonation: Number(event.target.value),
            lastSelectedDonation: Number(event.target.value)
        });
    };

    handleManualInput = event => {
        let value = event.target.value;
        //Let's set radio button back to what it was before we changed it
        let lastDonationRememberedValue = this.state.lastSelectedDonation;
        if (value !== '') {
            this.resetRadioButtons(value)
        } else {
            this.resetRadioButtons(lastDonationRememberedValue)
        }
        this.setState({
            manualInputValue: value,
            isManualInputInError: Number(value) < DONATION_VALUES.minManualValue && value !== ''
        });

    };

    handleCheckBoxChange = event => {
        this.setState({
            hasSetMonthlyDonation: event.target.checked
        })
    };

    resetRadioButtons = value => {
        this.setState({
            selectedDonation: value
        });
    };

    resetManualInputField = event => {
        let value = Number(event.target.value);
        if (value <  DONATION_VALUES.minManualValue) {
            this.resetRadioButtons(this.state.lastSelectedDonation);
            this.setState({
                manualInputValue: '',
                isManualInputInError: false
            });
        }
    };

    //setState is async. Had to move the checking method to a function as the update to the state was step behind
    checkUpdatedValues = value => {
        return this.state.selectedDonation === value
    };


    handleSubmit = event => {
        event.preventDefault();
        alert(`State: ${JSON.stringify(this.state)}`);
    };

    render() {
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
                                <select className={'select donation-input'} value={this.props.animal} onChange={this.handleSelectChange}>
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
                                <input className={this.state.isManualInputInError ? 'error donation-input' : 'donation-input'}
                                       type="number"
                                       min='11'
                                       placeholder={'£'}
                                       value={this.state.manualInputValue}
                                       onBlur={this.resetManualInputField}
                                       onChange={this.handleManualInput}/>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox"
                                           onChange={this.handleCheckBoxChange}
                                           checked={this.state.hasSetMonthlyDonation}/>
                                    <span className={'donation-span'}>I want to do a monthly donation</span>
                                </label>
                            </div>
                            <input type="submit"
                                   className={this.state.isManualInputInError ? 'cta error':'cta'}
                                   disabled={this.state.isManualInputInError}
                                   value="Donate now"/>
                        </form>
                    </div>
                    <div className={`image-container ${this.props.animal} align-self--flex-end`}>
                        <img alt={`${this.props.animal}`} src={`./images/${this.props.animal}-image.jpg`}/>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        state,
        animal: state.animal
    }
};

const mapDispatchToProps = dispatch => ({
    changeAnimalType: animal => dispatch(changeAnimalType(animal))
});

export default connect(mapStateToProps,mapDispatchToProps)(Widget);