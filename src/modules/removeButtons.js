    //tar bort alternativ knapparna
    export function removeButtons() {
        const btns = document.querySelectorAll(".buttonChoice");
        btns.forEach(button => button.remove());
    }