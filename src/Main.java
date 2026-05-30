public class Main {

    public static void main(String[] args) {

        Grafo cidade = new Grafo();

        cidade.adicionarRua("Praça", "Mercado", 5);
        cidade.adicionarRua("Praça", "Estação", 2);
        cidade.adicionarRua("Mercado", "Hospital", 1);
        cidade.adicionarRua("Estação", "Hospital", 3);
        cidade.adicionarRua("Hospital", "Parque", 4);

        Dijkstra.menorCaminho(cidade, "Praça");

    }
    
}
