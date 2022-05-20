people = [
    {"fname": "Kamoi","lname": "Gilkes"},
    {"fname": "Billy", "lname": "Bob"},
    {"fname": "Bram", "lname": "Pton"}    
]

people.sort(key=lambda person: person["fname"])
print(people)