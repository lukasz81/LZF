import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Widget from './Widget';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('<Widget/>', () => {

    it('renders Widget component in App', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find(Widget).length).toEqual(1);
    });

    it('checks if element has ".widget" className', () => {
        const wrapper = shallow(<Widget/>);
        expect( wrapper.find('.widget').length).toEqual(1);
    });
});