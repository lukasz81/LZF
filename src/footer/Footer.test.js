import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedFooter from './Footer';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('<Footer/>', () => {

    it('renders Header component in App', () => {
        const container = shallow(<App/>);
        expect(container.find(ConnectedFooter).length).toEqual(1);
    });

});