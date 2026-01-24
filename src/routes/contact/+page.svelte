<script>
	let submitting = false;

	async function handleSubmit(event) {
		submitting = true;
		const form = event.target;
		const button = form.querySelector('.submit-btn');
		if (button) {
			button.innerText = 'Sending...';
			button.style.opacity = '0.7';
			button.disabled = true;
		}
	}
</script>

<svelte:head>
	<title>Contact Us | AJRR</title>
	<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">
</svelte:head>

<nav class="nav">
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/salat">Salat</a></li>
		<li><a href="/calendar">Calendar</a></li>
		<li><a href="/quran">Quran</a></li>
		<li><a href="/donation">Donations</a></li>
		<li><a href="/tasbih">Tasbih</a></li>
	</ul>
</nav>

<main class="contact-container">
	<header class="contact-header">
		<h1>Get In Touch</h1>
		<p>Have questions or want to support our mission? Reach out to us.</p>
	</header>

	<section class="contact-content">
		<form action="https://formspree.io/f/xzddpjog" method="POST" class="contact-form" on:submit={handleSubmit}>
			<div class="input-group">
				<input type="text" name="name" placeholder="Your Name" required>
			</div>
			<div class="input-group">
				<input type="email" name="_replyto" placeholder="Your Email" required>
			</div>
			<div class="input-group">
				<textarea name="message" placeholder="Your Message" rows="5" required></textarea>
			</div>
			
			<input type="hidden" name="_subject" value="New Contact Form Submission!">

			<button type="submit" class="submit-btn" disabled={submitting}>Send Message</button>
		</form>
	</section>
</main>

<style>
	:root {
		--bg-dark: hsl(260, 40%, 10%);
		--text-light: hsl(0, 0%, 98%);
		--primary: hsl(25, 90%, 65%);
		--muted: rgba(255,255,255,0.6);
		--card-bg: rgba(255,255,255,0.04);
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
			linear-gradient(180deg, var(--bg-dark), hsl(260 40% 6%));
		color: var(--text-light);
		min-height: 100vh;
		padding: 40px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* NAVIGATION (Same as your other pages) */
	.nav {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 50px;
	}

	.nav ul {
		list-style: none;
		display: flex;
		gap: 25px;
		padding: 12px 28px;
		background: rgba(255,255,255,0.04);
		border-radius: 999px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255,255,255,0.1);
	}

	.nav a {
		text-decoration: none;
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--muted);
		transition: 0.3s;
	}

	.nav a.active, .nav a:hover { 
		color: var(--primary); 
	}

	/* CONTACT LAYOUT */
	.contact-container {
		width: 100%;
		max-width: 1000px;
		text-align: center;
	}

	.contact-header h1 {
		font-family: 'Cinzel', serif;
		font-size: clamp(2rem, 5vw, 3.5rem);
		margin-bottom: 10px;
		letter-spacing: 0.1em;
	}

	.contact-header p {
		color: var(--muted);
		margin-bottom: 40px;
	}

	.contact-content {
		display: flex;
		gap: 30px;
		text-align: left;
	}

	/* CARDS & FORM */
	.contact-form {
		flex: 2;
		background: rgba(255,255,255,0.02);
		padding: 40px;
		border-radius: 20px;
		border: 1px solid rgba(255,255,255,0.05);
		width: 100%;
	}

	.input-group {
		margin-bottom: 20px;
	}

	input, textarea {
		width: 100%;
		padding: 15px;
		background: rgba(255,255,255,0.05);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 8px;
		color: white;
		font-family: 'Montserrat', sans-serif;
		outline: none;
	}

	input:focus, textarea:focus {
		border-color: var(--primary);
	}

	.submit-btn {
		width: 100%;
		padding: 16px;
		background: var(--primary);
		color: black;
		font-weight: 700;
		text-transform: uppercase;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: 0.3s;
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-3px);
		box-shadow: 0 10px 20px rgba(255,140,80,0.3);
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	/* =====================
	   MOBILE STYLES
	===================== */
	@media (max-width: 768px) {
		.contact-content {
			flex-direction: column;
		}
		
		.nav ul {
			gap: 12px;
			padding: 10px 15px;
		}

		.contact-form {
			padding: 25px;
		}
	}
</style>
