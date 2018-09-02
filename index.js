// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

function uniqueArray(array) {
  let newArray = []

  array.forEach(el => {
    if (newArray.includes(el) === false) {
      newArray.push(el)
    }
  })

  return newArray
}
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  meals() {
    return uniqueArray(this.allMeals())
  }

  allMeals() {
    return this.deliveries().map(delivery => {
      return store.meals.find(meal => {
        return meal.id === delivery.mealId
      })
    })
  }

}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  meals() {
  return this.deliveries().map(delivery => {
      return store.meals.find(meal => {
        return meal.id === delivery.mealId
      })
    })
  }

  totalSpent() {
    let total = 0
    this.meals().forEach(meal => {
      total += meal.price
    })
    return total
  }

}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return store.customers.find(customer => {
        return customer.id === delivery.customerId
      })
    })
  }

  static byPrice() {
    return store.meals.sort((mealOne, mealTwo) => {
      return mealTwo.price - mealOne.price
    })
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++ deliveryId

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
  }
}
