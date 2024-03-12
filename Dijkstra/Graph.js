const readline = require('readline');

class Graph {
    constructor() {
        this.vertices = [];
        this.edges = {};
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.edges[vertex] = {};
    }

    addEdge(vertex1, vertex2, weight) {
        this.edges[vertex1][vertex2] = weight;
        this.edges[vertex2][vertex1] = weight; // for undirected graph
    }

    dijkstra(startVertex) {
        const distances = {};
        const visited = {};
        let currentVertex;

        // Initialize distances with Infinity and startVertex with 0
        this.vertices.forEach(vertex => {
            distances[vertex] = Infinity;
        });
        distances[startVertex] = 0;

        while (Object.keys(visited).length !== this.vertices.length) {
            currentVertex = this.getMinVertex(distances, visited);
            visited[currentVertex] = true;

            for (let neighbor in this.edges[currentVertex]) {
                let distance = distances[currentVertex] + this.edges[currentVertex][neighbor];
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                }
            }
        }

        return distances;
    }

    getMinVertex(distances, visited) {
        let minDistance = Infinity;
        let minVertex;
        for (let vertex in distances) {
            if (!visited[vertex] && distances[vertex] <= minDistance) {
                minDistance = distances[vertex];
                minVertex = vertex;
            }
        }
        return minVertex;
    }
}

function createGraphFromInput(input) {
    const graph = new Graph();
    const lines = input.trim().split('\n');
    lines.forEach(line => {
        const [vertex1, vertex2, weight] = line.trim().split(' ');
        if (!graph.vertices.includes(vertex1)) {
            graph.addVertex(vertex1);
        }
        if (!graph.vertices.includes(vertex2)) {
            graph.addVertex(vertex2);
        }
        graph.addEdge(vertex1, vertex2, parseInt(weight));
    });
    return graph;
}

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the graph data (format: vertex1 vertex2 weight, separate lines; press "q" to finish):\n', (input) => {
        if (input.trim().toLowerCase() === 'q') {
            rl.close();
        } else {
            const graph = createGraphFromInput(input);
            const startVertex = 'A'; // You can change this to any vertex
            const distances = graph.dijkstra(startVertex);

            console.log("Shortest distances from vertex", startVertex);
            for (let vertex in distances) {
                console.log(vertex, ":", distances[vertex]);
            }

            rl.close();
        }
    });
}

main();
