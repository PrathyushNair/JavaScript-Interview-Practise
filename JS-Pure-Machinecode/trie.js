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
    searchPrefixAndReturnNode(prefix){
        let node=this.root
        for(let char of prefix){
            if(!node[char]){
                return null
            }
            node=node[char]
        }
        return node
    }
    collectAllWords(node,prefix,result){
        if(node.isEnd){
            result.push(prefix)
        }
        for( let char in node){
            this.collectAllWords(node[char],prefix+char,result)
        }
    }
    autoComplete(prefix){
        let result=[]
        let searchStartNode=this.searchPrefixAndReturnNode(prefix)
        console.log('searchStartNode',searchStartNode)
        if(!searchStartNode) return result
        this.collectAllWords(searchStartNode,prefix,result)
        return result
    }
}
const trie = new Trie();
console.log(trie)
trie.addWord("apple");
trie.searchPrefixAndReturnNode('app')
trie.addWord("apple");
trie.addWord("application");
trie.addWord("apt");
trie.addWord("bat");
trie.addWord("banana");
console.log(trie.autoComplete("app"));