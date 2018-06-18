import React, { Component } from 'react';
import {DONATION_VALUES} from './donationValues';

class Widget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animal: 'giraffe',
            selectedDonation: 5,
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
            selectedDonation: Number(event.target.value)
        });

        console.log(JSON.stringify(this.state))
    };

    handleSubmit = (event) => {
        alert(`State: ${JSON.stringify(this.state)}`);
        event.preventDefault();
    };

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
                        {DONATION_VALUES.map((value,i) => {
                            return (
                                <label key={i}>
                                    <input type="radio"
                                           value={value}
                                           onChange={this.handleDonationChange}
                                           checked={this.checkUpdatedValues(value)}/>
                                    £{value} {this.state.selectedDonation === 3}
                                </label>
                            )
                        })}
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Widget;