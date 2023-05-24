def compute(n):
    if n < 10:
        # For n less than 10, calculate its square
        out = n ** 2
    elif n < 20:
        # For n between 10 and 20, calculate factorial of (n-10)
        out = 1
        for i in range(1, n - 9):
            out *= i
    else:
        # For n greater than 20, calculate the sum of all integers between 1 and (n-20)
        out = sum(range(1, n - 19))
    
    return out


n = int(input("Enter an integer: "))
result = compute(n)
print("Result:", result)