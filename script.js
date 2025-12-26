// SIMPAN PESAN
const form = document.getElementById("messageForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = {
            receiver: document.getElementById("receiver").value,
            message: document.getElementById("message").value,
            song: document.getElementById("song").value,
            date: new Date().toLocaleString()
        };

        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.unshift(data);
        localStorage.setItem("messages", JSON.stringify(messages));

        alert("Pesan berhasil dikirim!");
        form.reset();
    });
}

// TAMPILKAN PESAN
const list = document.getElementById("messageList");
const search = document.getElementById("searchInput");

function renderMessages(filter = "") {
    if (!list) return;

    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    list.innerHTML = "";

    messages
        .filter(m => m.receiver.toLowerCase().includes(filter.toLowerCase()))
        .forEach(m => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h4>${m.receiver}</h4>
                <p>${m.message}</p>
                <small>🎵 ${m.song}</small><br>
                <small>${m.date}</small>
            `;
            list.appendChild(card);
        });
}

if (search) {
    search.addEventListener("input", e => renderMessages(e.target.value));
    renderMessages();
}
