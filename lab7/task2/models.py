class Vehicle:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year

    def start(self):
        return f"{self.brand} {self.model} is starting."

    def stop(self):
        return f"{self.brand} {self.model} has stopped."

    def __str__(self):
        return f"{self.year} {self.brand} {self.model}"


class Car(Vehicle):
    def __init__(self, brand, model, year, doors):
        super().__init__(brand, model, year)
        self.doors = doors

    def start(self):
        return f"{self.brand} {self.model} (Car) engine is roaring to life!"

    def open_trunk(self):
        return f"{self.brand} {self.model} trunk is now open."

    def __str__(self):
        return f"{super().__str__()} with {self.doors} doors"


class Motorcycle(Vehicle):
    def __init__(self, brand, model, year, type_motorcycle):
        super().__init__(brand, model, year)
        self.type_motorcycle = type_motorcycle

    def start(self):
        return f"{self.brand} {self.model} (Motorcycle) is revving!"

    def do_wheelie(self):
        return f"{self.brand} {self.model} is performing a wheelie!"

    def __str__(self):
        return f"{super().__str__()} ({self.type_motorcycle})"