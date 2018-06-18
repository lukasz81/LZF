import React, { Component } from 'react';
import {DONATION_VALUES} from './donationValues';

class Widget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animal: 'giraffe',
            selectedDonation: DONATION_VALUES.defaultValue,
            selectedDonationRemembered: DONATION_VALUES.defaultValue,
            isManualInputInError: false,
            monthlyDonation: true
        };
    }

    handleChange = (event) => {
        this.setState({
            animal: event.target.value
        });
    };

    handleDonationChange = (event) => {
        this.setState({
            selectedDonation: Number(event.target.value),
            selectedDonationRemembered: Number(event.target.value)
        });
    };

    handleSubmit = (event) => {
        alert(`State: ${JSON.stringify(this.state)}`);
        event.preventDefault();
    };

    handleManualInput = (event) => {
        let value = event.target.value;
        //Let's set radio button back to what it was before we changed it
        let lastDonationRememberedValue = this.state.selectedDonationRemembered;
        if (value !== '') {
            this.resetRadioButtons(null)
        } else {
            this.resetRadioButtons(lastDonationRememberedValue)
        }

        this.setState({
            isManualInputInError: Number(value) < DONATION_VALUES.minManualValue && value !== ''
        });

    };

    resetRadioButtons = (value) => {
        this.setState({
            selectedDonation: value
        });
    };

    //setState is async. Had to move the checking method to a function as the update to the state was step behind
    checkUpdatedValues = (value) => {
        return this.state.selectedDonation === value
    };

    render() {
        return (
            <div className={'widget'}>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            <span>I want to help:</span>
                            <select value={this.state.animal} onChange={this.handleChange}>
                                <option value="giraffe">a giraffe</option>
                                <option value="rhino">a rhino</option>
                                <option value="tiger">a tiger</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <span>I want to donate:</span>
                        <br/>
                        {DONATION_VALUES.values.map((value,i) => {
                            return (
                                <label key={i}>
                                    <input type="radio"
                                           value={value}
                                           onChange={this.handleDonationChange}
                                           checked={this.checkUpdatedValues(value)}/>
                                    £{value}
                                </label>
                            )
                        })}
                        <span> Or </span>
                        <input className={this.state.isManualInputInError ? 'error' : ''} type="number" onChange={this.handleManualInput}/>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Widget;