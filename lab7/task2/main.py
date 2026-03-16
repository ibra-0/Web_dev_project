from models import Vehicle, Car, Motorcycle

def main():
    vehicle1 = Vehicle("Generic", "Transporter", 2020)
    car1 = Car("Toyota", "Camry", 2023, 4)
    moto1 = Motorcycle("Yamaha", "R6", 2022, "Sport")

    vehicles = [vehicle1, car1, moto1]

    for v in vehicles:
        print(v)  
        print(v.start())  
        print(v.stop())
        print("-" * 40)

    print(car1.open_trunk())
    print(moto1.do_wheelie())

if __name__ == "__main__":
    main()