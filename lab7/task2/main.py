from models import Product, Phone, Laptop

p1 = Phone("iPhone 15", 499000, 4.8, "Apple")
p2 = Phone("Samsung S24", 459000, 4.7, "Samsung")

l1 = Laptop("MacBook Air M2", 899000, 4.9, 16)
l2 = Laptop("Asus TUF Gaming", 650000, 4.6, 32)

products = [p1, p2, l1, l2]

for product in products:
    print(product)                
    print(product.get_info())      
    print(product.get_rating())

    if isinstance(product, Phone):
        print(product.call())

    if isinstance(product, Laptop):
        print(product.code())

    print("------")