'use strict'

const { json } = require('stream/consumers')
const Factory = require('./class')
const { readFile, writeFile } = require('fs').promises

class Model {

    static async saveJSON(pathFile, data) {
        try {
            const newData = JSON.stringify(data, null, 4)
            await writeFile(pathFile, newData)

        } catch (error) {
            throw error
        }
    }

    static async readBank() {
        try {
            const rawBank = await readFile('./data.JSON')
            const parsedBank = JSON.parse(rawBank)

            const banks = parsedBank.map((el) => {
                return Factory.createBank(el.id, el.name, el.type, el.customers)
            })

            return banks

        } catch (error) {
            throw error
        }
    }

    static async createBank(bankName, bankType) {
        try {
            let newId = 0
            const banks = await Model.readBank()

            if (bankType !== 'LocalBank' && bankType !== 'NationalBank') {
                throw new Error('invalid bank type')
            }

            banks.forEach(element => {
                if (element.id >= newId) {
                    newId = element.id + 1
                }
            });

            const newBank = Factory.createBank(newId, bankName, bankType, undefined)
            banks.push(newBank)

            console.log(banks);

            await Model.saveJSON('./data.json', banks)

            return newBank

        } catch (error) {
            throw error
        }
    }

    static async deleteBankById(bankId) {
        try {
            const banks = await Model.readBank()

            const deleteThis = banks.find((el) => {
                return el.id === bankId
            })

            if (!deleteThis) {
                throw new Error(`Bank with id ${bankId} is not found`)
            }

            const newData = banks.filter((el) => {
                return el.id !== bankId
            })

            await Model.saveJSON('./data.json', newData)

            return deleteThis

        } catch (error) {
            throw error
        }

    }

    static async createCustomer(bankId, customerName, ktp, depositAmount) {
        try {
            const banks = await Model.readBank()
            const bankFound = banks.find((el) => {
                return el.id === bankId
            })

            let customerCount = 0

            bankFound.customers.map((el) => {
                customerCount++
            })

            if (customerCount === bankFound.limit) {
                throw new Error("You Can't add more customer to this bank")
            }

            if (!bankFound) {
                throw new Error('bank not found')
            }

            const newCustomer = Factory.createCustomer(customerName, ktp, depositAmount)
            bankFound.customers.push(newCustomer)

            await Model.saveJSON('./data.json', banks)

            return newCustomer

        } catch (error) {
            throw error
        }
    }

    static async deleteCustomerByKtp(bankId, ktp) {
        try {
            const banks = await Model.readBank()
            const bankFound = banks.find((el) => {
                return el.id === bankId
            })

            if (!bankFound) {
                throw new Error('bank not found')
            }

            const deleteTarget = bankFound.customers.find((el) => {
                return el.ktp === ktp
            })

            if (!deleteTarget) {
                throw new Error(`Customer with ktp ${ktp} is not found`)
            }

            const newData = bankFound.customers.filter((el) => {
                return el.ktp !== ktp
            })

            bankFound.customers = newData

            await Model.saveJSON('./data.json', banks)

            return deleteTarget

        } catch (error) {
            throw error
        }
    }

    static async readCustomerByBankId(bankId) {
        try {
            const banks = await Model.readBank()
            const bankFound = banks.find((el) => {
                return el.id === bankId
            })

            if (!bankFound) {
                throw new Error('bank not found')
            }

            return bankFound.customers

        } catch (error) {
            throw error
        }
    }
}

module.exports = Model