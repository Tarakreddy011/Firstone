function showForm(formId) {
    document.querySelectorAll(".form-box").forEach(form => {
        form.classList.remove("active");
    });
    const targetForm = document.getElementById(formId);
    if (targetForm) {
        targetForm.classList.add("active");
    } else {
        console.warn(`Error: Form with ID "${formId}" not found in the DOM.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        showForm('login-form');
    } else {        // If the login form is not found, show the first form box by default
        const firstFormBox = document.querySelector('.form-box');
        if (firstFormBox) {
            showForm(firstFormBox.id);
        }
    }
});