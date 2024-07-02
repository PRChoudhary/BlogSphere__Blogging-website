#include <iostream>
#include <cstdlib>
#include <ctime>

struct Node {
    int ipAdd;
    int dataPacket;
    Node* left;
    Node* right;
    Node* parent;

    Node(int ip) : ipAdd(ip), dataPacket(0), left(nullptr), right(nullptr), parent(nullptr) {}
};

class SplayTree {
public:
    SplayTree() : root(nullptr) {}

    void insert(int ipAdd) {
        Node* n = new Node(ipAdd);
        insert(root, n);
        splay(n);
    }

    Node* search(int ipAdd) {
        Node* result = search(root, ipAdd);
        if (result) {
            splay(result);
        }
        return result;
    }

    void inorder() const {
        inorder(root);
    }

private:
    Node* root;

    void insert(Node*& root, Node* n) {
        Node* y = nullptr;
        Node* temp = root;

        while (temp != nullptr) {
            y = temp;
            if (n->ipAdd < temp->ipAdd)
                temp = temp->left;
            else
                temp = temp->right;
        }

        n->parent = y;
        if (y == nullptr) {
            root = n;
        } else if (n->ipAdd < y->ipAdd) {
            y->left = n;
        } else {
            y->right = n;
        }
    }

    Node* search(Node* root, int ipAdd) {
        if (root == nullptr || root->ipAdd == ipAdd)
            return root;
        if (ipAdd < root->ipAdd)
            return search(root->left, ipAdd);
        return search(root->right, ipAdd);
    }

    void inorder(Node* root) const {
        if (root != nullptr) {
            inorder(root->left);
            std::cout << "192.168.3." << root->ipAdd << " -> " << root->dataPacket << std::endl;
            inorder(root->right);
        }
    }

    void splay(Node* n) {
        while (n->parent != nullptr) {
            if (n->parent == root) {
                if (n == n->parent->left) {
                    rightRotate(n->parent);
                } else {
                    leftRotate(n->parent);
                }
            } else {
                Node* p = n->parent;
                Node* g = p->parent;
                if (n == p->left && p == g->left) {
                    rightRotate(g);
                    rightRotate(p);
                } else if (n == p->right && p == g->right) {
                    leftRotate(g);
                    leftRotate(p);
                } else if (n == p->right && p == g->left) {
                    leftRotate(p);
                    rightRotate(g);
                } else {
                    rightRotate(p);
                    leftRotate(g);
                }
            }
        }
    }

    void leftRotate(Node* x) {
        Node* y = x->right;
        x->right = y->left;
        if (y->left != nullptr) {
            y->left->parent = x;
        }
        y->parent = x->parent;
        if (x->parent == nullptr) {
            root = y;
        } else if (x == x->parent->left) {
            x->parent->left = y;
        } else {
            x->parent->right = y;
        }
        y->left = x;
        x->parent = y;
    }

    void rightRotate(Node* x) {
        Node* y = x->left;
        x->left = y->right;
        if (y->right != nullptr) {
            y->right->parent = x;
        }
        y->parent = x->parent;
        if (x->parent == nullptr) {
            root = y;
        } else if (x == x->parent->right) {
            x->parent->right = y;
        } else {
            x->parent->left = y;
        }
        y->right = x;
        x->parent = y;
    }
};

int main() {
    SplayTree t;
    int ips[] = {104, 112, 117, 124, 121, 108, 109, 111, 122, 125, 129};

    for (int ip : ips) {
        t.insert(ip);
    }

    srand(time(0));
    for (int ip : ips) {
        int data = rand() % 200;
        Node* temp = t.search(ip);
        if (temp != nullptr) {
            temp->dataPacket = data;
        }
    }

    std::cout << "IP ADDRESS -> DATA PACKET" << std::endl;
    t.inorder();

    return 0;
}
