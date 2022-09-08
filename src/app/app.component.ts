import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  getDate:any;
  starttime:any;
  endtime:any;
  description:any;
  myItems: any[] = [{index:0,getdate:'12-01-2022',starttime:'12:08',endtime:'17:23',minutes:'280',description:'this is my record'}];
  loadTableItems: any[] = [];

  constructor(){}
  ngOnInit(){
    this.loadTableItems
  }

  saveData(){
    //create date format
    var timeStart = new Date("01/01/2007 " + this.starttime).getTime();
    var timeEnd = new Date("01/01/2007 " + this.endtime).getTime();



    var hourDiff = timeEnd - timeStart;
var resultInMinutes = Math.round(hourDiff / 60000);

    var i = this.myItems[0].index += 1;
    this.myItems.push({index:i,getdate:this.getDate,starttime:this.starttime,endtime:this.endtime,minutes:resultInMinutes,description:this.description})

    this.loadTableItems.push({index:i,getdate:this.getDate,starttime:this.starttime,endtime:this.endtime,minutes:resultInMinutes,description:this.description})
  }

  // ----delete the item in table-----//
  DeleteItem(i: number) {
      const index = this.myItems.indexOf(this.loadTableItems[i].index);
      this.myItems.splice(index, 1);
      this.loadTableItems.splice(i, 1);
  }

  loadData(){
    this.loadTableItems = this.myItems.filter(res => {
      return res.getdate.match(this.getDate);
    })
  }

  // When user clicks on update button to submit updated value
UpdateItem() {

}
  title = 'toshal';


}
