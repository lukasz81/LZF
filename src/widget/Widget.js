import React, { Component } from 'react';
import {DONATION_VALUES} from './donationValues';

class Widget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animal: 'giraffe',
            selectedDonation: DONATION_VALUES.defaultValue,
            lastSelectedDonation: DONATION_VALUES.defaultValue,
            isManualInputInError: false,
            hasSetMonthlyDonation: true
        };
    }

    handleSelectChange = (event) => {
        this.setState({
            animal: event.target.value
        });
    };

    handleDonationChange = (event) => {
        this.setState({
            selectedDonation: Number(event.target.value),
            lastSelectedDonation: Number(event.target.value)
        });
    };

    handleSubmit = (event) => {
        alert(`State: ${JSON.stringify(this.state)}`);
        event.preventDefault();
    };

    handleManualInput = (event) => {
        let value = event.target.value;
        //Let's set radio button back to what it was before we changed it
        let lastDonationRememberedValue = this.state.lastSelectedDonation;
        if (value !== '') {
            this.resetRadioButtons(value)
        } else {
            this.resetRadioButtons(lastDonationRememberedValue)
        }
        this.setState({
            isManualInputInError: Number(value) < DONATION_VALUES.minManualValue && value !== ''
        });

    };

    handleCheckBoxChange = (event) => {
        this.setState({
            hasSetMonthlyDonation: event.target.checked
        })
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
                            <select value={this.state.animal} onChange={this.handleSelectChange}>
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
                        <input className={this.state.isManualInputInError ? 'error' : ''}
                               type="number"
                               onChange={this.handleManualInput}/>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox"
                                   onChange={this.handleCheckBoxChange}
                                   checked={this.state.hasSetMonthlyDonation}/>
                            <span>I want to do a monthly donation</span>
                        </label>
                    </div>
                    <input type="submit"
                           disabled={this.state.isManualInputInError}
                           value="Submit"/>
                </form>
                <div className={`animal-container ${this.state.animal}`}>
                    <img alt={`Image of ${this.state.animal}`} src={`./images/${this.state.animal}-image.jpg`}/>
                </div>
            </div>
        );
    }
}

export default Widget;