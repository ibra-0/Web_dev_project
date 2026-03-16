x = int(input())
count = 0

i = 1
while i * i <= x:
    if x % i == 0:
        if i * i == x:
            count += 1
        else:
            count += 2
    i += 1

print(count)