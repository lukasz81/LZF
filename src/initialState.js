import {DONATION_VALUES} from "./widget/donationValues";

export const initialState = {
    animal: 'giraffe',
    donation: {
        value: DONATION_VALUES.defaultValue,
        isSetManually: false
    },
    isUserSettingIllegalManualValue: false,
    isRegularDonation: true,
    lastRememberedDonationValue: null,
    submitValues: {}
};