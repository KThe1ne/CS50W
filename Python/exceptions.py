from tkinter import Y


import sys

try:
    x = int(input("x: "))
    y = int(input("y: "))
except ValueError:
    print("Not int")
    sys.exit(1)

try:
    result = x/y
except ZeroDivisionError:
    print("Error: Cannot divide by 0.")
    sys.exit(1)
except ValueError:
    print("Not an int")
print(f"{x} / {y} = {result}")

