//data for Vue
const data = {

    //card particulars
    tasks: [
/*        {
            content: "Chenin blanc boasts a bouquet of fresh pears, saffron, jasmine, ginger, and quince. Yeast is necessary for the fermentation of grape juice into wine. Ideal for sipping, Gewerztraminer is one of the sweeter whites. Intense hatred of wine is called oenophobia. Tomato and cherry flavors nestle comfortably together with notes of leather and clay in Sangiovese. The first stage of wine tasting is looking over the appearance of the wine. A popular but unconfirmed theory claims that Malbec is named after a Hungarian peasant who first spread the grape variety throughout France",
        },
        {
            content: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.",
        },*/
    ],


};





//displays deck of cards and button for reshuffle
Vue.component('card-deck', {
    data: function () {
        return data;
    },
    template: `<fieldset id="cardDeck">
        <legend>Deck</legend>
        <slot></slot>
        <button type="button" id="shuffle" @click="shuffle">Shuffle</button>
        </fieldset>`,
    methods: {
        shuffle: function () {
            this.cards.sort(function () {
                return 0.5 - Math.random()
            });
        },
    }
});


Vue.component('common-area', {
    template: `<fieldset id="commonArea">
        <legend>Common Area</legend>
        <slot></slot>
        </fieldset>`
});

Vue.component('player-hand', {
    template: `<fieldset id="playerHand">
        <legend>Hand</legend>
        <slot></slot>
        </fieldset>`
});


//shows cards and adds event listeners
Vue.component('card-display', {
    data: function () {
        return data;
    },
    props: ['card', 'index'],
    template: `<div class="cardContainer" :class=card.cardType>
                <div class="card appear" :class=card.cardType>
                    <div class="art"><img :src=card.cardImage :class=card.cardType></div>
                    <div class="description"><h4>{{card.cardName}}</h4>
                        <p class="quote">{{card.cardQuote}}</p>
                        <p class="stats">{{card.cardDescription}}</p></div>
                </div>
                <div class="cardOverlay" :id=card.cardType :class=card.cardType @click="cardSelect"></div>
                </div>`,
    methods: {
        cardSelect: function () {
            this.$emit('card-click', {index: this.index});
        },
    }
});

//covers controls for selecting number of cards and adding to player hand
Vue.component('card-control', {
        data: function () {
            return {
                addCount: 1,
            };
        },
        props: ['card', 'index'],
        template: `<div class="cardControl">
                <slot></slot>
                <input class="countInput" type="number" min="1" v-model="addCount" />
                    <button class="addButton" @click="addToHand">Add to Hand</button>
                </div>
            `,
        methods: {
            addToHand: function () {
                this.$emit('click', {index: this.index, addCount: this.addCount});
                this.addCount = 1;
            }
        }
    }
);

Vue.component('task-display', {
    data: function () {
    },
    props: ['task'],
    template: `<p>{{task.content}}</p>`,
    methods: {}
});

Vue.component('task-creator', {
    data: function () {
    },
    props: [],
    template: `
                <div id="taskCreator">
              <textarea id="textfield" v-model="content"></textarea>
              <button id="submitTask" @click.prevent="addTask"></button>
              </div>
    `,
    methods: {
        addTask: function () {
            this.$emit('click',{content:this.content});
        }
    }
});



//initialize variable for key value
let cardKey = 0;

//vue instance
const vm = new Vue({
    el: '#app',
    data: data,
    methods: {
        addToTasks: function (event) {
            this.tasks.push({content:event.content})
            console.log(this.tasks[-1])
        },
/*        removeFromPlayerHand: function (event) {
            this.handCards.splice(event.index, 1);
        }*/
    }
});


