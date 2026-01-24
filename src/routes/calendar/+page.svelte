<script>
	import { onMount } from 'svelte';

	let currentOffset = 0;
	let events = {};
	let activeDateKey = "";
	let monthDisplay = "";
	let showModal = false;
	let selectedDate = "";
	let eventInput = "";
	let eventList = [];
	let gregDateInput = "";
	let hijriResult = "Select a date";

	onMount(() => {
		events = JSON.parse(localStorage.getItem('hijriEvents')) || {};
		renderCalendar();
	});

	function renderCalendar() {
		const now = new Date();
		const todayParts = new Intl.DateTimeFormat('en-u-ca-islamic-nu-latn', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric'
		}).formatToParts(now);

		const todayDay = todayParts.find(p => p.type === 'day')?.value;
		const todayMonth = todayParts.find(p => p.type === 'month')?.value;
		const todayYear = todayParts.find(p => p.type === 'year')?.value;
		const todayKey = `${todayDay}-${todayMonth}-${todayYear}`;

		const target = new Date(now);
		target.setDate(now.getDate() + currentOffset * 30);

		const monthFmt = new Intl.DateTimeFormat('en-u-ca-islamic', {month:'long', year:'numeric'});
		monthDisplay = monthFmt.format(target);

		let start = new Date(target);
		start.setDate(1);

		calendarDays = [];
		for (let i = 0; i < 42; i++) {
			const date = new Date(start);
			date.setDate(start.getDate() + i);

			const parts = new Intl.DateTimeFormat('en-u-ca-islamic-nu-latn', {
				day: 'numeric',
				month: 'numeric',
				year: 'numeric'
			}).formatToParts(date);

			const hijriDay = parts.find(p => p.type === 'day')?.value || '?';
			const hijriMonth = parts.find(p => p.type === 'month')?.value;
			const hijriYear = parts.find(p => p.type === 'year')?.value;

			const key = `${hijriDay}-${hijriMonth}-${hijriYear}`;

			calendarDays.push({
				day: hijriDay,
				key: key,
				isToday: key === todayKey,
				hasEvents: events[key]?.length > 0
			});
		}
	}

	let calendarDays = [];

	function openModal(dateKey) {
		activeDateKey = dateKey;
		selectedDate = dateKey;
		renderEventList();
		showModal = true;
	}

	function renderEventList() {
		eventList = events[activeDateKey] || [];
	}

	function addEvent() {
		const task = eventInput.trim();
		if (task) {
			if (!events[activeDateKey]) {
				events[activeDateKey] = [];
			}
			events[activeDateKey].push(task);
			localStorage.setItem('hijriEvents', JSON.stringify(events));
			eventInput = "";
			renderEventList();
			renderCalendar();
		}
	}

	function deleteEvent(index) {
		if (!events[activeDateKey]) return;
		events[activeDateKey].splice(index, 1);
		if (events[activeDateKey].length === 0) {
			delete events[activeDateKey];
		}
		localStorage.setItem('hijriEvents', JSON.stringify(events));
		renderEventList();
		renderCalendar();
	}

	function closeModal() {
		showModal = false;
	}

	function convertToHijri() {
		if (!gregDateInput) {
			hijriResult = "Select a date";
			return;
		}
		try {
			const gregDate = new Date(gregDateInput);
			const parts = new Intl.DateTimeFormat('en-u-ca-islamic-nu-latn', {
				day: 'numeric',
				month: 'numeric',
				year: 'numeric'
			}).formatToParts(gregDate);
			const day = parts.find(p => p.type === 'day')?.value || '?';
			const month = parts.find(p => p.type === 'month')?.value || '?';
			const year = parts.find(p => p.type === 'year')?.value || '?';
			hijriResult = `${day} ${getHijriMonthName(month)} ${year} AH`;
		} catch (e) {
			hijriResult = "Error - invalid date";
		}
	}

	function getHijriMonthName(monthNum) {
		const names = [
			"Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
			"Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban",
			"Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
		];
		return names[parseInt(monthNum) - 1] || "???";
	}

	function prevMonth() {
		currentOffset--;
		renderCalendar();
	}

	function nextMonth() {
		currentOffset++;
		renderCalendar();
	}
</script>

<svelte:head>
	<title>Hijri Calendar & Events</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<nav>
	<ul class="nav-links">
		<li><a href="/">Home</a></li>
		<li><a href="/salat">Salat</a></li>
		<li><a href="/quran">Quran</a></li>
		<li><a href="/donation">Donations</a></li>
		<li><a href="/tasbih">Tasbih</a></li>
		<li><a href="/contact">Contact Us</a></li>
	</ul>
</nav>

<main>
	<!-- Calendar -->
	<div class="calendar-container">
		<div class="calendar-header">
			<button on:click={prevMonth}>‹</button>
			<h2>{monthDisplay}</h2>
			<button on:click={nextMonth}>›</button>
		</div>
		<div class="calendar-grid">
			{#each calendarDays as day}
				<div class="day" class:today={day.isToday} on:click={() => openModal(day.key)}>
					<span>{day.day}</span>
					{#if day.hasEvents}
						<div class="event-dot"></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<!-- Modal -->
	{#if showModal}
		<div class="modal" on:click={closeModal}>
			<div class="modal-content" on:click|stopPropagation>
				<h3>Events for <span>{selectedDate}</span></h3>
				<ul id="eventList">
					{#each eventList as event, index}
						<li>
							<span>• {event}</span>
							<button on:click={() => deleteEvent(index)}>×</button>
						</li>
					{/each}
				</ul>
				<hr>
				<input type="text" bind:value={eventInput} placeholder="Add new task..." on:keydown={(e) => e.key === 'Enter' && addEvent()}>
				<div class="modal-buttons">
					<button class="primary" on:click={addEvent}>Add Task</button>
					<button class="secondary" on:click={closeModal}>Close</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Converter -->
	<div class="converter-container">
		<h3>Gregorian → Hijri Converter</h3>
		<div class="converter-box">
			<div>
				<label>Gregorian Date:</label><br>
				<input type="date" bind:value={gregDateInput} on:change={convertToHijri}>
			</div>
			<div class="result-box">
				<p>Hijri Date:</p>
				<strong>{hijriResult}</strong>
			</div>
		</div>
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

	.nav-links a:hover, .nav-links a.active {
		color: #f4a261;
	}

	/* =====================
	   CALENDAR STYLES
	===================== */

	.calendar-container {
		max-width: 900px;
		margin: 40px auto;
		padding: 30px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 24px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(12px);
	}

	.calendar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	.calendar-header h2 {
		font-family: 'Tajawal', sans-serif;
		color: #f4a261;
		font-size: 1.8rem;
		letter-spacing: 1px;
	}

	.calendar-header button {
		background: rgba(244, 162, 97, 0.1);
		border: 1px solid #f4a261;
		color: #f4a261;
		width: 45px;
		height: 45px;
		border-radius: 50%;
		cursor: pointer;
		font-size: 1.5rem;
		transition: all 0.3s ease;
	}

	.calendar-header button:hover {
		background: #f4a261;
		color: #1c1433;
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 15px;
		padding: 10px;
	}

	.day {
		aspect-ratio: 1 / 1;
		width: 100%;
		max-width: 60px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
	}

	.day:hover {
		background: rgba(244, 162, 97, 0.2);
		border-color: #f4a261;
		transform: translateY(-3px);
		box-shadow: 0 4px 12px rgba(244, 162, 97, 0.2);
	}

	.day.today {
		background: #f4a261 !important;
		color: #1c1433 !important;
		font-weight: bold;
		border: none;
		box-shadow: 0 0 15px rgba(244, 162, 97, 0.5);
	}

	.day.today span {
		color: #1c1433;
	}

	.event-dot {
		width: 5px;
		height: 5px;
		background-color: #f4a261;
		border-radius: 50%;
		position: absolute;
		bottom: 8px;
	}

	.day.today .event-dot {
		background-color: #1c1433;
	}

	/* =====================
	   MODAL STYLES
	===================== */

	.modal {
		display: block;
		position: fixed;
		z-index: 1000;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(5px);
	}

	.modal-content {
		background: #1c1433;
		margin: 10% auto;
		padding: 30px;
		border: 1px solid #f4a261;
		width: 90%;
		max-width: 450px;
		border-radius: 20px;
		box-shadow: 0 20px 60px rgba(0,0,0,0.5);
	}

	.modal-content h3 {
		margin-bottom: 20px;
		color: #f4a261;
	}

	.modal-content input {
		width: 100%;
		padding: 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: white;
		border-radius: 8px;
		margin: 15px 0;
	}

	.modal-content ul {
		list-style: none;
		margin-bottom: 15px;
	}

	.modal-content ul li {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
	}

	.modal-content ul li button {
		color: red;
		border: none;
		background: none;
		font-size: 18px;
		cursor: pointer;
	}

	.modal-buttons {
		display: flex;
		gap: 10px;
		justify-content: flex-end;
	}

	button.primary {
		background: #f4a261;
		color: #1c1433;
		border: none;
		padding: 10px 20px;
		border-radius: 8px;
		font-weight: bold;
		cursor: pointer;
	}

	button.primary:hover {
		background: #e07a3f;
	}

	button.secondary {
		background: transparent;
		color: #f4a261;
		border: 1px solid #f4a261;
		padding: 10px 20px;
		border-radius: 8px;
		font-weight: bold;
		cursor: pointer;
	}

	button.secondary:hover {
		background: #f4a261;
		color: #1c1433;
	}

	/* =====================
	   CONVERTER STYLES
	===================== */

	.converter-container {
		max-width: 600px;
		margin: 40px auto;
		padding: 30px;
		background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
		border-radius: 20px;
		text-align: center;
	}

	.converter-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		gap: 20px;
		margin-top: 20px;
	}

	.converter-box input {
		padding: 10px;
		border-radius: 8px;
		border: 1px solid #f4a261;
		background: #0b0815;
		color: white;
		font-family: 'Roboto', sans-serif;
	}

	.result-box {
		padding: 15px 25px;
		background: rgba(244, 162, 97, 0.1);
		border-left: 4px solid #f4a261;
		border-radius: 4px;
	}

	.result-box strong {
		display: block;
		font-size: 1.2rem;
		color: #f4a261;
		margin-top: 5px;
	}

	/* =====================
	   MOBILE RESPONSIVENESS
	===================== */

	@media screen and (max-width: 768px) {
		.nav-links {
			gap: 15px;
			padding: 10px 20px;
		}

		.nav-links a {
			font-size: 10px;
			letter-spacing: 0.1em;
		}

		.calendar-container {
			margin: 20px 10px;
			padding: 15px;
			border-radius: 16px;
		}

		.calendar-header h2 {
			font-size: 1.3rem;
		}

		.calendar-header button {
			width: 35px;
			height: 35px;
			font-size: 1.2rem;
		}

		.calendar-grid {
			gap: 6px;
		}

		.modal-content {
			width: 95%;
			margin: 20% auto;
			padding: 20px;
		}

		.converter-box {
			flex-direction: column;
			gap: 15px;
		}

		.converter-box input {
			width: 100%;
		}

		.day {
			max-width: 45px;
			font-size: 0.85rem;
		}

		.event-dot {
			bottom: 4px;
			width: 4px;
			height: 4px;
		}
	}

	@media screen and (max-width: 400px) {
		.calendar-header h2 {
			font-size: 1.1rem;
		}
		
		.nav-links {
			gap: 10px;
		}

		.day {
			max-width: 38px;
			font-size: 0.75rem;
		}

		.calendar-header h2 {
			font-size: 1rem;
		}
	}
</style>
