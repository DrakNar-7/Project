<script>
	import { onMount } from 'svelte';

	let prayerTimes = [];
	let loading = true;

	onMount(async () => {
		const city = new URLSearchParams(window.location.search).get('city') || 'sousse';
		const country = new URLSearchParams(window.location.search).get('country') || 'Tunisia';
		const method = 2; // Islamic Society of North America

		const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

		try {
			const res = await fetch(url);
			const data = await res.json();
			const times = data.data.timings;

			const prayers = [
				"Fajr",
				"Dhuhr",
				"Asr",
				"Maghrib",
				"Isha"
			];

			prayerTimes = prayers.map(prayer => ({
				name: prayer,
				time: times[prayer]
			}));
			loading = false;
		} catch (error) {
			prayerTimes = [{ name: "Error", time: "Unable to load prayer times" }];
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>salat</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@400;600&display=swap">
</svelte:head>

<header>
	<h1>Salat Page</h1>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/quran">Quran</a></li>
			<li><a href="/calendar">Calendar</a></li>
			<li><a href="/donation">Donations</a></li>
			<li><a href="/tasbih">Tasbih</a></li>
			<li><a href="/contact">Contact Us</a></li>
		</ul>
	</nav>
</header>
<main class="prayer-wrapper">
	<h2 class="prayer-title">Prayer Times</h2>
	<ul class="prayer-times">
		{#if loading}
			<li>Loading...</li>
		{:else}
			{#each prayerTimes as prayer}
				<li>{prayer.name}: {prayer.time}</li>
			{/each}
		{/if}
	</ul>
</main>

<style>
	/* =====================
	   FONTS & IMPORTS
	===================== */
	@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@400;600&display=swap');

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
		color: var(--text-light);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-dark);
		background-image:
			radial-gradient(circle at center, rgba(255, 140, 80, 0.2), transparent 60%),
			linear-gradient(to bottom, rgba(26, 11, 46, 0.8), rgba(26, 11, 46, 1));
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
	}

	/* =====================
	   HEADER & NAV
	   (Exact match to Main Page)
	===================== */
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px 48px;
	}

	header h1 {
		font-family: 'Cinzel', serif;
		font-size: 1.5rem; 
		letter-spacing: 0.1em;
		color: var(--text-light);
		text-transform: uppercase;
		background: linear-gradient(to bottom, white, rgba(255,255,255,0.8));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	nav ul {
		list-style: none;
		display: flex;
		gap: 32px;
	}

	nav a {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.8);
		font-size: 12px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		position: relative;
		transition: color 0.3s ease;
		font-family: 'Montserrat', sans-serif;
	}

	nav a:hover {
		color: white;
	}

	/* Underline animation (copied from Main Page) */
	nav a::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: -6px;
		width: 0;
		height: 1px;
		background-color: var(--primary);
		transition: width 0.3s ease;
	}

	nav a:hover::after {
		width: 100%;
	}

	/* =====================
	   MAIN CONTENT (Prayer Times)
	===================== */
	.prayer-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px 20px;
	}

	.prayer-title {
		font-family: 'Cinzel', serif;
		font-size: clamp(2rem, 5vw, 3.5rem);
		letter-spacing: 0.2em;
		margin-bottom: 30px;
		text-align: center;
		background: linear-gradient(to bottom, white, rgba(255,255,255,0.6));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		text-shadow: 0 10px 40px rgba(0,0,0,0.6);
	}

	.prayer-times {
		list-style: none;
		width: 100%;
		max-width: 450px;
		background: rgba(26, 11, 46, 0.4); 
		backdrop-filter: blur(8px);
		padding: 40px;
		border-radius: 2px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 20px 50px rgba(0,0,0,0.5);
	}

	.prayer-times li {
		font-family: 'Montserrat', sans-serif;
		font-size: 1.1rem;
		padding: 18px 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		letter-spacing: 0.05em;
		color: rgba(255, 255, 255, 0.9);
	}

	.prayer-times li:last-child {
		border-bottom: none;
	}

	/* Highlight effect */
	.prayer-times li:hover {
		color: var(--primary);
		padding-left: 5px;
		transition: all 0.3s ease;
	}

	/* Mobile Responsive Improvements */
	@media (max-width: 768px) {
		header {
			flex-direction: column;
			gap: 20px;
			padding: 30px 20px;
		}
		
		nav ul {
			gap: 15px;
			flex-wrap: wrap;
			justify-content: center;
		}

		nav a {
			font-size: 15px;
			letter-spacing: 0.1em;
			padding: 8px 12px;
			display: inline-block;
		}

		.prayer-times {
			padding: 25px;
			width: 90%;
		}
	}
</style>
