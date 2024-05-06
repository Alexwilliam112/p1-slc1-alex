'use strict'

const Model = require('../models/model')
const View = require('../views/view')

class Controller {

    static async list() {
        try {
            const data = await Model.readBank()
            View.read(data)

        } catch (error) {
            View.printError(error)
        }
    }

    static async addBank(bankName, bankType) {
        try {
            const data = await Model.createBank(bankName, bankType)
            View.successAddBank(data)

        } catch (error) {
            View.printError(error)
        }
    }

    static async deleteBank(bankId) {
        try {
            const data = await Model.deleteBankById(bankId)
            View.successDelete(data)

        } catch (error) {
            View.printError(error)
        }
    }

    static async addCustomer(bankId, customerName, ktp, depositAmount) {
        try {
            const data = await Model.createCustomer(bankId, customerName, ktp, depositAmount)
            View.customerAdded(data)

        } catch (error) {
            View.printError(error)
        }
    }

    static async deleteCustomer(bankId, ktp) {
        try {
            const data = await Model.deleteCustomerByKtp(bankId, ktp)
            View.custDelete(data)

        } catch (error) {
            View.printError(error)
        }
    }

    static async detail(bankId) {
        try {
            const data = await Model.readCustomerByBankId(bankId)
            View.detail(data)

        } catch (error) {
            View.printError(error)
        }
    }
}

module.exports = Controller