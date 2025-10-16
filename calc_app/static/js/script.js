//number input field according to the operation
function showFields() {
    const op = document.getElementById('operation').value;
    const num1 = document.getElementById('num1Container');
    const num2 = document.getElementById('num2Container');
    const arith = document.getElementById('arithContainer');
    const label1 = num1.querySelector('label');
    const label2 = num2.querySelector('label');

    // hide all by default
    num1.style.display = 'none';
    num2.style.display = 'none';
    arith.style.display = 'none';
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');

    // reset labels
    label1.textContent = "Number 1:";
    label2.textContent = "Number 2:";

    // Arithmetic (needs both + sub)
    if (op === 'arith') {
        num1.style.display = 'block';
        num2.style.display = 'block';
        arith.style.display = 'block';
    }
    // Power operation
    else if (op === 'power') {
        num1.style.display = 'block';
        num2.style.display = 'block';
        label1.textContent = "Enter Base:";
        label2.textContent = "Enter Exponent:";
    }
    // Average operation
    else if (op === 'avg') {
        num1.style.display = 'block';
        num2.style.display = 'block';
        label1.textContent = "Enter Sum of Numbers:";
        label2.textContent = "Enter the Total Count:";
    }
    // GCD / HCF / LCM
    else if (["gcd", "hcf", "lcm"].includes(op)) {
        num1.style.display = 'block';
        num2.style.display = 'block';
        label1.textContent = "Enter Number 1:";
        label2.textContent = "Enter Number 2:";
    }
    // Single-number operations
    else if (["square", "sqrt", "fact", "arm", "prime", "evenodd"].includes(op)) {
        num1.style.display = 'block';
        label1.textContent = "Enter the Number:";
    }
}
//clear button
document.addEventListener("DOMContentLoaded", () => {
    const clearBtn = document.getElementById("clearBtn");
    const resultCard = document.getElementById("result");
    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            if (resultCard) {
                resultCard.style.display = "none";
            }
        });
    }
});

// Display current date
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);
}
updateDate();


//explanation
document.addEventListener("DOMContentLoaded", () => {
    const explainBtn = document.getElementById("explainBtn");
    const explanationBox = document.getElementById("explanation");

    if (explainBtn && explanationBox) {
        explainBtn.addEventListener("click", () => {
            if (explanationBox.style.display === "none") {
                explanationBox.style.display = "block";
                explainBtn.textContent = "Hide Explanation";
                
                const resultText = document.querySelector("#result p").textContent.toLowerCase();
                const text = resultText.toLowerCase().trim();
                let title = ""; //displays thetitle of the operation
                let definition = ""; //displays the definition of the operation
                let steps = ""; //displays what are the steps 
                let example = ""; //displays example

                // Match operation type dynamically

                //hcf and gcd
                if (resultText.includes("hcf") || resultText.includes("gcd")) {
                    title = "HCF / GCD (Highest Common Factor)";
                    definition = "The HCF or GCD of two numbers is the largest number that divides both exactly.";
                    steps = "\n1️⃣ Divide the larger number by the smaller.\n2️⃣ Take the remainder and divide the previous divisor by it.\n3️⃣ Repeat until the remainder becomes 0.\n4️⃣ The last non-zero remainder is the HCF.";
                    example = "Example: HCF(12, 18) → 18 ÷ 12 = 1 r6 → 12 ÷ 6 = 2 r0 → HCF = 6.";
                }

                //lcm
                else if (resultText.includes("lcm")) {
                    title = "LCM (Least Common Multiple)";
                    definition = "LCM is the smallest number that is a multiple of both given numbers.";
                    steps = "\n1️⃣ List the multiples of both numbers.\n2️⃣ Find the first common multiple.";
                    example = "Example:Multiples of 4 → 4,8,12,16; Multiples of 6 → 6,12,18 → LCM = 12.";
                }

                //factorial
                else if (resultText.includes("factorial")) {
                    title = "Factorial";
                    definition = "The factorial of a number (n!) is the product of all positive integers up to n.";
                    steps = ":\n1️⃣ Start with 1.\n2️⃣ Multiply it by each number from 1 to n.";
                    example = "Example: 5! = 5 × 4 × 3 × 2 × 1 = 120.";
                }

                //armstrong
                else if (resultText.includes("armstrong")) {
                    title = "Armstrong Number";
                    definition = "An Armstrong number equals the sum of its digits each raised to the power of the number of digits.";
                    steps = "\n1️⃣ Count total digits.\n2️⃣ Split number into digits.\n3️⃣ Raise each digit to power of total digits.\n4️⃣ Add them. If sum = number → Armstrong.";
                    example = "Example: 153 = 1³ + 5³ + 3³ = 153.";
                }

                //prime
                else if (resultText.includes("prime")) {
                    title = "Prime Number";
                    definition = "A prime number has only two factors: 1 and itself.";
                    steps = "\n1️⃣ Divide number by all integers from 2 to number−1.\n2️⃣ If divisible by any, it's not prime.\n3️⃣ Else, it's prime.";
                    example = "Example:  7 → not divisible by 2,3,4,5,6 → Prime ✅";
                }

                //addition
                else if (resultText.includes("addition")) {
                    title = "Addition";
                    definition = "Addition combines two or more numbers to find their total or sum";
                    steps = "\n1️⃣Add both numbers";
                    example = "Example: 5 + 3 = 8.";
                }

                //subtraction
                else if (resultText.includes("subtraction")) {
                    title = "Subtraction";
                    definition = "Subtraction finds the difference between two numbers.";
                    steps = "\n1️⃣Minus the smaller number from the larger.";
                    example = "Example: 10 - 4 = 6.";
                }

                //multiplication
                else if (resultText.includes("multiplication")) {
                    title = "Multiplication";
                    definition = "Multiplication represents repeated addition of a number.";
                    steps = "\n1️⃣Multiply one number by the other.";
                    example = "Example: 6 × 3 = 18.";
                }

                //division
                else if (resultText.includes("division")) {
                    title = "Division";
                    definition = "Division splits a number into equal parts or groups";
                    steps = "\n1️⃣Divide numerator by denominator.";
                    example = "Example: 12 ÷ 4 = 3.";
                }

                //even or odd
                else if (resultText.includes("even") || resultText.includes("odd")) {
                    title = "Even / Odd Check";
                    definition = "A number is even if divisible by 2; otherwise, it is odd.";
                    steps = "n1️⃣ Divide the number by 2.\n2️⃣ If remainder = 0 → Even, else Odd.";
                    example = "Example: 8 ÷ 2 = 4 → Even ✅.";
                }
                //square root
                else if (resultText.includes("square root") || resultText.includes("√") || resultText.includes("sqrt")) {
                    title = "Square Root (√x)";
                    definition = "The square root of a number gives a value that, when squared, equals the original number.";
                    steps = "\n1️⃣ Find a number which multiplied by itself gives x.";
                    example = "Example: √49 = 7 because 7×7=49.";
                }

                //square
                else if (resultText.includes("square")) {
                    title = "Square (x²)";
                    definition = "The square of a number is obtained by multiplying it by itself.";
                    steps = "\n1️⃣ Multiply the number by itself.";
                    example = "Example: 6² = 36.";
                }

                //power
                else if (
                    resultText.includes("power") ||
                    resultText.includes("^") ||
                    resultText.includes("raised") ||
                    resultText.includes("exponent") ||
                    /[0-9]+\s*\^\s*[0-9]+/.test(resultText)
                ) {
                    title = "Power (xʸ)";
                    definition = "The power of a number means multiplying the base by itself as many times as the exponent indicates.";
                    steps = "\n1️⃣ Take the base (x).\n2️⃣ Multiply it by itself y times.\n3️⃣ The result is x raised to the power y.";
                    example = "Example: 2³ = 2 × 2 × 2 = 8 (or 2^3 = 8).";
                }

                //average
                else if (resultText.includes("average")) {
                    title = "Average (Mean)";
                    definition = "The average is the sum of all values divided by their count.";
                    steps = "\n1️⃣ Add all the numbers.\n2️⃣ Divide the sum by how many numbers there are.";
                    example = "Example: (10 + 20 + 30) ÷ 3 = 20.";
                }
                
                    //formatted content with line breaks and HTML    
                explanationBox.innerHTML = `
                <h4 style="color:#b07b62; font-weight:600;">${title}</h4>
                <p id="typeText"></p>
                `;

                const fullText = `👉 Definition: ${definition}🧠 Steps: ${steps}📘${example}`;
                const typeTarget = document.getElementById("typeText");

                let index = 0;
                function typeWriter() {
                    if (index < fullText.length) {
                        typeTarget.innerHTML += fullText.charAt(index); 
                        index++;
                        setTimeout(typeWriter, 30); // typing speed
                    }
                }

                typeWriter();
            } 
            else {
                explanationBox.style.display = "none";
                explainBtn.textContent = "Show Explanation";
            }
        });
    }
});