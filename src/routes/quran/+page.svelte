<script lang="ts">
	import { onMount } from 'svelte';

	type Surah = {
		number: number;
		englishName: string;
	};

	type Ayah = {
		text: string;
		number: number;
	};

	let surahs: Surah[] = [];
	let selectedSurah: number = 1;
	let ayahs: Ayah[] = [];
	let loading: boolean = true;

	onMount(async () => {
		try {
			const res = await fetch("https://api.alquran.cloud/v1/surah");
			const data = await res.json();
			surahs = data.data;
			await loadSurah(1);
		} catch (error) {
			console.error("Error loading surahs:", error);
		}
	});

	async function loadSurah(number: number): Promise<void> {
		loading = true;
		try {
			const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}`);
			const data = await res.json();
			ayahs = data.data.ayahs.map((ayah: any) => ({
				text: ayah.text,
				number: ayah.numberInSurah
			}));
			loading = false;
		} catch (error) {
			console.error("Error loading surah:", error);
			loading = false;
		}
	}

	function handleSurahChange(event: Event): void {
		const target = event.target as HTMLSelectElement;
		selectedSurah = parseInt(target.value);
		loadSurah(selectedSurah);
	}
</script>

<svelte:head>
	<title>The Holy Quran</title>
	<link href="https://fonts.googleapis.com/css2?family=Amiri&display=swap" rel="stylesheet">
</svelte:head>

<nav>
	<ul class="nav-links">
		<li><a href="/">Home</a></li>
		<li><a href="/salat">Salat</a></li>
		<li><a href="/calendar">Calendar</a></li>
		<li><a href="/donation">Donations</a></li>
		<li><a href="/tasbih">Tasbih</a></li>
		<li><a href="/contact">Contact Us</a></li>
	</ul>
</nav>

<main class="quran-page">
	<h1>The Holy Quran</h1>

	<select id="surah-select" value={selectedSurah} on:change={handleSurahChange}>
		{#each surahs as surah}
			<option value={surah.number}>{surah.number}. {surah.englishName}</option>
		{/each}
	</select>

	<div id="ayahs" class="ayahs">
		{#if loading}
			<p>Loading...</p>
		{:else}
			<div class="ayah-container">
				{#each ayahs as ayah}
					<span>{ayah.text} <span class="ayah-number">﴿{ayah.number}﴾</span> </span>
				{/each}
			</div>
		{/if}
	</div>
</main>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		background: radial-gradient(circle at top, #1c1433, #0b0815);
		color: white;
		font-family: 'Amiri', serif;
		min-height: 100vh;
		line-height: 1.6;
	}

	/* =====================
	   NAV
	===================== */

	nav {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 20px 0;
		background: transparent;
	}


	.nav-links {
		list-style: none;
		display: flex;
		gap: 30px;
		padding: 12px 32px;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 999px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
	}

	.nav-links a {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.6);
		font-size: 12px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		transition: 0.3s;
	}

	.nav-links a:hover {
		color: #f4a261;
	}

	/* =====================
	  MAIN LAYOUT
	===================== */

	main {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 40px 0;
	}

	.quran-page {
		width: 95%;
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	/* =====================
	  TITLE
	===================== */

	.quran-page h1 {
		width: 100%;
		font-family: 'Cinzel', serif;
		font-size: clamp(2.5rem, 8vw, 5rem);
		margin-bottom: 40px;
		letter-spacing: 0.1em;
	}

	/* =====================
	  SELECT BOX
	===================== */

	#surah-select {
		width: 100%;
		max-width: 600px;
		height: 60px;
		padding: 0 25px;
		font-size: 1.2rem;
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.05);
		color: white;
		margin-bottom: 60px;
		cursor: pointer;
		outline: none;
		backdrop-filter: blur(5px);
		transition: all 0.3s ease;
		appearance: none;
		background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='orange' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
		background-repeat: no-repeat;
		background-position: right 1rem center;
		background-size: 1em;
	}

	#surah-select:focus {
		border-color: #f4a261;
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 20px rgba(244, 162, 97, 0.2);
	}

	#surah-select option {
		background-color: #1c162d;
		color: white;
		padding: 10px;
	}

	/* =====================
	  AYAH TEXT (PAGE VIEW)
	===================== */

	.ayahs {
		width: 100%;
		max-width: 900px;
		background: rgba(255, 255, 255, 0.03);
		padding: 50px;
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		text-align: justify;
		direction: rtl;
		font-size: clamp(1.8rem, 5vw, 2.8rem);
		line-height: 2.5;
	}

	.ayah-container {
		display: inline;
	}

	.ayah-number {
		color: #f4a261;
		font-family: 'Amiri', serif;
		font-size: 1.2rem;
		margin: 0 8px;
		border: 1px solid rgba(244, 162, 97, 0.5);
		padding: 2px 10px;
		border-radius: 50%;
		vertical-align: middle;
		display: inline-block;
		user-select: none;
	}

	/* =====================
	   MOBILE NAVIGATION
	===================== */

	@media (max-width: 768px) {
		nav {
			padding: 10px 0;
		}

		.nav-links {
			width: 90%;
			gap: 15px;
			padding: 15px 20px;
			flex-wrap: wrap;
			justify-content: center;
			border-radius: 20px;
		}

		.nav-links a {
			font-size: 14px;
			letter-spacing: 0.1em;
			padding: 5px 10px;
		}
	}

	@media (max-width: 480px) {
		.nav-links {
			gap: 10px;
		}
		
		.nav-links a {
			font-size: 12px;
			font-weight: bold;
		}
	}
</style>
