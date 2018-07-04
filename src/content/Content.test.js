import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedContent, {Content} from './Content';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('<Content/>', () => {

    it('renders Content component in App', () => {
        const container = shallow(<App/>);
        expect(container.find(ConnectedContent).length).toEqual(1);
    });

    it('renders Content snapshot correctly', () => {
        const content = TestRenderer
            .create(<Content/>)
            .toJSON();
        expect(content).toMatchSnapshot();
    });

});