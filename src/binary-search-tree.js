const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor() {
    this.node = null;
  }

  root() {
    return this.node; 
  }

  add(data) {
    this.node = addNode(this.node, data);

    function addNode (node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.date === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }
      
      return node;
    }
  }

  has(data) {
    return searchNode(this.node, data);

    function searchNode (node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data ?
        searchNode(node.left, data) :
        searchNode(node.right, data);
    }
  }

  find(data) {
    return searchNode(this.node, data);

    function searchNode (node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data ?
        searchNode(node.left, data) :
        searchNode(node.right, data);
    }
  }

  remove(data) {
    this.node = removeNode(this.node, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.node) {
      return;
    }

    let node = this.node;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.node) {
      return;
    }

    let node = this.node;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}