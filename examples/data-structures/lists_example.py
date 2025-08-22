# Lists Example
# This demonstrates various list operations in Python

# Creating lists
fruits = ["apple", "banana", "orange", "grape"]
numbers = [1, 2, 3, 4, 5]

print("Original fruits list:", fruits)

# Adding items
fruits.append("mango")
fruits.insert(1, "strawberry")
print("After adding items:", fruits)

# Removing items
removed_fruit = fruits.pop()
print(f"Removed fruit: {removed_fruit}")
print("After removing:", fruits)

# List comprehension
squared_numbers = [x**2 for x in numbers]
print("Squared numbers:", squared_numbers)

# Slicing
print("First 3 fruits:", fruits[:3])
print("Last 2 fruits:", fruits[-2:])