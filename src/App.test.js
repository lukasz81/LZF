import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {App} from './App';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const mockedStore = mockStore({});
const app = <Provider store={mockedStore}><App/></Provider>;
jest.mock('./header/Header', () => 'header');
jest.mock('./widget/Widget', () => 'widget');

describe('<App/>', () => {

    it('renders App component ', () => {
        const container = shallow(app);
        expect(container.find(App).length).toEqual(1);
    });

    it('renders App snapshot correctly', () => {
        const app = TestRenderer.create(<App/>).toJSON();
        expect(app).toMatchSnapshot();
    });
});
