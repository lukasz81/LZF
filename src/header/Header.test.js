import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedHeader,{Header} from './Header';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

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

});