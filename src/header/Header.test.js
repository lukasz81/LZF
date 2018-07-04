import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedHeader,{Header} from './Header';
import configureMockStore from 'redux-mock-store';
import App from '../App';
import {initialState} from "../initialState";
import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const mockedStore = mockStore(initialState);
const header = <ConnectedHeader store={mockedStore}/>;

describe('<Header/>', () => {

    it('renders Header component in App', () => {
        const container = shallow(<App/>);
        expect(container.find(ConnectedHeader).length).toEqual(1);
    });

    it('calls submitDonation when clicking button', () => {
        const handleDonateClick = jest.fn();
        const container = shallow(<Header submitDonation={handleDonateClick}/>);
        container.find('.cta').simulate('click');
        expect(handleDonateClick.mock.calls.length).toBe(1);
    });

    it('should map state to props properly', () => {
        const container = shallow(header);
        const props = container.props();
        expect(props.submitValues).toEqual(initialState);
    });

    it('checks "submitDonation" action on dispatching', () => {
        mockedStore.dispatch(actions.submitDonation(initialState));
        expect(mockedStore.getActions()[0].submitValues).toEqual(initialState);
        expect(mockedStore.getActions()[0].type).toEqual(actionTypes.SUBMIT_DONATION)
    });

});