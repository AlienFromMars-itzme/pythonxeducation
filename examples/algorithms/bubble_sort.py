# Bubble Sort Algorithm
# This implements the bubble sort algorithm to sort a list

def bubble_sort(arr):
    """
    Sort an array using bubble sort algorithm
    Time Complexity: O(n²)
    Space Complexity: O(1)
    """
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Flag to optimize - if no swapping occurs, array is sorted
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swapping occurred, array is sorted
        if not swapped:
            break
    
    return arr

# Example usage
if __name__ == "__main__":
    # Test the bubble sort function
    unsorted_list = [64, 34, 25, 12, 22, 11, 90]
    print("Original list:", unsorted_list)
    
    sorted_list = bubble_sort(unsorted_list.copy())
    print("Sorted list:", sorted_list)
    
    # Test with different data
    test_cases = [
        [5, 2, 8, 1, 9],
        [1],
        [],
        [3, 3, 3, 3],
        [9, 8, 7, 6, 5, 4, 3, 2, 1]
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        result = bubble_sort(test_case.copy())
        print(f"Test {i}: {test_case} -> {result}")