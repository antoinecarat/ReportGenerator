var app = new Vue({
    el: '#app',
    data: {
        currentTab: "general",
        currentOrder: "",
        currentAttendant: "",
        level: 0,
        typeR: "Réunion du Conseil",
        dateR: "7 Septembre 2017",
        heureR: "18:30",
        heureF: "20:00",
        dateNext: "8 Octobre 2017",
        orders: [{title: "Futur", resume:"jgizbegb."}],
        attendants: ["carat, président", "thibaud, secretaire"],
        fileName: "",
        incidents: "Aucun incident à déplorer.",
    },
    computed: {
        listOrders: function() {
            var list = "";
            for (var i = 0; i < this.orders.length; i++) {
                list += "\n\\item "+this.orders[i].title;
            }
            return list;
        },
        listAttendants: function() {
            var list = "";
            for (var i = 0; i < this.attendants.length; i++) {
                list += "\n\\item "+this.attendants[i];
            }
            return list;
        },
        printResume: function() {
            var print = '';
            for (var i = 0; i < this.orders.length; i++) {
                var order = this.orders[i];
                print += '\n\\subsection*{'+order.title+'}';
                print += '\n\n'+order.resume+'\n';
            }
            return print;
        }
    },
    methods: {
        addOrder: function () {
            this.orders.push({
                title: this.currentOrder,
                resume: ""
            });
            this.currentOrder = "";
        },
        delOrder: function (order) {
            this.orders.splice(this.orders.indexOf(order),1);
        },
        addAttendant: function () {
            this.attendants.push(this.currentAttendant);
            this.currentAttendant = "";
        },
        delAttendant: function (attendant) {
            this.attendants.splice(this.attendants.indexOf(attendant),1);
        },
        check: function() {
            if (this.attendants.length < 2) {
                alert('Il faut au moins 2 participants');
                return false;
            }
            if (this.orders.length < 1) {
                alert('Il faut au moins un ordre du jour.');
                return false;
            }
            return true;
        },
        generateTex: function() {
            if (!this.check()) return;
            var file = new Blob([$('#tex').text()], {type: 'text/plain'});
            var name = this.fileName ? this.fileName : "compte-rendu-reunion";
            saveAs(file, name +'.tex');
        },
        generatePdf: function() {
            if (!this.check()) return;
            var name = this.fileName ? this.fileName : "compte-rendu-reunion";
            window.open("https://latexonline.cc/compile?download=" + name +".pdf&text="+$('#tex').text());
        }
    }
});
