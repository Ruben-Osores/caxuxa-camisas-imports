
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const select = document.getElementById("teamFilter");
    const catalogo = document.getElementById("catalogo");

    const times = [...new Set(data.map(item => item.time))];
    times.forEach(time => {
      const opt = document.createElement("option");
      opt.value = time;
      opt.textContent = time;
      select.appendChild(opt);
    });

    function render(filter = "") {
      catalogo.innerHTML = "";
      const filtrados = filter ? data.filter(a => a.time === filter) : data;
      filtrados.forEach(album => {
        const div = document.createElement("div");
        div.className = "album";
        div.innerHTML = `
          <img src="${album.imagens[0]}" alt="${album.time}" />
          <a href="${album.album}" target="_blank">${album.time}</a>
        `;
        catalogo.appendChild(div);
      });
    }

    select.addEventListener("change", () => render(select.value));
    render();
  });
