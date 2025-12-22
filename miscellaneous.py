#!/usr/bin/env python3

def main():
    print("Hello World!")
    print("\n--- Questão 1 ---")

    result2 = question2("abacaxi", "aca")
    print(f"Resultado: {result2}")

    result3 = question3(6)
    print(f"Resultado: {result3}")

# Naive searching
# Ideal para buscas pequenas
def question2(text, query):
    n = len(text)
    m = len(query)
    i = 0

    while i <= n - m:
        j = 0

        while j < m and text[i + j] == query[j]:
            j += 1

        if j == m:
            return i

        i += 1

    return -1

# Fibonacci
# o C é o resultado da soma dos dois anteriores
def question3(quantity):
    result = [0] * quantity 

    a = 1 
    b = 1

    i = 0
    while i < quantity:
        result[i] = a

        c = a + b
        a = b
        b = c
        i += 1

    return result


if __name__ == "__main__":
    main()
