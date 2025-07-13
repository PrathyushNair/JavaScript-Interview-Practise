class Trie{
    constructor(){
        this.root={}
    }
    addWord(word){
        let node=this.root
        for(let letter of word){
            if(!node[letter]){
                node[letter]={}
            }
            node=node[letter]
        }
        node.isEnd=true
    }
    search(word){
        let node =this.root
        for(let letter of word){
            if(!node[letter]){
                return false
            }
            node=node[letter]
        }
        return node.isEnd==true
    }
    searchPrefix(prefix){
        let node =this.root
        for(let letter of prefix){
            if(!node[letter]){
                return false
            }
            node=node[letter]
        }
        return true
    }
}