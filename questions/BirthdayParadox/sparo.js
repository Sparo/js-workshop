// globalni objekat za rezultate
const rezultat = [];

// Generisi random rodjendane za prosledjeni broj uzoraka
const generisiLjude = function (br) {
    return Array.from({ length: br }).map(index => Math.floor(Math.random() * 365));
}

// proveri da li se u uzoorkovanom setu rodjendana nalazi poklapanje
const proveriRodjendane = function (uzorak, broj_testova) {
    let final = [];
    // interiraj kroz broj testova
    for (let i = 0; i < broj_testova; i++) {
        // generis novi set rodjendana
        let ljudi = generisiLjude(uzorak);
        // iskoristi JavaScript SET - set je strktura podataka koja sadrzi samo
        // jedinstvene vrednosti,a inicijalizuje se sa tipom podakta kao sto je Array
        let map = new Set(ljudi);

        // ljudi su array koji moze imati ponovljene vrednosti,
        // Set (map.size) je velicina set-a koji moze imati samo jedinstvene vrednosti
        // pa tako proverimo da li se velicine poklapaju
        // ako se NE poklapaju znaci da je postojao najmanje dva puta isti rodjendan
        let match = ljudi.length !== map.size;

        // popuni podatke i zakljucak uzorkovanja
        final.push({ uzorak, match })
    }

    return final;
}

// pokreni simulaciju
const simuliraj = function (broj_testova = 10000, broj_uzoraka) {
    // definisi pocetni uzorak
    let uzorak = 1;

    while (uzorak < broj_uzoraka + 1) {
        // proveri rodjendane
        const uzorkovano = proveriRodjendane(uzorak, broj_testova);
        // popuni rezultate
        rezultat.push({
            uzorak, uzorkovano
        })
        // predji na sledecu velicinu uzorka
        uzorak++;
    }
}

// naprvi izvestaj
const izvestaj = function () {
    const izvestaj = rezultat.map(res => {
        // pokupi kolicinu pogodaka
        const pogodaka = res.uzorkovano.filter(item => item.match).length;
        // izracunaj procenat pogodaka po uzorkovanom setu
        const percent = (pogodaka / res.uzorkovano.length * 100).toFixed(2);
        // formatiraj procenat i dodaj oznaku gde je verovatnoca veca od 50%
        const percentFormated = percent > 50 && percent < 55 ? `>> ${percent} % <<` : `${percent} %`;

        return {
            test: 5,
            uzorak_ljudi: res.uzorak,
            verovatnoca_poklapanja_rodjendana: percentFormated
        };
    });

    console.log('-------------------------------------');
    console.log('BROJ UZORKOVANJA: ', BROJ_UZORKOVANJA);
    console.log('DO BROJA LJUDI: ', DO_BROJA_LJUDI);
    console.table(izvestaj);
}

const BROJ_UZORKOVANJA = process.env.BROJ_UZORKOVANJA ? parseInt(process.env.BROJ_UZORKOVANJA, 10) : 10000;
const DO_BROJA_LJUDI = process.env.DO_BROJA_LJUDI ? parseInt(process.env.DO_BROJA_LJUDI, 10) : 100;

simuliraj(BROJ_UZORKOVANJA, DO_BROJA_LJUDI);
izvestaj();
