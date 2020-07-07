const PizzaSize = {
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
};

class PizzaPrice {
  static Cost(size) {
    switch (size) {
      case PizzaSize.Small:
        return 269.99;
      case PizzaSize.Medium:
        return 322.99;
      case PizzaSize.Large:
        return 394.99;
    }
    return 0;
  }
}

class Pizza {
  constructor(size) {
    this._size = size;
  }
}

class Customer {
  constructor(name, discounts) {
    this._name = name;
    this._discounts = discounts;
  }
  get name() {
    return this._name.toUpperCase();
  }

  set name(newName) {
    this._name = newName;
  }

  get discounts() {
    return this._discounts;
  }

  set discounts(discounts) {
    this._discounts = discounts;
  }

  Cost(quantity, size) {
    if (this._discounts === null) return PizzaPrice.Cost(size) * quantity;
    let newQuant = quantity;
    let newCost = PizzaPrice.Cost(size);
    this._discounts.forEach((rule) => {
      if (size == rule.OnValidOfSize) {
        newCost = Math.min(newCost, rule.Cost(quantity));
        newQuant = Math.min(newQuant, rule.Quantity(quantity));
      }
    });
    return newCost * newQuant;
  }
}

class QuantityDiscount {
  constructor(oldQuan, newQuan, size) {
    this.oldQuantity = oldQuan;
    this.newQuantity = newQuan;
    this._size = size;
  }

  get OnValidOfSize() {
    return this._size;
  }

  Cost() {
    return PizzaPrice.Cost(this._size);
  }

  Quantity(quantity) {
    let reducible = Math.floor(quantity / this.newQuantity);
    let newQuant =
      reducible * this.oldQuantity + quantity - reducible * this.newQuantity;
    return newQuant;
  }
}

class DirectDiscount {
  constructor(newPrice, size) {
    this.newPrice = newPrice;
    this._size = size;
  }
  get OnValidOfSize() {
    return this._size;
  }

  Cost() {
    return this.newPrice;
  }

  Quantity(quantity) {
    return quantity;
  }
}

class Checkout {
  constructor(customer) {
    this._customer = customer;
    this._smallPizzasInOrder = [];
    this._mediumPizzasInOrder = [];
    this._largePizzasInOrder = [];
  }

  Add(size) {
    switch (size) {
      case PizzaSize.Small:
        this._smallPizzasInOrder.push(new Pizza(PizzaSize.Small));
        break;
      case PizzaSize.Medium:
        this._mediumPizzasInOrder.push(new Pizza(PizzaSize.Medium));
        break;
      case PizzaSize.Large:
        this._largePizzasInOrder.push(new Pizza(PizzaSize.Large));
        break;
    }
  }

  Total() {
    let finalCost = 0.0;
    // console.log(this._smallPizzasInOrder.length);
    // console.log(this._mediumPizzasInOrder.length);
    // console.log(this._largePizzasInOrder.length);

    if (this._smallPizzasInOrder.length > 0) {
      // console.log(
      //   this._customer.Cost(this._smallPizzasInOrder.length, PizzaSize.Small)
      // );
      finalCost += this._customer.Cost(
        this._smallPizzasInOrder.length,
        PizzaSize.Small
      );
    }
    if (this._mediumPizzasInOrder.length > 0) {
      // console.log(
      //   this._customer.Cost(this._mediumPizzasInOrder.length, PizzaSize.Medium)
      // );
      finalCost += this._customer.Cost(
        this._mediumPizzasInOrder.length,
        PizzaSize.Medium
      );
    }
    if (this._largePizzasInOrder.length > 0) {
      // console.log(
      //   this._customer.Cost(this._largePizzasInOrder.length, PizzaSize.Large)
      // );
      finalCost += this._customer.Cost(
        this._largePizzasInOrder.length,
        PizzaSize.Large
      );
    }
    return finalCost;
  }
  show() {
    if (this._smallPizzasInOrder.length > 0)
      console.log(this._smallPizzasInOrder);

    if (this._mediumPizzasInOrder.length > 0)
      console.log(this._mediumPizzasInOrder);

    if (this._largePizzasInOrder.length > 0)
      console.log(this._largePizzasInOrder);
  }
}

// Run this ->

const facebook = new Customer('Facebook', [
  new QuantityDiscount(4, 5, PizzaSize.Medium),
  new DirectDiscount(389.99, PizzaSize.Large),
]);

const infoSys = new Customer('InfoSys', [
  new QuantityDiscount(2, 3, PizzaSize.Medium),
  new DirectDiscount(389.99, PizzaSize.Large),
]);

const amazon = new Customer('Amazon', [
  new QuantityDiscount(2, 3, PizzaSize.Medium),
  new DirectDiscount(389.99, PizzaSize.Large),
]);

const defaultCustomer = new Customer('Default', null);

const specialCustomer = new Customer('Special', [
  new DirectDiscount(300, PizzaSize.Large),
  new QuantityDiscount(2, 3, PizzaSize.Large),
]);

const co = new Checkout(facebook);
co.Add(PizzaSize.Large);
co.Add(PizzaSize.Large);
// co.Add(PizzaSize.Medium);
//co.Add(PizzaSize.Medium);
co.show();

// const co = new Checkout(specialCustomer);
// co.Add(PizzaSize.Large);
// co.Add(PizzaSize.Large);
// co.Add(PizzaSize.Large);
// co.Add(PizzaSize.Large);
// co.Add(PizzaSize.Large);
// co.Add(PizzaSize.Large);
// co.Add(PizzaSize.Large);
// co.Add(PizzaSize.Large);
// co.Add(PizzaSize.Large);
// co.Add(PizzaSize.Large);

co.Total();
console.log(`Total price would be ${co.Total()}`);
