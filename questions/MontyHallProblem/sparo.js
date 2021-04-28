/**
 * Pokusaj implementacije klase za simulaciju
 * Montiholovog paradoksa
 * https://sr.wikipedia.org/sr-el/%D0%9C%D0%BE%D0%BD%D1%82%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B2_%D0%BF%D0%B0%D1%80%D0%B0%D0%B4%D0%BE%D0%BA%D1%81
 */
class Simulator {
    // inicijalizuj simulator sa nekim podrazumevanim vrednostima
    constructor (broj_pokusaja = 1, opcije_izbora = [1, 2, 3]) {
        // incijalizuj opcije
        this.opcije_izbora = opcije_izbora;
        this.broj_pokusaja = broj_pokusaja;

        // pripremi strukturu podataka za izvestaje
        this.rezultat = {
            promenio: {
                izbor: 0,
                procenat_izbora: '0%',
                pogodaka: 0,
                promasaja: 0,
                procenat_uspeha: '0%'
            },
            nije_promenio: {
                izbor: 0,
                procenat_izbora: '0%',
                pogodaka: 0,
                promasaja: 0,
                procenat_uspeha: '0%'
            }
        }
    }

    // Pomocna funkcija za izbor nasumicnih vrednosti
    izbor (val) {
        return Math.floor(Math.random() * val);
    }

    // Pomocna funkcija za izbor nasumicne pozicje
    get pozicija () {
        return this.izbor(this.opcije_izbora.length) + 1;
    }

    // Metoda koja stavlja nagradu na pocetnu poziciju
    sakrijNagradu () {
        return this.pozicija;
    }

    // Metoda koja vraca izbor osobe
    osobaBira () {
        return this.pozicija;
    }

    // Metoda koja vraca izbor voditelja/sibicara
    // koji na osnovu odluke osobe koja bira i lokacije nagrade odlucuje
    // koji od preostalih opcija treba da izbaci
    izborVoditelja (pozicija_nagrade, izbor_osobe) {
        // voditelj mora da izabere:
        // ili jednu od dve preostale opcije ako je osoba inicijalno pogodila naagradu
        // ili da izabere jednu opciju koja nije nagrada

        // filtriramo opcije koje nisu izbor osobe ili nisu pozicija nagrade
        // pa sta ostane bira voditelj
        const opcije = this.opcije_izbora.filter(i => i !== izbor_osobe && i != pozicija_nagrade);

        // voditelj takodje treba da izabere nasumicno ako mu je ostala vise od jedne opcije
        return opcije[this.izbor(opcije.length)];
    }

    // Pitaj korisnika da promeni izbor na osnovu preostalih opcija
    promeniIzbor (opcije) {
        return opcije[this.izbor(opcije.length)];
    }

    // Metoda igre
    igra () {
        // postavi nagradu/kuglicu na poziciju
        const nagrada = this.sakrijNagradu();
        // pitaj osobu da izabere
        const izbor_osobe = this.osobaBira();
        // voditelj/sibicar izbacuje jednu od preostalih opcija
        const voditelj_izbacuje = this.izborVoditelja(nagrada, izbor_osobe);
        // vidi koje su preostale opcije
        const preostale_opcije_izbora = this.opcije_izbora.filter(i => i !== voditelj_izbacuje);

        // vidi da li ce korisnik da promeni odluku
        const novi_izbor = this.promeniIzbor(preostale_opcije_izbora);

        return {
            promenjen_izbor: novi_izbor !== izbor_osobe,
            pogodak: novi_izbor === nagrada
        }
    }

    /**
     * Pokreni simulaciju i popuni podatke
     */
    pokreni () {
        for (let i = 0; i < this.broj_pokusaja; i++) {
            // pokupi rezultat ove igre
            let rezultat = this.igra();

            // vidi koja je kategorija vracena, promenjen izbor ili ne
            if (rezultat.promenjen_izbor) {
                // popuni promenu izbora
                this.rezultat.promenio.izbor++;
                if (rezultat.pogodak) {
                    this.rezultat.promenio.pogodaka++;
                } else {
                    this.rezultat.promenio.promasaja++;
                }
            } else {
                // popuni kad nije promena izbora
                this.rezultat.nije_promenio.izbor++;
                if (rezultat.pogodak) {
                    this.rezultat.nije_promenio.pogodaka++;
                } else {
                    this.rezultat.nije_promenio.promasaja++;
                }
            }
        }
    }

    /**
     * Napravi izvestaj
     */
    izvestaj () {
        // izracunaj procena izbora - koji je odnos odluka promenio/nije promenio
        this.rezultat.promenio.procenat_izbora = `${((this.rezultat.promenio.izbor / (this.rezultat.promenio.izbor + this.rezultat.nije_promenio.izbor)) * 100).toFixed(2)} %`;
        this.rezultat.nije_promenio.procenat_izbora = `${((this.rezultat.nije_promenio.izbor / (this.rezultat.promenio.izbor + this.rezultat.nije_promenio.izbor)) * 100).toFixed(2)} %`;

        // izracunaj procenat uspeha prethodnih izbora
        this.rezultat.promenio.procenat_uspeha = `${((this.rezultat.promenio.pogodaka / (this.rezultat.promenio.pogodaka + this.rezultat.nije_promenio.pogodaka)) * 100).toFixed(2)} %`;
        this.rezultat.nije_promenio.procenat_uspeha = `${((this.rezultat.nije_promenio.pogodaka / (this.rezultat.promenio.pogodaka + this.rezultat.nije_promenio.pogodaka)) * 100).toFixed(2)} %`;

        console.log('---------------------');
        console.log('BROJ POKUSAJA: ', this.broj_pokusaja.toLocaleString());
        console.log('OPCIJE IZBORA: ', this.opcije_izbora);
        // nacrtaj tabelu izvestaja
        console.table(this.rezultat);
    }
}

const BROJ_POKUSAJA = process.env.BROJ_POKUSAJA ? parseInt(process.env.BROJ_POKUSAJA, 10) : 10000;
const OPCIJE_IZBORA = [1, 2, 3];

// Napravi simulator
const simulacija = new Simulator(BROJ_POKUSAJA, OPCIJE_IZBORA);
simulacija.pokreni();
simulacija.izvestaj();

