class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {

    for(let i = 0; i < vertexArray.length; i++){
      this.nodes.add(vertexArray[i])
    }

  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    const arr = Array.from(this.nodes)
    let node1,node2
    for(let i of arr){
      if(i == v1){
        node1 = i
      } else if(i == v2){
        node2 =i 
      }
    }
    if(!node1 || !node2) return

    node1.adjacent.add(node2)
    node2.adjacent.add(node1)

  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {

    const arr = Array.from(this.nodes)
    let node1,node2
    for(let i of arr){
      if(i == v1){
        node1 = i
      } else if(i == v2){
        node2 =i 
      }
    }
    if(!node1 || !node2) return


    node1.adjacent.delete(node2)
    node2.adjacent.delete(node1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // Go through all nodes
    // If a node's adjacent has that vertex, remove it
    // Also, remove the vertex node entirely

    for(let i of this.nodes){
      if(i == vertex){
        this.nodes.delete(i)
      }
      if(i.adjacent.has(vertex)){
        i.adjacent.delete(vertex)
      }


    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {

    const visited = new Set();
    const result = [];

    function traverse(vertex) {
      if (!vertex) {
        return null;
      }

      // Add node to visited, then add its value to result
      visited.add(vertex);
      result.push(vertex.value);

      // Same thing for neighbors
      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }

    traverse(start);

    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {

    const queue = [start];
    const result = [];
    const visited = new Set();
    let currentVertex;

    visited.add(start);

    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex.value);

      currentVertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

module.exports = {Graph, Node}