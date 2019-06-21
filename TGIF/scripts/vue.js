Vue.config.devtools = true

const vueApp = new Vue({
    el: '#page-wrapper',
    data: {
        members: [],
        checkedParty: [],
        states: [],
        selectedOption: []
        
        
    },
    created() {
        let link;
        if (window.location.pathname.includes('senate')){
        link = "https://api.propublica.org/congress/v1/113/senate/members.json";} else if(window.location.pathname.includes('house')){
        link= "https://api.propublica.org/congress/v1/113/house/members.json";}
        this.getData(link);
     
        
       },
    methods: {
        getData(link) {
            
            fetch(link,
                {
                    method: "GET",
                    headers:
                        { 'X-API-Key': 'wyfRhSLA71qOzm5StT9fMZ4nJE1GxARXIa4gKmSj' }
                }).then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.status);
                }).then((json) => {
                    this.members = json.results[0].members;
                    console.log(this.members)

                }).catch(function (error) {
                    console.log("Request failed:" + error.message);
                });
        }
},
   computed:{
    compareData(){
    let membersFiltered =[];
    if(this.checkedParty.length!==0){
    for(let i=0;i<this.members.length;i++){
              if(this.checkedParty.includes(this.members[i].party)){
                  membersFiltered.push(this.members[i]);
              }
            }
        return membersFiltered.compareStates;//works, in the console it is displayed an array of 2 if I clicked R and D and AR state (one for each state with the same party)
        } else{
            return this.members;
        }   
    },

    showStates(){
        for (let j = 0; j < this.members.length; j++) {
          this.states.push(this.members[j].state)
        } 
        let set = new Set(this.states);
        let onlyStates = Array.from(set);
        onlyStates.sort()
        return onlyStates;
       
    },
    compareStates(){
        let membersFilteredbyState =[];
    if(this.selectedOption.length!==0){
    for(let i=0;i<this.membersFiltered.length;i++){
              if(this.selectedOption.includes(this.members[i].state)){
                  membersFilteredbyState.push(this.members[i]);
              }
            }
        return membersFilteredbyState;
        } else{
            return this.members;
        }   
   }
}
})

