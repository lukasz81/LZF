import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedFooter,{Footer} from './Footer';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('<Footer/>', () => {

    it('renders Footer component in App', () => {
        const container = shallow(<App/>);
        expect(container.find(ConnectedFooter).length).toEqual(1);
    });

    it('renders Footer snapshot correctly', () => {
        const content = TestRenderer
            .create(<Footer/>)
            .toJSON();
        expect(content).toMatchSnapshot();
    });

});