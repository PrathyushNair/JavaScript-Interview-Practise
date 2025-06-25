// Implement an in-memory search engine where multiple documents could be stored under a particular namespace 
// and search on them and sort the search results by passing the orderBy parameter.




class InMemorySearch{
    constructor(){
        this.entities=new Map()
    }
    registerNameSpace(name){
        if(this.entities.has(name)){
            console.log('Namespace already exists')
        }
        else{
            this.entities.set(name,[])
        }
    }
    addDocuments(name,...data){
        if(!this.entities.has(name)){
            this.entities.set(name, [...data]);

        }
        else{
            let existingData=this.entities.get(name)
            this.entities.set(name,[...existingData,...data])
        }   
    }
    search(name,filterFunction,order){
        if(!this.entities.has(name)){
            console.log('No such namespace exists');
        }
        else{
            const existingData=this.entities.get(name)
            const filteredData=existingData.filter((item)=>filterFunction(item))
            if(order){
                const {key,asc}=order
                if(asc){
                    filteredData.sort((a,b)=>{
                        return a[key]-b[key]
                    })
                }
                else{
                    filteredData.sort((a,b)=>{
                        return b[key]-a[key]
                    })
                }
            }
            else{
                return filteredData
            }
            return filteredData
        }
    }
}

const searchEngine = new InMemorySearch();
searchEngine.addDocuments('Movies', 
                    {name: 'Avenger', rating: 8.5, year: 2017}, 
                    {name: 'Black Adam', rating: 8.7, year: 2022}, 
                    {name: 'Jhon Wick 4', rating: 8.2, year: 2023}, 
                    {name: 'Black Panther', rating: 9.0, year: 2022}
                   );
console.log(searchEngine.search('Movies', (e) => e.rating > 8.5, {key: 'rating', asc: false}));

/*
[
  {
    "name": "Black Panther",
    "rating": 9,
    "year": 2022
  },
  {
    "name": "Black Adam",
    "rating": 8.7,
    "year": 2022
  }
]
*/
