import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {App} from './App';
import {DONATION_VALUES} from './widget/donationValues';

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
const widget = <Provider store={mockedStore}><App/></Provider>;

describe('<Widget/>', () => {
    it('renders Widget component in App', () => {
        const container = shallow(widget);
        expect(container.find(App).length).toEqual(1);
    });
});
