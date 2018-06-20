import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedWidget,{Widget} from './Widget';
import {Provider} from 'react-redux';
import App from '../App';
import {DONATION_VALUES} from './donationValues';
import * as actions from '../actions';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const initialState = {
    animal: 'giraffe',
    selectedDonation: DONATION_VALUES.defaultValue,
    lastSelectedDonation: DONATION_VALUES.defaultValue,
    isManualInputInError: false,
    hasSetMonthlyDonation: true
};

const fakeStore = mockStore(initialState);
const widget = <Provider store={fakeStore}><ConnectedWidget/></Provider>;

describe('<Widget/>', () => {

    it('renders Widget component in App', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find(ConnectedWidget).length).toEqual(1);
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

    it('check action on dispatching', () => {
        const animalType = 'rhino';
        fakeStore.dispatch(actions.changeAnimalType(animalType));
        expect(fakeStore.getActions()[0].animal).toEqual(animalType);
    });

    it('updates component\'s state after running handleDonationChange', () => {
        const wrapper = shallow(<Widget/>);
        const event = {target:{value:5}};
        wrapper.instance().handleDonationChange(event);
        expect(wrapper.state().lastSelectedDonation).toEqual(5);
    });

    describe('Test handleManualInput method', () => {

        it('updates component\'s state isManualInputInError property with "true" after running handleManualInput', () => {
            const wrapper = shallow(<Widget/>);
            const event = {target: {value: 5}};
            wrapper.instance().handleManualInput(event);
            expect(wrapper.state().isManualInputInError).toEqual(true);
        });

        it('updates component\'s state isManualInputInError property with "false" after running handleManualInput', () => {
            const wrapper = shallow(<Widget/>);
            const event = {target: {value: 12}};
            wrapper.instance().handleManualInput(event);
            expect(wrapper.state().isManualInputInError).toEqual(false);
        });

        it('check if "handleManualInput" calls "resetRadioButtons" correctly with passed in value', () => {
            const wrapper = shallow(<Widget/>);
            const event = {target: {value: 12}};
            const spyResetRadioButtons = jest.spyOn(wrapper.instance(), 'resetRadioButtons');
            wrapper.instance().handleManualInput(event);
            expect(spyResetRadioButtons).toHaveBeenCalledWith(12);
        });

        it('check if "handleManualInput" calls "resetRadioButtons" correctly with "lastSelectedDonation"', () => {
            const wrapper = shallow(<Widget/>);
            const event = {target: {value: ''}};
            const spyResetRadioButtons = jest.spyOn(wrapper.instance(), 'resetRadioButtons');
            const lastSelectedDonation = initialState.lastSelectedDonation;
            wrapper.instance().handleManualInput(event);
            expect(spyResetRadioButtons).toHaveBeenCalledWith(lastSelectedDonation)
        });
    });
});