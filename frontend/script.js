class Aresta {
    constructor(destino, peso) {
        this.destino = destino;
        this.peso = peso;
    }
}


class Grafo {
    constructor() {
        this.map = new Map(); 
    }

    adicionarRua(origem, destino, peso) {
        
        if (!this.map.has(origem)) {
            this.map.set(origem, []);
        }
        this.map.get(origem).push(new Aresta(destino, peso));
        
        
        if (!this.map.has(destino)) {
            this.map.set(destino, []);
        }
        this.map.get(destino).push(new Aresta(origem, peso));
    }
}


class Dijkstra {
    static menorCaminho(grafo, inicio, destinoFinal) {
        const distancias = new Map();
        const anteriores = new Map();
        const fila = []; 

        for (let cidade of grafo.map.keys()) {
            distancias.set(cidade, Infinity);
        }

        distancias.set(inicio, 0);
        fila.push(inicio);

        while (fila.length > 0) {
            fila.sort((a, b) => distancias.get(a) - distancias.get(b));
            let atual = fila.shift(); 

            if (!grafo.map.has(atual)) continue;

            for (let aresta of grafo.map.get(atual)) {
                let novaDistancia = distancias.get(atual) + aresta.peso;

                if (novaDistancia < distancias.get(aresta.destino)) {
                    distancias.set(aresta.destino, novaDistancia);
                    anteriores.set(aresta.destino, atual);

                    if (!fila.includes(aresta.destino)) {
                        fila.push(aresta.destino);
                    }
                }
            }
        }

        const caminho = [];
        let destinoAtual = destinoFinal;

        while (destinoAtual != null) {
            caminho.push(destinoAtual);
            destinoAtual = anteriores.get(destinoAtual) || null;
        }

        caminho.reverse();

        return {
            caminho: caminho,
            distanciaTotal: distancias.get(destinoFinal)
        };
    }
}


function mostrarCaminho() {
    const cidade = new Grafo();

    // dados exatos do Java
    cidade.adicionarRua("Praça", "Mercado", 5);
    cidade.adicionarRua("Praça", "Estação", 2);
    cidade.adicionarRua("Mercado", "Hospital", 1);
    cidade.adicionarRua("Estação", "Hospital", 3);
    cidade.adicionarRua("Hospital", "Parque", 4);
    // le as escolhas do ususario 
    const selectOrigem = document.getElementById('origem');
    const selectDestino = document.getElementById('destino');

    const inicio = selectOrigem.value;
    const destino = selectDestino.value; 

    if (inicio === destino){
        document.getElementById('resultado').innerHTML = `<p style="color: red;">Origem e destino são os mesmos.</p>`;
        return;
    }


    // Roda o algoritmo
    const resultado = Dijkstra.menorCaminho(cidade, inicio, destino);

    // Mostra na tela
    const painelResultado = document.getElementById('resultado');
    
    // Verifica se achou um caminho
    if (resultado.distanciaTotal === Infinity) {
        painelResultado.innerHTML = `<p style="color: red;">Nenhum caminho encontrado de ${inicio} para ${destino}.</p>`;
    } else {
        painelResultado.innerHTML = `
            <h3 style="color: #333;">Resultado do GPS:</h3>
            <p><strong>De:</strong> ${inicio} <strong>Para:</strong> ${destino}</p>
            <p><strong>Menor Caminho:</strong> ${resultado.caminho.join(' -> ')}</p>
            <p><strong>Distância Total:</strong> ${resultado.distanciaTotal}</p>
        `;
    }
}