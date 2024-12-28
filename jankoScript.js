

const store = {};

function play(code) {
	const { key, audio, promise } = store[code];
	if (!audio || !key) return; //stop the function from running all together
	audio.currentTime = 0;
	audio.play();
	if (promise) clearTimeout(promise);
	store[code].promise = setTimeout(() => key.classList.remove('playing'), 100);
	key.classList.add('playing');
}

document.addEventListener('keydown', (e) => play(e.code));


const shortCodes = {
	'Minus': '-', 'Equal': '=', 'BracketLeft': '[', 'BracketRight': ']', 'Semicolon': ';', 'Quote': '\'', 'Backslash': '\\', 'Comma': ',', 'Period': '.', 'Slash': '/', 'IntlBackslash': '\\', 'ContextMenu': '☰', 'PrintScreen': 'PrtSc', 'ScrollLock': 'ScrLk', 'Pause': 'Pause', 'Backquote': '`'
};


[...document.querySelectorAll(".key")].forEach(key => {
	const code = key.getAttribute('data-code');
	if (!code) return;

	let short = `${code}`;
	if (short.slice(0, 3) == 'Key') short = `(${short.slice(3)})`;
	else if (short.slice(0, 5) == 'Digit') short = `(${short.slice(5)})`;
	else short = `(${shortCodes[short] || short})`;

	const p = document.createElement('p');
	p.innerHTML = `${key.id[0]}<sup>${key.id.slice(1).replace('S', '#')}<sup></br>${short}</sup></sup>`;
	key.appendChild(p);

	const audio = document.createElement('audio');
	audio.src = `notes/${key.id}.wav`;
	key.appendChild(audio);

	store[code] = { key, audio };
	key.addEventListener('click', (e) => {
		e.stopPropagation();
		play(code);
	});
})
