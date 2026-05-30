import java.util.*;

class Dijkstra {

    public static void menorCaminho(Grafo grafo, String inicio) {

        Map<String, Integer> distancias = new HashMap<>();
        Map<String, String> anteriores = new HashMap<>();

        for (String cidade : grafo.map.keySet()) {
            distancias.put(cidade, Integer.MAX_VALUE);
        }

        distancias.put(inicio, 0);

        PriorityQueue<String> fila =
                new PriorityQueue<>(Comparator.comparingInt(distancias::get));

        fila.add(inicio);

        while (!fila.isEmpty()) {

            String atual = fila.poll();

            for (Aresta aresta : grafo.map.get(atual)) {

                int novaDistancia =
                        distancias.get(atual) + aresta.peso;

                if (novaDistancia < distancias.get(aresta.destino)) {

                    distancias.put(aresta.destino, novaDistancia);

                    // GUARDA O CAMINHO
                    anteriores.put(aresta.destino, atual);

                    fila.add(aresta.destino);
                }
            }
        }

        // MOSTRAR DISTÂNCIAS
        System.out.println("Menor distancia:");

        for (String cidade : distancias.keySet()) {
            System.out.println(cidade + " : " + distancias.get(cidade));
        }

        // ESCOLHER DESTINO
        String destino = "Hospital";

        // LISTA DO CAMINHO
        List<String> caminho = new ArrayList<>();

        while (destino != null) {

            caminho.add(destino);

            destino = anteriores.get(destino);
        }

        Collections.reverse(caminho);

        // MOSTRAR CAMINHO
        System.out.println("\nMenor caminho:");

        for (int i = 0; i < caminho.size(); i++) {

            if (i == caminho.size() - 1) {
                System.out.print(caminho.get(i));
            } else {
                System.out.print(caminho.get(i) + " -> ");
            }
        }
    }
}