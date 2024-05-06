'use strict'

class Bank {
    constructor(id, name, type, limit, customers) {
        this.id = id
        this.name = name
        this.type = type
        this.limit = limit
        this.customers = customers
    }
}

class LocalBank extends Bank {
    constructor(id, name, customers = []) {
        super(id, name, 'LocalBank', 3, customers)
    }
}

class NationalBank extends Bank {
    constructor(id, name, customers = []) {
        super(id, name, 'NationalBank', 5, customers)
    }
}

class Customer {
    #ktp
    #depositAmount
    constructor(name, ktp, depositAmount) {
        this.name = name
        this.#ktp = ktp
        this.#depositAmount = depositAmount
    }

    get ktp() {
        return this.#ktp
    }

    set ktp(string) {
        this.#ktp = string
    }

    get depositAmount() {
        return this.#depositAmount
    }

    set depositAmount(number) {
        this.#depositAmount = number
    }

    toJSON() {
        return {
            name: this.name,
            ktp: this.ktp,
            depositAmount: this.depositAmount
        }
    }
}

class Factory {

    static createCustomer(name, ktp, depositAmount) {
        return new Customer(name, ktp, depositAmount)
    }

    static createBank(id, name, bankType, customers) {
        switch (bankType) {
            case 'LocalBank': {
                if (!customers) {
                    return new LocalBank(id, name)
                }
                const customerList = customers.map((el) => {
                    return new Customer(el.name, el.ktp, el.depositAmount)
                })

                return new LocalBank(id, name, customerList)
            }

            case 'NationalBank': {
                if (!customers) {
                    return new NationalBank(id, name)
                }
                const customerList = customers.map((el) => {
                    return new Customer(el.name, el.ktp, el.depositAmount)
                })

                return new NationalBank(id, name, customerList)
            }

            default:
                throw new Error('Invalid bank type')
        }
    }
}

module.exports = Factory