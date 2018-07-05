import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedHeader,{Header} from './Header';
import configureMockStore from 'redux-mock-store';
import App from '../App';
import {initialState} from "../initialState";
import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import TestRenderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const mockedStore = mockStore(initialState);
const header = <ConnectedHeader store={mockedStore}/>;

describe('<Header/>', () => {

    it('renders Header component in App', () => {
        const container = shallow(<App/>);
        expect(container.find(ConnectedHeader).length).toEqual(1);
    });

    it('renders Header snapshot correctly', () => {
        const content = TestRenderer
            .create(<Header/>)
            .toJSON();
        expect(content).toMatchSnapshot();
    });

    it('should return "error" string when shouldHaveErrorClassName called', () => {
        const container = shallow(<Header isUserSettingIllegalManualValue={true} submitDonation={() => {}}/>);
        const instance = container.instance();
        const className = instance.buttonClassName();
        expect(className).toEqual('error');
    });

    it('should return "" string when shouldHaveErrorClassName called', () => {
        const container = shallow(<Header isUserSettingIllegalManualValue={false} submitDonation={() => {}}/>);
        const instance = container.instance();
        const className = instance.buttonClassName();
        expect(className).toEqual('');
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