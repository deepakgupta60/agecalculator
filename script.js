const dd = document.getElementById("dayIn");
const mm = document.getElementById("monthIn");
const yy = document.getElementById("yearIn");

const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");

const yearOut = document.getElementById("yearOut");
const monthOut = document.getElementById("monthOut");
const dayOut = document.getElementById("dayOut");

const btn = document.getElementById("calculateBtn");

const validateInput = (input, min, max, errorElement, errorMessage) => {
    const value = parseInt(input.value);
    if (!input.value.trim()) {
        errorElement.textContent = "This field is required";
        return false;
    }
    if (value < min || value > max) {
        errorElement.textContent = errorMessage;
        return false;
    }
    errorElement.textContent = "";
    return true;
};

dd.addEventListener("blur", () => {
    validateInput(dd, 1, 31, dayError, "Must be a valid day");
});

mm.addEventListener("blur", () => {
    validateInput(mm, 1, 12, monthError, "Must be a valid month");
});

yy.addEventListener("blur", () => {
    const currYear = new Date().getFullYear();
    const value = parseInt(yy.value);
    if (!yy.value.trim()) {
        yearError.textContent = "This field is required";
    } else if (value > currYear) {
        yearError.textContent = "Must be in past";
    } else {
        yearError.textContent = ""; 
    }
});

btn.addEventListener("click", () => {
    yearOut.textContent = "--";
    monthOut.textContent = "--";
    dayOut.textContent = "--";

    const dayValid = validateInput(dd, 1, 31, dayError, "Must be a valid day");
    const monthValid = validateInput(mm, 1, 12, monthError, "Must be a valid month");
    const yearValid = (() => {
        const currYear = new Date().getFullYear();
        const value = parseInt(yy.value);
        if (!yy.value.trim()) {
            yearError.textContent = "This field is required";
            return false;
        } else if (value > currYear) {
            yearError.textContent = "Must be in past";
            return false;
        }
        yearError.textContent = ""; 
        return true;
    })();

    if (!dayValid || !monthValid || !yearValid) return;

    const day = parseInt(dd.value);
    const month = parseInt(mm.value);
    const year = parseInt(yy.value);
    const currDate = new Date();

    const inputDate = new Date(year, month - 1, day);
    if (
        isNaN(inputDate.getTime()) ||
        inputDate.getDate() !== day ||
        inputDate.getMonth() + 1 !== month
    ) {
        dayError.textContent = "Invalid date";
        return;
    }

    let ageYears = currDate.getFullYear() - year;
    let ageMonths = currDate.getMonth() - (month - 1);
    let ageDays = currDate.getDate() - day;

    if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += new Date(currDate.getFullYear(), currDate.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
    }

    yearOut.textContent = ageYears;
    monthOut.textContent = ageMonths;
    dayOut.textContent = ageDays;
});
