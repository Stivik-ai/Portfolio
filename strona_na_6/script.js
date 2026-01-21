    const btn = document.getElementById('magic-btn');
    const responseBox = document.getElementById('grade-response');
    
    const responses = [
        "Status: Kompilacja pomyślna. Zasługujesz na 6!",
        "Błąd w linii 1: Zbyt mała ilość kawy na 6.",
        "Jeśli ten przycisk działa, to znaczy, że umiesz w kod.",
        "Konsola mówi: 'Tak, ale nie obiecuj sobie zbyt wiele'.",
        "Szóstka? W PHP czy w JS? Bo to różnica...",
        "Twój kod jest tak czysty, że aż razi. Będzie 6!",
        "Zapytaj ponownie po zrobieniu refaktoryzacji.",
        "System przeładowany Twoim talentem. 6."
    ];

    btn.addEventListener('click', () => {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        responseBox.innerHTML = "> " + randomResponse;
        responseBox.classList.add('active');

        // Ukryj wiadomość po 4 sekundach
        setTimeout(() => {
            responseBox.classList.remove('active');
        }, 4000);
    });
