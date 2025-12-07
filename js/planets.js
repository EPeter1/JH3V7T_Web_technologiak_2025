fetch('data/planets.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Nem sikerült betölteni a JSON-t!');
        }
        return response.json();
    })
    .then(data => {
        const navList = document.getElementById('planet-list');
        const container = document.getElementById('planet-content');

        data.forEach((planet, index) => {
            const navItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#planet-${index}`;
            link.textContent = planet.name;

            navItem.appendChild(link);
            navList.appendChild(navItem);

            const article = document.createElement('article');
            article.id = `planet-${index}`;

            const textDiv = document.createElement('div');
            textDiv.className = 'article-text';
            const h2 = document.createElement('h2');
            h2.textContent = planet.name;

            textDiv.appendChild(h2);
            textDiv.appendChild(document.createElement('hr'));

            planet.description.forEach(description => {
                const paragraph = document.createElement('p');
                paragraph.textContent = description;
                textDiv.appendChild(paragraph);
            });

            article.appendChild(textDiv);

            const asideDiv = document.createElement('div');
            asideDiv.className = 'article-aside';

            const table = createTable(planet);
            asideDiv.appendChild(table);

            const colorPicker = document.createElement('input');
            colorPicker.type = 'color';
            colorPicker.value = '#b2ebf2';
            colorPicker.className = 'color-picker';

            colorPicker.addEventListener('input', () => {
                const rows = table.querySelectorAll('tr');
                rows.forEach((row, index) => {
                    row.style.backgroundColor = index % 2 === 0 ? colorPicker.value : '#396b94';
                });
            });

            asideDiv.appendChild(colorPicker);
            article.appendChild(asideDiv);

            container.appendChild(article);
        });

        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 50;
            data.forEach((planet, index) => {
                const section = document.getElementById(`planet-${index}`);
                const navItem = navList.children[index];

                if (scrollPos >= section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
                    navItem.classList.add('active');
                }
                else {
                    navItem.classList.remove('active');
                }
            });
        });
    })
    .catch(error => {
        console.error('Hiba a JSON betöltésekor:', error);
        const container = document.getElementById('planet-content');
        container.textContent = 'Hiba a bolygók betöltésekor!';
    });

function createTable(planet) {
    const image = document.createElement('img');

    image.src = planet.image;
    image.alt = planet.name;
    image.loading = 'lazy';

    const imageCell = document.createElement('td');
    const imageRow = document.createElement('tr');
    const table = document.createElement('table');

    imageCell.colSpan = 2;
    imageCell.appendChild(image);
    imageRow.appendChild(imageCell);
    table.appendChild(imageRow);

    const dataMap = {
        type: 'Típus',
        mass: 'Tömeg',
        diameter: 'Átmérő',
        density: 'Sűrűség',
        distance: 'Távolság a Naptól',
        temperature: 'Hőmérséklet',
        rotation: 'Csillagászati idő',
        moons: 'Holdak száma'
    };

    const unitMap = {
        mass: 'kg',
        diameter: 'km',
        density: 'g/cm³',
        distance: 'km',
        temperature: 'K',
        rotation: 'nap',
        moons: 'db'
    };

    for (const [key, value] of Object.entries(planet.data)) {
        const tableDatakey = document.createElement('td');
        tableDatakey.textContent = dataMap[key] || key;
        let displayValue = value;

        if (key === 'mass' || key === 'distance') {
            const exp = value.toExponential();
            const [mantissa, exponent] = exp.split('e');
            displayValue = `${mantissa} × 10<sup>${Number(exponent)}</sup>`;
        }

        const tableRow = document.createElement('tr');
        const tableData = document.createElement('td');
        tableData.innerHTML = displayValue + (unitMap[key] ? ' ' + unitMap[key] : '');

        tableRow.appendChild(tableDatakey);
        tableRow.appendChild(tableData);
        table.appendChild(tableRow);
    }

    return table;
}
