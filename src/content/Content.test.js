import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedContent from './Content';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('<Content/>', () => {

    it('renders Header component in App', () => {
        const container = shallow(<App/>);
        expect(container.find(ConnectedContent).length).toEqual(1);
    });

});