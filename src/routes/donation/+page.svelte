<script>
</script>

<svelte:head>
	<title>Donations</title>
</svelte:head>

<header>
	<nav class="nav">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/salat">salat</a></li>
			<li><a href="/calendar">Calendar</a></li>
			<li><a href="/quran">quran</a></li>
			<li><a href="/tasbih">Tasbih</a></li>
			<li><a href="/contact">contact</a></li>
		</ul>
	</nav>
	<h1>Make a difference in someone's life today.</h1>
	<p>Join our community of changemakers. Small contributions lead to massive impact when we work together.
		Find a cause that speaks to you.</p>
	<p class="serr">خير الناس أنفعهم للناس</p>
</header>
<main>
	<div class="container">
		<div class="item">
			<div class="icon heart">
				<img src="/donation/heart.png" alt="Heart icon">
			</div>
			<div class="value">$2M+</div>
			<div class="label">Raised for Charity</div>
		</div>
		<div class="item">
			<div class="icon people">
				<img src="/donation/users.png" alt="People icon">
			</div>
			<div class="value">50k+</div>
			<div class="label">Unique Donors</div>
		</div>
		<div class="item">
			<div class="icon globe">
				<img src="/donation/earth.png" alt="Globe icon">
			</div>
			<div class="value">120+</div>
			<div class="label">Active Countries</div>
		</div>
	</div>
</main>
<section class="donation-cta">
	<h2>Support People in Need</h2>
	<p>
		Your donation helps provide food, healthcare, education, and emergency relief
		to millions of refugees supported by UNRWA.
	</p>

	<a 
		href="https://donate.unrwa.org/int/en/general" 
		target="_blank" 
		rel="noopener noreferrer"
		class="donate-btn"
	>
		Donate Now
	</a>

	<p class="donation-note">
		100% of donations are processed securely via UNRWA.
	</p>
</section>
<div class="donation-methods" style="text-align:center; margin:50px 0;">
	<h2 style="margin-bottom:25px;">Support the Project</h2>
	
	<div class="patreon">
		<!-- Patreon -->
		<a href="https://www.patreon.com/15440957/join" target="_blank">
			<img src="https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white" alt="Patreon">
		</a>
		<p style="margin-top:30px; color:#555; font-style:italic;">
			Thank you for your generosity – may Allah reward you many times over 🤲
		</p>
	</div>
</div>

<style>
	/* =====================
	   GLOBAL THEME
	===================== */
	:root {
		--bg-dark: hsl(260, 40%, 10%);
		--text-light: hsl(0, 0%, 98%);
		--primary: hsl(25, 90%, 65%);
		--accent: hsl(280, 60%, 40%);
		--muted: rgba(255,255,255,0.6);
		--card-bg: rgba(255,255,255,0.06);
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Montserrat', sans-serif;
		background:
			radial-gradient(circle at 20% 10%, rgba(130,90,255,0.08), transparent 20%),
			radial-gradient(circle at 80% 80%, rgba(255,140,80,0.04), transparent 20%),
			linear-gradient(180deg, var(--bg-dark), hsl(260 40% 6%));
		color: var(--text-light);
		min-height: 100vh;
		padding: 40px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* =====================
	   NAVIGATION (Centered)
	===================== */
	.nav {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 50px;
	}

	.nav ul {
		list-style: none;
		display: flex;
		gap: clamp(15px, 4vw, 36px);
		padding: 14px 32px;
		background: rgba(255,255,255,0.04);
		border-radius: 999px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255,255,255,0.1);
	}

	.nav a {
		text-decoration: none;
		font-size: 12px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--muted);
		transition: 0.3s;
	}

	.nav a:hover { 
		color: #f4a261; 
	}

	header {
		width: 100%;
		max-width: 1000px;
		text-align: center;
		margin-bottom: 40px;
	}

	header h1 {
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		margin-bottom: 20px;
	}

	header p {
		color: var(--muted);
		margin-bottom: 20px;
	}

	/* =====================
	   AYAH SECTION (serr)
	===================== */
	.serr {
		width: 100%;
		max-width: 800px;
		margin: 0 auto 50px auto;
		font-family: 'Amiri', serif;
		font-size: clamp(22px, 3vw, 32px);
		line-height: 1.8;
		text-align: center;
		padding: 20px 40px;
		position: relative;
	}

	.serr:before, .serr:after {
		color: var(--primary);
		font-size: 1.5em;
		vertical-align: middle;
	}

	/* =====================
	   STATISTICS (The Container)
	===================== */
	main {
		width: 100%;
		max-width: 1000px;
		display: flex;
		justify-content: center;
	}

	.container {
		display: flex;
		width: 100%;
		gap: 20px;
		background: rgba(255,255,255,0.02);
		border-radius: 20px;
		padding: 30px;
		border: 1px solid rgba(255,255,255,0.05);
	}

	.item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 25px;
		background: var(--card-bg);
		border-radius: 15px;
		transition: 0.3s ease;
	}

	.item:hover { 
		background: rgba(255,255,255,0.1); 
	}

	.item img {
		width: 50px;
		height: 50px;
		margin-bottom: 15px;
	}

	.value {
		font-size: 2rem;
		font-weight: bold;
		color: var(--primary);
		margin-bottom: 10px;
	}

	.label {
		font-size: 0.9rem;
		color: var(--muted);
		text-align: center;
	}

	/* =====================
	   DONATION CTA
	===================== */
	section {
		width: 100%;
		max-width: 1000px;
		margin-top: 40px;
	}

	.donation-cta {
		padding: 50px 30px;
		background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
		border-radius: 20px;
		text-align: center;
		border: 1px solid rgba(255,255,255,0.05);
	}

	.donation-cta h2 {
		margin-bottom: 20px;
		font-size: clamp(1.5rem, 3vw, 2rem);
	}

	.donation-cta p {
		margin-bottom: 20px;
		color: var(--muted);
	}

	.donate-btn {
		display: inline-block;
		padding: 16px 50px;
		background: var(--primary);
		color: #000;
		font-weight: 700;
		text-decoration: none;
		border-radius: 50px;
		text-transform: uppercase;
		margin-top: 20px;
		box-shadow: 0 10px 30px rgba(255,140,80,0.3);
		transition: 0.3s;
	}

	.donate-btn:hover {
		box-shadow: 0 15px 40px rgba(255,140,80,0.5);
		transform: scale(1.05);
	}

	.donation-note {
		margin-top: 15px;
		font-size: 14px;
		color: var(--muted);
	}

	.donation-methods {
		width: 100%;
		max-width: 1000px;
	}

	.patreon a {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 25px;
	}

	/* =====================
	   THE "FIX IT" MOBILE CODE
	===================== */
	@media (max-width: 768px) {
		:global(body) { 
			padding: 20px 15px; 
		}
		
		.nav ul { 
			gap: 10px; 
			padding: 10px 20px; 
		}

		.container {
			flex-direction: column;
			padding: 15px;
		}

		.item { 
			width: 100%; 
		}

		.serr { 
			padding: 15px; 
		}

		.donate-btn { 
			width: 100%; 
		}
	}
</style>
