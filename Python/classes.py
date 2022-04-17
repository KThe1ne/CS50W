""" class Point():
    def __init__(self, x, y):
        self.x = x
        self.y = y 

p = Point(1,3)
print(p.x) """

class Flight():
    def __init__(self, capacity):
        self.capacity = capacity
        self.passengers = []

    def add_passenger(self, name):
        if not self.open_seats():
            return False
        self.passengers.append(name)
        return True

    def open_seats(self):
        return self.capacity - len(self.passengers)

flight = Flight(3)

people = ["Ben","Bob", "Amy", "Jenny"]

for person in people:
    if flight.add_passenger(person):
        print(f"{person} was added successfully.")
    else:
        print("Flight is at max capacity.")

flight2 = Flight(4)

for person in people:
    if flight2.add_passenger(person):
        print(f"{person} was added successfully.")
    else:
        print("Flight is at max capacity.")
