import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Widget from './Widget';
import App from '../App';
import {DONATION_VALUES} from './donationValues';

Enzyme.configure({ adapter: new Adapter() });

const initialState = {
    animal: 'giraffe',
    selectedDonation: DONATION_VALUES.defaultValue,
    lastSelectedDonation: DONATION_VALUES.defaultValue,
    isManualInputInError: false,
    hasSetMonthlyDonation: true
};

describe('<Widget/>', () => {

    it('renders Widget component in App', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find(Widget).length).toEqual(1);
    });

    it('checks if element has ".widget" className', () => {
        const wrapper = shallow(<Widget/>);
        expect( wrapper.find('.widget').length).toEqual(1);
    });

    it('check component\'s initial state', () => {
        const wrapper = shallow(<Widget/>);
        expect(wrapper.state()).toEqual(initialState)
    });

    it('updates component\'s state after running handleSelectChange', () => {
        const animalType = 'rhino';
        const wrapper = shallow(<Widget/>);
        const event = {target:{value:animalType}};
        wrapper.instance().handleSelectChange(event);
        console.log(wrapper.state());
        expect(wrapper.state().animal).toEqual(animalType);
    });
});