import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedWidget,{Widget} from './Widget';
import {Provider} from 'react-redux';
import App from '../App';
import * as actions from '../actions';
import * as actionTypes from '../actions/actionTypes';
import {initialState} from '../initialState';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();

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
        wrapper.unmount();
    });

    it('calls handleSelectChange when simulating change on select', () => {
        const animalType = 'rhino';
        const event = {target: {value: animalType}};
        const mockHandleSelectChange = jest.fn();
        const container = shallow(<Widget
            donation={{value:5,isSetManually:true}}
            changeAnimalType={mockHandleSelectChange}/>);
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
                    donation={{value:5,isSetManually:true}}
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

    it('calls setDonationValues when simulating change on manual input', () => {
        const event = {target: {value: null}};
        const handleManualInput = jest.fn();
        const container = shallow(<Widget
            donation={{value:5,isSetManually:true}}
            setDonationValues={handleManualInput}/>);
        container.find('.manual-input').simulate('change', event);
        expect(handleManualInput.mock.calls.length).toBe(1);
    });

    it('calls submitDonation action when submitting the form', () => {
        const mockedStore = mockStore(initialState);
        const actions = mockedStore.getActions();
        const event = {preventDefault: () => {}};
        const handleSubmit = jest.fn();
        const container = shallow(<ConnectedWidget
            store={mockedStore}
            submitDonation={handleSubmit}/>);
        expect(actions[0]).toBe(undefined);
        container.dive().find('.form').simulate('submit', event);
        expect(actions[0].type).toBe(actionTypes.SUBMIT_DONATION);
    });



    //// checkUpdatedValues

    describe('checkUpdatedValues method', () => {

        it('should call checkUpdatedValues with passed value of 3', () => {
            const container = shallow(<Widget donation={{value:5,isSetManually:true}}/>);
            const instance = container.instance();
            jest.spyOn(instance, 'checkUpdatedValues');
            instance.checkUpdatedValues(3);
            expect(instance.checkUpdatedValues).toHaveBeenCalledWith(3);
        });

        it('should call checkUpdatedValues and return "true" when passed value = props value && isSetManually equals "false', () => {
            const value = 5;
            const container = shallow(<Widget donation={{value: value, isSetManually: false}}/>);
            const instance = container.instance();
            jest.spyOn(instance, 'checkUpdatedValues');
            let fn = instance.checkUpdatedValues(value);
            expect(fn).toEqual(true);
        });

        it('should call checkUpdatedValues and return "false" when passed value != props value && isSetManually equals "false', () => {
            const value = 5;
            const container = shallow(<Widget donation={{value: value, isSetManually: false}}/>);
            const instance = container.instance();
            jest.spyOn(instance, 'checkUpdatedValues');
            let fn = instance.checkUpdatedValues(value - 1);
            expect(fn).toEqual(false);
        });

        it('should call checkUpdatedValues and return "false" when passed value != props value && isSetManually equals "false', () => {
            const value = 5;
            const container = shallow(<Widget donation={{value: value, isSetManually: true}}/>);
            const instance = container.instance();
            jest.spyOn(instance, 'checkUpdatedValues');
            let fn = instance.checkUpdatedValues(value);
            expect(fn).toEqual(false);
        });

    });
});