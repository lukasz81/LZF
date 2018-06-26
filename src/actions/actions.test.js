import configureMockStore from 'redux-mock-store';
import * as actions from './';
import * as types from './actionTypes';
const mockStore = configureMockStore();

describe('Redux actions', () => {

    it('should create an action to set animal to "anaconda"', () => {

        const expectedAction = [{
            type: types.ANIMAL_TYPE,
            animal: 'anaconda'
        }];
        const store = mockStore();

        store.dispatch(actions.changeAnimalType('anaconda'));
        expect(store.getActions()).toEqual(expectedAction);


    });

    it('should create an action to set donation', () => {

        const expectedAction = [{
            type: types.SET_DONATION_VALUE,
            donation: {value:1,isSetManually:false}
        }];
        const store = mockStore();

        store.dispatch(actions.setDonationValues({value:1,isSetManually:false}));
        expect(store.getActions()).toEqual(expectedAction);

    });

    it('should create an action to set setToRegularDonations to "true"', () => {

        const expectedAction = [{
            type: types.SET_TO_REGULAR_DONATION,
            isRegularDonation: true
        }];
        const store = mockStore();

        store.dispatch(actions.setToRegularDonations(true));
        expect(store.getActions()).toEqual(expectedAction);

    });

    it('should rememberLastDonationValue', () => {

        const expectedAction = [{
            type: types.REMEMBER_LAST_DONATION_VALUE,
            value: 6
        }];
        const store = mockStore();

        store.dispatch(actions.rememberLastDonationValue(6));
        expect(store.getActions()).toEqual(expectedAction);

    });

    it('should create an action to submitDonation', () => {

        const expectedAction = [{
            type: types.SUBMIT_DONATION,
            submitValues: {animal: 'lion', value: 6, isRegularDonation: false}
        }];
        const store = mockStore();

        store.dispatch(actions.submitDonation({animal: 'lion', value: 6, isRegularDonation: false}));
        expect(store.getActions()).toEqual(expectedAction);

    });

});
