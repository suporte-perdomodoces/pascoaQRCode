"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNumberPhone = void 0;
const checkNumberPhone = (phone) => {
    const numberLength = 13;
    if (phone.length !== numberLength) {
        return false;
    }
    const isAllNumber = phone.split('').every(char => char >= '0' && char <= '9');
    if (!isAllNumber) {
        return false;
    }
    return true;
};
exports.checkNumberPhone = checkNumberPhone;
//# sourceMappingURL=checkNumberPhone.js.map