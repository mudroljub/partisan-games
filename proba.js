class ClassA {
  methodA() {
    return 'Metoda klase A'
  }
}

class ClassB {
  methodB() {
    return 'Metoda klase B'
  }
}

// Kopiramo metode sa jednog prototipa na drugi
Object.assign(ClassB.prototype, ClassA.prototype)

const instanceB = new ClassB()
console.log(instanceB.methodB()) // Metoda klase B
console.log(instanceB.methodA()) // Metoda klase A
