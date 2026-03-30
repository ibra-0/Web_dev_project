class Product:
    def __init__(self, name, price, rating):
        self.name = name
        self.price = price
        self.rating = rating

    def get_info(self):
        return f"{self.name} costs {self.price}₸"

    def get_rating(self):
        return f"Rating: {self.rating}"

    def __str__(self):
        return f"{self.name} | {self.price}₸ | ⭐ {self.rating}"


class Phone(Product):
    def __init__(self, name, price, rating, brand):
        super().__init__(name, price, rating)
        self.brand = brand

    def get_info(self):  
        return f"{self.brand} phone: {self.name} costs {self.price}₸"

    def call(self):
        return f"{self.name} is calling..."


class Laptop(Product):
    def __init__(self, name, price, rating, ram):
        super().__init__(name, price, rating)
        self.ram = ram

    def get_info(self):  
        return f"Laptop {self.name} with {self.ram}GB RAM costs {self.price}₸"

    def code(self):
        return f"Coding on {self.name}..."