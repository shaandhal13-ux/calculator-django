from django.shortcuts import render, redirect
import math
from .models import CalculationHistory

def calculator(request):
    result = None

    if request.method == "POST":
        operation = request.POST.get("operation")
        sub_operation = request.POST.get("sub_operation")
        num1_raw = request.POST.get("num1")
        num2_raw = request.POST.get("num2")

        try:
            num1 = int(num1_raw) if num1_raw else None
            num2 = int(num2_raw) if num2_raw else None
        except ValueError:
            result = "Please enter valid numbers."

        else:
             # ----- Arithmetic -----
            if operation == "arith":
                if num1 is None or num2 is None:
                    result = "Please enter both numbers for arithmetic operations."
                elif sub_operation == "add":
                    result = f"Addition of {num1} and {num2} is {num1 + num2}"
                elif sub_operation == "sub":
                    result = f"Subtraction of {num1} and {num2} is {num1 - num2}"
                elif sub_operation == "mul":
                    result = f"Multiplication of {num1} and {num2} is {num1 * num2}"
                elif sub_operation == "div":
                    result = f"Division of {num1} by {num2} is {num1 / num2}" if num2 != 0 else "Cannot divide by zero."
                elif sub_operation == "mod":
                    result = f"Modulus of {num1} and {num2} is {num1 % num2}" if num2 != 0 else "Cannot take modulus by zero."
                else:
                    result = "Please select a valid arithmetic operation."

             # ----- Armstrong -----
            elif operation == "arm":
                if num1 is None:
                    result = "Please enter a number to check Armstrong."
                else:
                    digits = str(num1)
                    power = len(digits)
                    total = sum(int(d) ** power for d in digits)
                    result = f"{num1} is {'an' if total == num1 else 'not an'} Armstrong number."

           # ----- Average -----
            elif operation == "avg":
                if num1 is None or num2 is None:
                    result = "Please enter both values (Sum and Count)."
                elif num2 == 0:
                    result = "Total count cannot be zero."
                else:
                    avg = num1 / num2
                    result = f"The average is {avg:.2f} (Sum: {num1}, Count: {num2})."

            # ----- Even/odd -----
            elif operation == "evenodd":
                if num1 is None:
                    result = "Please enter a number."
                else:
                    result = f"{int(num1)} is {'Even' if int(num1) % 2 == 0 else 'Odd'}."

            # ----- Factorial -----
            elif operation == "fact":
                if num1 is None:
                    result = "Please enter a number for factorial."
                elif num1 < 0:
                    result = "Factorial does not exist for negative numbers."
                else:
                    fact = 1
                    for i in range(1, num1 + 1):
                        fact *= i
                    result = f"The factorial of {num1} is {fact}."

            # ----- GCD/HCF -----
            elif operation in ["gcd", "hcf"]:
                if num1 is None or num2 is None:
                    result = "Please enter both numbers for HCF/GCD."
                elif num1 == 0 and num2 == 0:
                    result = "HCF/GCD is not defined for both numbers being zero."
                else:
                    hcf = math.gcd(num1, num2)
                    result = f"The HCF (GCD) of {num1} and {num2} is {hcf}."

            # ----- Factorial -----
            elif operation == "lcm":
                if num1 is None or num2 is None:
                    result = "Please enter both numbers for LCM."
                elif num1 == 0 or num2 == 0:
                    result = "LCM is not defined when either number is zero."
                else:
                    lcm = abs(num1 * num2) // math.gcd(num1, num2)
                    result = f"The LCM of {num1} and {num2} is {lcm}."

            # ----- Prime -----
            elif operation == "prime":
                if num1 is None:
                    result = "Please enter a number to check prime."
                elif num1 <= 1:
                    result = f"{num1} is not a prime number."
                else:
                    for i in range(2, int(num1 ** 0.5) + 1):
                        if num1 % i == 0:
                            result = f"{num1} is not a prime number."
                            break
                    else:
                        result = f"{num1} is a prime number."
            
            # ----- Power -----
            elif operation == "power":
                if num1 is None or num2 is None:
                    result = "Please enter both numbers for power."
                else:
                    result = f"Power: {num1}^{num2} = {num1 ** num2}"
            
            # ----- Square -----
            elif operation == "square":
                if num1 is None:
                    result = "Please enter a number."
                else:
                    result = f"The square of {num1} is {num1 ** 2}"

            # ----- Square Root -----
            elif operation == "sqrt":
                if num1 is None:
                    result = "Please enter a number."
                elif num1 < 0:
                    result = "Square root is not defined for negative numbers."
                else:
                    result = f"The square root of {num1} is {math.sqrt(num1):.3f}"

            # Save result in DB
            if result:
                CalculationHistory.objects.create(
                    operation=operation,
                    inputs=f"{num1 if num1 is not None else ''}, {num2 if num2 is not None else ''}",
                    result=result
                )

            # Store in session and redirect to clear POST
            request.session['calc_result'] = result
            return redirect('calculator')

    # Retrieve and clear result from session (for GET request)
    result = request.session.pop('calc_result', None)
    return render(request, "home.html", {"result": result})


def history(request):
    history_items = CalculationHistory.objects.all().order_by('-created_at')
    return render(request, 'history.html', {'history_items': history_items})
