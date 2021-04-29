const generisiLjude = function (br) {
    return Array.from({ length: br }).map(index => Math.floor(Math.random() * 365));
}

const rezultat = [];

const simuliraj = function (loops = 10000) {
    let uzorak = 1;
    while (uzorak < 30) {
        let final = [];
        for (let i = 0; i < loops; i++) {
            let ljudi = generisiLjude(uzorak);
            let map = new Set(ljudi);
            let match = ljudi.length !== map.size;

            final.push({ uzorak, match })

            // console.log(`${i + 1}. match: `, match)
        }
        rezultat.push({
            uzorak, final
        })
        uzorak++;
    }
}

const izvestaj = function () {
    const izvestaj = rezultat.map(res => {
        const pogodaka = res.final.filter(item => item.match).length;

        const percent = (pogodaka / res.final.length * 100).toFixed(2);
        const percentFormated = percent > 50 && percent < 55 ? `>> ${percent} % <<` : `${percent} %`;

        return {
            uzorak_ljudi: res.uzorak,
            verovatnoca_rodjendana: percentFormated
        };
    });

    console.table(izvestaj);
}

simuliraj();
izvestaj();
