import * as types from '../actions/actionTypes';
import editFormReducer from './index';
import {DONATION_VALUES} from "../widget/donationValues";

describe('Testing reducers initial state', () => {

    describe('editFormReducer reducer initial state', () => {
        it('should return the initial state', () => {
            expect(editFormReducer(undefined, {})).toEqual(
                {
                    animal: 'giraffe',
                    donation: {
                        value: DONATION_VALUES.defaultValue,
                        isSetManually: false
                    },
                    isUserSettingIllegalManualValue: false,
                    isRegularDonation: true,
                    lastRememberedDonationValue: null
                }
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

    it('shoule handle editFormReducer SET_TO_REGULAR_DONATION', () => {
        expect(editFormReducer([], {
            type: types.SET_TO_REGULAR_DONATION,
            isRegularDonation: true
        })).toEqual({
            isRegularDonation: true
        })
    });

    it('shoule handle editFormReducer REMEMBER_LAST_DONATION_VALUE', () => {
        expect(editFormReducer([], {
            type: types.REMEMBER_LAST_DONATION_VALUE,
            value: 5
        })).toEqual({
            lastRememberedDonationValue: 5
        })
    });

});