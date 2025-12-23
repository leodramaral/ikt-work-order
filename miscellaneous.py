#!/usr/bin/env python3

def main():
    print("Hello World!")
    print("\n--- Questão 1 ---")

    result1 = question1([13, 15, 17, 19], [12, 14, 16, 18])
    print(f"Questão 1: {result1}")

    result2 = question2("abacaxi", "aca")
    print(f"Questão 2: {result2}")

    result3 = question3(6)
    print(f"Questão 3: {result3}")

    matrix = [[3, 5, 9], [1, 4, 7]]
    result4 = question4(matrix, 2, 3)
    print(f"Questão 4: {result4}")

    result5 = question5(7)
    print(f"Questão 5: {result5}")

# Questão 1:  Sabendo que você tem dois arrays de números inteiros, crie um terceiro array com a junção dos dois anteriores em ordem crescente
def question1(array1, array2):
    total_size = len(array1) + len(array2)

    merged = [0] * total_size

    i = 0
    while i < len(array1):
        merged[i] = array1[i]
        i += 1

    j = 0
    while j < len(array2):
        merged[i] = array2[j]
        i += 1
        j += 1

    i = 1
    while i < total_size:
        key = merged[i]
        j = i - 1

        while j >= 0 and merged[j] > key:
            merged[j + 1] = merged[j]
            j -= 1

        merged[j + 1] = key
        i += 1

    return merged

# Questão 2: Imagine que você tenha uma tela com duas entradas, uma com o texto e outra com a string a ser encontrada. Monte um algoritmo para encontrar a posição dessa string nesse texto.  Caso não encontre, retornar -1.
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

# Questão 3: Dando um número N inteiro, escreva um algoritmo que descreva os N números da sequencia de Fibonacci
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

# Questão 4:  Crie uma função ou procedimento que receba uma matriz AxB do tipo numérico e dois parâmetros que indicam o tamanho da matriz A, B. Encontre o maior número dessa matriz.
def question4(matrix, lines, columns):
    max_value = matrix[0][0]

    i = 0
    while i < lines:
        j = 0
        while j < columns:
            if matrix[i][j] > max_value:
                max_value = matrix[i][j]
            j += 1
        i += 1

    return max_value

# Questão 5: Informando uma entrada numérica N, informe o total da multiplicação de N números primos seguidos.
def question5(quantity):
    if quantity <= 0:
        return 1 

    count = 0
    candidate = 2
    product = 1

    while count < quantity:
        if candidate < 2:
            is_prime = False
        else:
            is_prime = True
            d = 2
            while d * d <= candidate:
                if candidate % d == 0:
                    is_prime = False
                    break
                d += 1

        if is_prime:
            product = product * candidate
            count += 1

        candidate += 1

    return product


if __name__ == "__main__":
    main()
