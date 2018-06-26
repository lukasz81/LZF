import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedWidget,{Widget} from './Widget';
import {Provider} from 'react-redux';
import App from '../App';
import {DONATION_VALUES} from './donationValues';
import * as actions from '../actions';
import * as actionTypes from '../actions/actionTypes';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const initialState = {
    animal: 'giraffe',
    selectedDonation: {
        value: DONATION_VALUES.defaultValue,
        isSetManually: true
    },
    isUserSettingIllegalManualValue: false,
    isRegularDonation: true,
    lastRememberedDonationValue: null
};

const mockedStore = mockStore(initialState);
const widget = <Provider store={mockedStore}><ConnectedWidget/></Provider>;

describe('<Widget/>', () => {

    it('renders Widget component in App', () => {
        const container = shallow(<App/>);
        expect(container.find(ConnectedWidget).length).toEqual(1);
    });

    it('checks if element has ".widget" className', () => {
        const wrapper = mount(widget);
        expect( wrapper.find('.widget').length).toEqual(1);
    });

    it('calls handleSelectChange when simulating change on select', () => {
        const animalType = 'rhino';
        const event = {target: {value: animalType}};
        const mockHandleSelectChange = jest.fn();
        const container = shallow(<Widget changeAnimalType={mockHandleSelectChange}/>);
        container.find('.select').simulate('change', event);
        expect(mockHandleSelectChange.mock.calls.length).toBe(1);
    });

    it('check "changeAnimalType" action on dispatching', () => {
        const animalType = 'rhino';
        mockedStore.dispatch(actions.changeAnimalType(animalType));
        expect(mockedStore.getActions()[0].animal).toEqual(animalType);
        expect(mockedStore.getActions()[0].type).toEqual(actionTypes.ANIMAL_TYPE)
    });

    it('calls handleDonationChange when simulating change on select\'', () => {
        const mockHandleDonationChange = jest.fn();
        const container = shallow(
            <Widget rememberLastDonationValue={mockHandleDonationChange}
                    setDonationValues={mockHandleDonationChange}/>
        );
        const event = {target:{value:3}};
        container.find('.radio').first().simulate('change', event);
        expect(mockHandleDonationChange.mock.calls.length).toBe(2);
    });

    it('check "setDonationValues" action on dispatching', () => {
        let expected = {
            value: 10,
            isSetManually: true
        };
        // initiate a new store to reset it as per: https://github.com/reduxjs/redux/issues/1183
        const mockedStore = mockStore(initialState);
        mockedStore.dispatch(actions.setDonationValues(expected));
        expect(mockedStore.getActions()[0].donation).toEqual(expected);
        expect(mockedStore.getActions()[0].type).toEqual(actionTypes.SET_DONATION_VALUE)
    });

    describe('Manual input', () => {
        it('calls setDonationValues when simulating change on manual input', () => {
            const event = {target: {value: null}};
            const handleManualInput = jest.fn();
            const container = shallow(<Widget setDonationValues={handleManualInput}/>);
            container.find('.manual-input').simulate('change', event);
            expect(handleManualInput.mock.calls.length).toBe(1);
        });

    })


});