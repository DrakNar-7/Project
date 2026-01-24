<script>
	import { onMount } from 'svelte';
</script>

<svelte:head>
	<title>AJRR</title>
</svelte:head>

<section class="hero">
	<header class="header">
		<div class="logo">
			<img src="/National-flag-of-palestine-with-ribbon-on-transparent-background-PNG-removebg-preview.png" alt="AJRR Logo">
		</div>
		<nav class="nav">
			<ul>
				<li><a href="/salat">salat</a></li>
				<li><a href="/calendar">Calendar</a></li>
				<li><a href="/quran">quran</a></li>
				<li><a href="/donation">donations</a></li>
				<li><a href="/tasbih">Tasbih</a></li>
				<li><a href="/contact">contact us</a></li>
			</ul>
		</nav>
	</header>

	<div class="hero-title">
		<img src="/kaaba.jpg" alt="Mecca" class="hero-bg-image">
		<h1>AJRR</h1>
	</div>
	<footer class="footer">
		<p>&copy; 2026 AJRR.</p>
	</footer>
</section>

<style>
	/* =====================
	   GLOBAL THEME
	===================== */

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

	/* =====================
	   HERO SECTION
	===================== */

	.hero {
		min-height: 100vh;
		position: relative;
		background:
			radial-gradient(circle at center, rgba(255, 140, 80, 0.2), transparent 60%),
			linear-gradient(to bottom, rgba(26, 11, 46, 0.8), rgba(26, 11, 46, 1));
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	/* =====================
	   HEADER / NAV
	===================== */

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px 48px;
	}

	.logo img {
		height: 50px;
	}

	/* Navigation */
	.nav ul {
		list-style: none;
		display: flex;
		gap: 32px;
	}

	.nav a {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.8);
		font-size: 12px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		position: relative;
		transition: color 0.3s ease;
	}

	.nav a:hover {
		color: white;
	}

	/* underline animation */
	.nav a::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: -6px;
		width: 0;
		height: 1px;
		background-color: var(--primary);
		transition: width 0.3s ease;
	}

	.nav a:hover::after {
		width: 100%;
	}

	/* =====================
	   HERO TITLE
	===================== */

	.hero-title {
		text-align: center;
		position: relative;
		width: 100%;
		min-height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-title h1 {
		font-family: 'Cinzel', serif;
		font-size: clamp(4rem, 12vw, 10rem);
		letter-spacing: 0.2em;
		background: linear-gradient(to bottom, white, rgba(255,255,255,0.6));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		text-shadow: 0 10px 40px rgba(0,0,0,0.6);
		position: relative;
		z-index: 2;
		margin: 0;
	}

	.hero-bg-image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		max-width: 900px;
		z-index: -1;
		opacity: 0.9;
		pointer-events: none;
		mask-image: radial-gradient(circle, black 40%, transparent 80%);
		-webkit-mask-image: radial-gradient(circle, black 40%, transparent 80%);
	}

	/* =====================
	   MOBILE MEDIA QUERY
	===================== */
	@media (max-width: 768px) {
		.header {
			flex-direction: column;
			gap: 20px;
			padding: 20px;
		}

		.nav ul {
			gap: 30px;
			flex-wrap: wrap;
			justify-content: center;
		}

		.nav a {
			font-size: 30px;
			letter-spacing: 0.05em;
		}

		.hero-title h1 {
			letter-spacing: 0.1em;
		}

		:global(.footer) {
			margin-bottom: 20px;
		}

		.hero-bg-image {
			max-width: 120%;
			opacity: 0.5;
			mask-image: radial-gradient(circle, black 30%, transparent 70%);
		}

		.hero-title h1 {
			font-size: clamp(3rem, 15vw, 6rem);
			letter-spacing: 0.08em;
		}

		.nav a {
			padding: 10px 6px;
			display: inline-block;
		}

		.header {
			background: rgba(0,0,0,0.3);
			backdrop-filter: blur(10px);
			border-radius: 20px;
		}
	}

	@media (max-height: 700px) {
		:global(.footer) {
			margin-top: 30px;
		}
	}

	@media (max-width: 480px) {
		.nav ul {
			gap: 8px;
		}
		
		.nav a {
			font-size: 9px;
		}
	}
</style>
