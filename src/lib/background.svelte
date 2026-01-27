:root {
    --bg-dark: hsl(260, 40%, 10%);
    --text-light: hsl(0, 0%, 98%);
    --primary: hsl(25, 90%, 65%);
    --accent: hsl(280, 60%, 40%);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:global(body) {
    font-family: 'Montserrat', sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-light);
    min-height: 100vh;
}
