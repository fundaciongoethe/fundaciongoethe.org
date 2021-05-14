module.exports = (id, label) => {
	return `
 <lite-youtube videoid="${id}" playlabel="${label}"></lite-youtube>
    `;
};

// ejemplo: {% youtube 'c4B-6XPbsY4', 'Crispina & Molinilla - Ven al Teatro - Canción infantil sobre el Teatro' %}
