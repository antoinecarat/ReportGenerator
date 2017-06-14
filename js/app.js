var app = new Vue({
  el: '#app',
  data: {
    currentTab: "general",
    currentOrder: "",
    currentAttendant: "",
    level: 0,
    typeR: "",
    dateR: "",
    heureR: "",
    heureF: "",
    orders: [],
    attendants: [],
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
        print += '\n\subsection*{'+order.title+'}';
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
    generateTex: function() {
      var file = new Blob([$('#tex').text()], {type: 'text/plain'});
      saveAs(file, "Reunion.tex");
    },
    generatePdf: function() {
      
    }
  }
})