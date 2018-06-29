import * as types from '../actions/actionTypes';
import editFormReducer from './index';
import {DONATION_VALUES} from "../widget/donationValues";
import {initialState} from '../initialState';

describe('Testing reducers initial state', () => {

    describe('editFormReducer reducer initial state', () => {
        it('should return the initial state', () => {
            expect(editFormReducer(undefined, {})).toEqual(
                initialState
            )
        });
    });

});

describe('Testing handling reducers', () => {

    it('should handle editFormReducer ANIMAL_TYPE', () => {
        expect(editFormReducer([], {
            type: types.ANIMAL_TYPE,
            animal: 'giraffe'
        })).toEqual({
            animal: 'giraffe'
        })

    });

    it('should handle editFormReducer SET_DONATION_VALUE', () => {
        let donations = {
            value: DONATION_VALUES.defaultValue,
            isSetManually: false
        };
        expect(editFormReducer([], {
            type: types.SET_DONATION_VALUE,
            donation: donations,
        })).toEqual({
            donation: donations,
            isUserSettingIllegalManualValue: false
        })
    });

    it('should output isUserSettingIllegalManualValue = true in editFormReducer SET_DONATION_VALUE', () => {
        let donations = {
            value: DONATION_VALUES.defaultValue,
            isSetManually: true
        };
        expect(editFormReducer([], {
            type: types.SET_DONATION_VALUE,
            donation: donations,
        })).toEqual({
            donation: donations,
            isUserSettingIllegalManualValue: true
        })
    });

    it('should output isUserSettingIllegalManualValue = false in editFormReducer SET_DONATION_VALUE', () => {
        let donations = {
            value: 15,
            isSetManually: true
        };
        expect(editFormReducer([], {
            type: types.SET_DONATION_VALUE,
            donation: donations,
        })).toEqual({
            donation: donations,
            isUserSettingIllegalManualValue: false
        })
    });

    it('should handle editFormReducer SET_TO_REGULAR_DONATION', () => {
        expect(editFormReducer([], {
            type: types.SET_TO_REGULAR_DONATION,
            isRegularDonation: true
        })).toEqual({
            isRegularDonation: true
        })
    });

    it('should handle editFormReducer REMEMBER_LAST_DONATION_VALUE', () => {
        expect(editFormReducer([], {
            type: types.REMEMBER_LAST_DONATION_VALUE,
            value: 5
        })).toEqual({
            lastRememberedDonationValue: 5
        })
    });

    it('should handle editFormReducer SUBMIT_DONATION', () => {
        expect(editFormReducer([], {
            type: types.SUBMIT_DONATION,
            submitValues: {
                animal: 'dog',
                donation: {
                    value: 5
                },
                isRegularDonation: true
            }
        })).toEqual({
            submitValues: {
                animal: 'dog',
                amount: 5,
                isRegularDonation: true
            }
        })
    });

});